import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const nav = useNavigate();
  const location = useLocation();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      nav('/');
    }
  });

  return (
    <div>
      <Link to="/"> 홈으로</Link>
    </div>
  );
};

export default Auth;
