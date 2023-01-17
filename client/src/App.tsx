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
import Mypage from 'Pages/MyPage';
import Search from 'Pages/Search';

import Footer from 'Components/Common/Footer';

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
