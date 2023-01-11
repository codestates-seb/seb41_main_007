import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Components/Header/index';
import Main from './Pages/Main';
import Loading from './Components/Loading';
import Login from './Pages/Login';
import Counter from 'Redux/ex/counter';
import ObjectSaver from 'Redux/ex/objectSave';
import ProductPage from 'Pages/ProductPage';

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
    element: withLayout(ProductPage),
  },
  {
    path: '/Counter',
    element: <Counter />,
  },
  {
    path: '/ObjectSaver',
    element: <ObjectSaver />,
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
