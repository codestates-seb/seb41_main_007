import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const nav = useNavigate();
  const location = useLocation();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const accessToken = params.get('access_token');
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
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
