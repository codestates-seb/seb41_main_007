import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from './Components/Loading/Loading';
import Empty from 'Components/Common/Empty';
import Counter from 'Redux/ex/counter';
import ObjectSaver from 'Redux/ex/objectSave';
import React from 'react';
import NotFoundPage from 'Pages/NotFoundPage';
import Main from './Pages/Main';
import Auth from 'Pages/Auth';
import Post from 'Pages/Post/Post';
import Test from 'Pages/Test';
import WithLayout from 'Components/WithLayout';

const Login = React.lazy(() => import('./Pages/Login'));
const PaymentPage = React.lazy(() => import('Pages/PaymentPage'));
const ProductListPage = React.lazy(() => import('Pages/CategoryListPage'));
const BasketsPage = React.lazy(() => import('Pages/BasketPage'));
const ProductPage = React.lazy(() => import('Pages/ProductPage'));
const AllProductsPage = React.lazy(() => import('Pages/AllProductsPage'));
const Search = React.lazy(() => import('Pages/Search'));
const MyPage = React.lazy(() => import('Pages/MyPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <WithLayout />,
    errorElement: <Empty />,
    children: [
      { index: true, path: '/', element: <Main /> },
      { path: '/login', element: <Login /> },
      { path: '/product/:productid', element: <ProductPage /> },
      { path: '/products', element: <Search /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/Basket', element: <BasketsPage /> },
      { path: '/Counter', element: <Counter /> },
      { path: '/test/counter', element: <ObjectSaver /> },
      { path: '/products/all', element: <AllProductsPage /> },
      { path: '/products/:categoryId', element: <ProductListPage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/payment', element: <PaymentPage /> },
      { path: '/post', element: <Post /> },
      { path: '/test', element: <Test /> },
      { path: '/auth', element: <Auth /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
