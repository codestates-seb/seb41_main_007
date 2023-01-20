import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const getValidTokenFromServer = async (
  refreshToken: string | null,
  nav: (url: string) => void,
) => {
  // get new token from server with refresh token
  try {
    const request = await fetch(
      'http://localhost:4000/auth/google/validToken',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      },
    );
    const resultToken = await request.json();
    if (resultToken) {
      localStorage.setItem('access_token', resultToken.access_token);
      window.location.href = '/';
    }
  } catch (error) {
    throw new Error('Issue getting new token');
  }
};

const Auth = () => {
  const nav = useNavigate();
  const location = useLocation();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const accessToken = params.get('access_token');
  console.log(accessToken);
  useEffect(() => {
    getValidTokenFromServer(accessToken, nav);
  });

  return (
    <div>
      <Link to="/"> 홈으로</Link>
    </div>
  );
};

export default Auth;
