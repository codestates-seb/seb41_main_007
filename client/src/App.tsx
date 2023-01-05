import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Header from 'Components/Header';
import Main from 'Pages/Main';
import Loding from 'Components/Loding';
import login from 'Pages/Login';

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
    errorElement: <Loding />,
  },
  {
    path: '/:questionId',
    element: withLayout(login),
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
