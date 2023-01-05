import { FC } from 'react';
import { Link } from 'react-router-dom';

const Button: FC = () => {
  return (
    <>
      <Link to="/login" className="Header_Login_Button">
        로그인
      </Link>

      <Link className="Header_SignUp_Button" to="/signup">
        회원가입
      </Link>
    </>
  );
};

export default Button;
