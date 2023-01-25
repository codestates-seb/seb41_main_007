import React from 'react';
import styled from 'styled-components';
import { BGcontainer } from 'Components/Common/BGcontainer';
import LazyImage from 'Components/login/LazyImage';
import LoginForm from 'Components/login/LoginForm';
import useScrollTop from 'CustomHook/useScrollTop';

const BigContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 970px;
  background: var(--blue-000);
  margin-left: 120px;
  margin-top: 200px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px grey;
  position: relative;
  flex-direction: row;
  // &::before {
  //   position: fixed;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  //   background-color: rgba(0, 0, 0, 0.2);
  //   content: '';
  // }
`;

const Login: React.FC = () => {
  useScrollTop();
  return (
    <BGcontainer>
      <BigContainer>
        <LazyImage></LazyImage>
        <LoginForm></LoginForm>
      </BigContainer>
    </BGcontainer>
  );
};

export default Login;
//파일 늦게옴
//이미지파일이 늦게 업로드되서 레이지로딩 시도했는데 실패함
//두개를 같이 불러오는 방법으로결정함
// 통신이 없어서 안됨
// 통신을 넣어서 억지로 시간벌고 보여주는 방법이 있긴함
