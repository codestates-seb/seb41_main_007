import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Components/Header/index';
import Main from './Pages/Main';
import Loading from './Components/Loading/Loading';
import Login from './Pages/Login';
import Counter from 'Redux/ex/counter';
import ObjectSaver from 'Redux/ex/objectSave';
import ReactQueryTest from 'Pages/ReactQueryTest';
import ProductPage from 'Pages/ProductPage';
import BasketsPage from 'Pages/BasketPage';
import ProductListPage from 'Pages/CategoryListPage';
import Mypage from 'Pages/MyPage';
import Search from 'Pages/Search';
import NotFoundPage from 'Pages/NotFoundPage';

import Footer from 'Components/Common/Footer';
import Address from 'Components/PaymentPage/Adress';

import PaymentPage from 'Pages/PaymentPage';
import ReviewQueryTest from 'Pages/Test/ReviewQueryTest';
import AllProductsPage from 'Pages/AllProductsPage';
import Auth from 'Pages/Auth';

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
    element: withLayout(Mypage),
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
    path: '/test',
    element: <ReactQueryTest />,
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
    element: withLayout(PaymentPage),
  },
  {
    path: '/test/review',
    element: <ReviewQueryTest />,
  },
  { path: '/auth', element: <Auth /> },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
