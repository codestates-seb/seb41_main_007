import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MyPageSession, PaymentPageSession } from 'Utils/SessionMaster';
import { ToastContainer } from 'react-toastify';

import Header from './Components/Header/index';
import Loading from './Components/Loading/Loading';
import Footer from 'Components/Common/Footer';
import Counter from 'Redux/ex/counter';
import ObjectSaver from 'Redux/ex/objectSave';

import ProductListPage from 'Pages/CategoryListPage';
import BasketsPage from 'Pages/BasketPage';
import ProductPage from 'Pages/ProductPage';
import AllProductsPage from 'Pages/AllProductsPage';
import Search from 'Pages/Search';
import NotFoundPage from 'Pages/NotFoundPage';
import Main from './Pages/Main';
import Auth from 'Pages/Auth';
import Post from 'Pages/Post/Post';
import Login from './Pages/Login';
import Test from 'Pages/Test';

const withLayout = (Component: FC): JSX.Element => {
  return (
    <>
      <Header />
      <Component />
      <Footer />
      <ToastContainer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: withLayout(Main),
    errorElement: <Loading />,
  },
  {
    path: '/login',
    element: withLayout(Login),
  },
  {
    path: '/product/:productid',
    element: withLayout(ProductPage),
  },

  {
    path: '/products',
    element: withLayout(Search),
  },
  {
    path: '/mypage',
    element: withLayout(MyPageSession),
  },
  {
    path: '/Basket',
    element: withLayout(BasketsPage),
  },
  {
    path: '/Counter',
    element: withLayout(Counter),
  },
  {
    path: '/test/counter',
    element: <ObjectSaver />,
  },
  {
    path: '/products/all',
    element: withLayout(AllProductsPage),
  },
  {
    path: '/products/:categoryId',
    element: withLayout(ProductListPage),
  },
  {
    path: '*',
    element: withLayout(NotFoundPage),
  },
  {
    path: '/payment',
    element: withLayout(PaymentPageSession),
  },
  {
    path: '/post',
    element: withLayout(Post),
  },
  {
    path: '/test',
    element: <Test />,
  },
  { path: '/auth', element: <Auth /> },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
