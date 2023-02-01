import { useNavigate } from 'react-router-dom';

const StartDive = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 mt-8 mb-4 ">
      <div className="mx-auto max-w-7xl py-12 px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block ">Ready to FarmPI in?</span>
          <span className="block mt-4 text-green-600">
            회원가입을 통해 특별한 혜택을 누리세요
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-5 py-3 text-base font-medium text-white hover:bg-green-700"
            >
              Get started
            </button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <button
              onClick={() =>
                navigate(
                  '/products/all?sort=likeCount&order=ascending&page=1&size=20',
                )
              }
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-green-600 hover:bg-green-50"
            >
              All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StartDive;
