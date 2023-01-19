import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
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
import ProductListPage from 'Pages/ProductListPage';
import Mypage from 'Pages/MyPage';
import Search from 'Pages/Search';
import NotFoundPage from 'Pages/NotFoundPage';

import Footer from 'Components/Common/Footer';
import Address from 'Components/PaymentPage/Address';

import PaymentPage from 'Pages/PaymentPage';
import ReviewQueryTest from 'Pages/Test/ReviewQueryTest';
import OauthTest from 'Pages/OauthTest';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

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
    element: <Login />,
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
    element: <Counter />,
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
    path: '/test2',
    element: <OauthTest />,
  },
  {
    path: '/products/:categoryId',
    element: withLayout(ProductListPage),
  },
  {
    path: '*',
    element: (
      <>
        <Header />
        <NotFoundPage />
      </>
    ),
  },
  {
    path: '/address',
    element: <Address />,
  },
  {
    path: '/payment',
    element: withLayout(PaymentPage),
  },
  {
    path: '/test/review',
    element: <ReviewQueryTest />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
};

export default App;
