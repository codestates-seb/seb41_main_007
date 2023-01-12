import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './Components/Header/index';
import Main from './Pages/Main';
import Loading from './Components/Loading';
import Login from './Pages/Login';
import Counter from 'Redux/ex/counter';
import ObjectSaver from 'Redux/ex/objectSave';
import ReactQueryTest from 'Pages/ReactQueryTest';
import Footer from 'Components/Footer';
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
    path: '/Counter',
    element: <Counter />,
  },
  {
    path: '/:id',
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
