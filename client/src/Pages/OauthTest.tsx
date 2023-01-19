import { FC } from 'react';
import { LoginSocialGoogle } from 'reactjs-social-login';

const OauthTest: FC = () => {
  return (
    <div>
      <LoginSocialGoogle
        client_id={process.env.REACT_APP_GOOGLE_CLIENT as string}
        scope="openid profile email"
        access_type="online"
        // ux_mode="redirect"
        // redirect_uri="http://localhost:3000"
        onResolve={({ provider, data }) => {
          console.log(data, provider);
        }}
        onReject={(e) => {
          console.log(e);
        }}
      >
        버튼입니다
      </LoginSocialGoogle>
      ,
    </div>
  );
};

export default OauthTest;
