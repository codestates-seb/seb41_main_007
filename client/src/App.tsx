import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Components/Header/index';
import Main from './Pages/Main';
import Loading from './Components/Loading/Loading';
import Login from './Pages/Login';
import Counter from 'Redux/ex/counter';
import ObjectSaver from 'Redux/ex/objectSave';
import ProductPage from 'Pages/ProductPage';
import BasketsPage from 'Pages/BasketPage';
import ProductListPage from 'Pages/CategoryListPage';
import Mypage from 'Pages/MyPage';
import Search from 'Pages/Search';
import NotFoundPage from 'Pages/NotFoundPage';
import { MyPageSession, PaymentPageSession } from 'Utils/SessionMaster';
import Footer from 'Components/Common/Footer';
import Address from 'Components/PaymentPage/Address';

import PaymentPage from 'Pages/PaymentPage';
import AllProductsPage from 'Pages/AllProductsPage';
import Auth from 'Pages/Auth';
import Post from 'Pages/Post/Post';
import { useSession } from 'CustomHook/useSession';
import Empty from 'Components/Common/Empty';

const withLayout = (Component: React.FC): JSX.Element => {
  return (
    <>
      <Header />
      <Component />
      <Footer />
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
  { path: '/auth', element: <Auth /> },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
