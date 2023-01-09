import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/index';
import Main from './Pages/Main';
import Loading from './Components/Loading';
import Login from './Pages/Login';
import ProductDetailPage from 'Pages/ProductDetailPage';

const withLayout = (Component: React.FC): JSX.Element => {
  return (
    <>
      <Header />
      <Component />
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
    path: '/:product',
    element: <ProductDetailPage />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
