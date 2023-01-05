import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Header from 'Components/Header';
import Main from 'Pages/Main';
import Loding from 'Components/Loding';
import login from 'Pages/Login';

const withLayout = (Component: any) => {
  console.log(Component);
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
    path: '/:questionId', //useParams()를 쓸때 ":"이용
    element: withLayout(login),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
