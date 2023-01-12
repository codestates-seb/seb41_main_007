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
import Search from 'Pages/Search';
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

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
    path: '/test/counter',
    element: <ObjectSaver />,
  },
  {
    path: '/test',
    element: <ReactQueryTest />,
  },
  {
    path: '/products',
    element: (
      <>
        <Header />
        <Search />
      </>
    ),
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
