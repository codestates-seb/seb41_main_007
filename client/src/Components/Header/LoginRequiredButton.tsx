import { FC } from 'react';
import { Link } from 'react-router-dom';

const LoginRequiredButton: FC = () => {
  return (
    <div className="Header_Button_Container">
      <Link to="/login" className="Header_Login_Button">
        로그인
      </Link>
      <Link className="Header_SignUp_Button" to="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default LoginRequiredButton;
