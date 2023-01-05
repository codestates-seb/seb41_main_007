import { FC } from 'react';
import { Link } from 'react-router-dom';

const Button: FC = () => {
  return (
    <>
      <Link
        to="/"
        className="text-gray-800 dark:text-white hover:bg-gray-50
        focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4
        py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700
        focus:outline-none dark:focus:ring-gray-800"
      >
        Login
      </Link>

      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        to="/"
      >
        Sign up
      </Link>
    </>
  );
};

export default Button;
