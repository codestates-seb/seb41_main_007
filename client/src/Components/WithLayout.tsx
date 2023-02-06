import { Suspense } from 'react';
import Header from './Header';
import Footer from './Common/Footer';
import { ToastContainer, Zoom } from 'react-toastify';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Loading from './Loading/Loading';
import { BGcontainer } from './Common/BGcontainer';
const StyleToastContainer = styled(ToastContainer)`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const WithLayout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Suspense fallback={<BGcontainer />}>
        <Outlet />

        <Footer />
        <StyleToastContainer
          limit={4}
          transition={Zoom}
          hideProgressBar
          autoClose={1000}
        />
      </Suspense>
    </>
  );
};
export default WithLayout;
