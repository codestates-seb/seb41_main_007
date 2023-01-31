import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const LoginDiv = styled.div`
  opacity: 0.9;
  z-index: 5500;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 490px;
  height: 500px;
  background: #fff;
`;
const LoginP = styled.div<{ fontsize: string; weight: string }>`
  padding: 20px 0 20px 0;
  text-align: center;
  font-weight: ${(props) => props.weight};

  font-size: ${(props) => props.fontsize};
`;

const GoogleBtn = styled.button`
  opacity: 1;
  width: 300px;
  height: 50px;
  padding-top: 10px;
  margin: 10px 0px;
  background-color: white;
  display: flex;
  margin: 30px auto;
  margin-bottom: 20px;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid hsl(210, 8%, 85%);
  position: relative;
  &:hover {
    font-weight: 400;
    transform: scale(1.03);
    transition-duration: 500ms;
  }
`;

const GuestBtn = styled(GoogleBtn)`
  margin-top: 0px;
  padding-top: 0px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BtnText = styled.span`
  margin-left: 5px;
  font-size: var(--medium);
  font-weight: 700;
`;
const LoginForm = () => {
  const navigate = useNavigate();
  const OauthHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`;
  };

  const GuestHandler = () => {
    localStorage.setItem(
      'access_token',
      'eyJhbGciOiJIUzM4NCJ9.eyJhdXRoIjoiUk9MRV9BRE1JTiIsIm5hbWUiOiLqtJHtmJzsm5AiLCJzdWIiOiIzIiwiaWF0IjoxNjc0ODg2Nzk5LCJleHAiOjE2NzYzNTgwMjd9.JiVdg9rc-HNg9inEw8KAfF7meDtl8X-XgQODcHBQHUBwX4lw-DQ7i1v8M5b_rc36',
    );
    localStorage.setItem(
      'refresh_token',
      'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxMDQyNTI5MjI5MDY3Nzk3Njc4NTMiLCJpYXQiOjE2NzQ4ODY3OTksImV4cCI6MTY3NjM1ODAyOH0.F1H36p1PKfq3m8q7YOe8HtzYtvNdROZicNDE-3xDDRYW_iqJ2FO7-ElUQ1pTtI2B',
    );

    window.location.href = '/';
  };
  return (
    <LoginDiv>
      <div className="mt-20">
        <LoginP weight="bold" fontsize="30px">
          로그인 🙋🏻‍♀️
        </LoginP>
        <LoginP weight="bold" fontsize="17px">
          방문해주셔서 감사합니다. <br></br>
          아래 버튼을 눌러 회원가입을 해주세요.
        </LoginP>
        <GoogleBtn onClick={OauthHandler}>
          <div className="mt-1">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
              <path
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
                fill="#4285F4"
              ></path>
              <path
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
                fill="#34A853"
              ></path>
              <path
                d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
                fill="#FBBC05"
              ></path>
              <path
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
                fill="#EA4335"
              ></path>
            </svg>
          </div>
          <BtnText>Log in with Google</BtnText>
        </GoogleBtn>
        <GuestBtn onClick={() => GuestHandler()}>
          <img width={100} height={20} src={'/image/FarmPi.svg'} alt="LOGO" />
          <BtnText>Guest</BtnText>
        </GuestBtn>
      </div>
    </LoginDiv>
  );
};

export default LoginForm;
