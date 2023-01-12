import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/index';
import Main from './Pages/Main';
import Loading from './Components/Loading';
import Login from './Pages/Login';
import Counter from 'Redux/ex/counter';
import ObjectSaver from 'Redux/ex/objectSave';
import { ReviewRead } from 'Components/Review/ReviewRead';
import NewCarousel from 'Components/NewProduct/NewCss';

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
    path: '/Counter',
    element: <Counter />,
  },
  {
    path: '/:id',
    element: <ObjectSaver />,
  },
  {
    path: '/review',
    element: <ReviewRead />,
  },
  {
    path: '/example/new',
    element: <NewCarousel />,
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
