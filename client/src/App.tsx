import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Header from 'Components/Header';
import Main from 'Pages/Main';
import Loding from 'Components/Loding';
import Login from 'Pages/Login';
import { Carousell } from 'Components/Carousel';
const withLayout = (Component: React.FC): JSX.Element => {
  return (
    <>
      <Header />
      <Component />
      <Carousell />
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
    path: '/login',
    element: <Login />,
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
