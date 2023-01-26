import { Size } from 'Components/Common/Carousel';
import { Paper } from '@mui/material';

const MainImage = () => {
  return (
    <>
      {' '}
      <div className="h-32"></div>
      <Size>
        <Paper>
          <div className="background1 ">
            <div className="object-none relative">
              <div className="absolute lg:inset-y-28 lg:left-80 md:inset-y-14 md:left-20 inset-y-4">
                <div className="flex">
                  <div className="bg-cyan-700 text-white w-36 h-9 pt-1 text-lg font-semibold text-center rounded-md mr-2">
                    30% 쿠폰까지
                  </div>
                  <div className="bg-cyan-700 text-white w-16 h-9 pt-1 text-lg font-semibold text-center rounded-md">
                    D-8
                  </div>
                </div>
              </div>
              <h1 className="absolute lg:inset-y-44 lg:left-80 lg:text-5xl md:inset-y-28 md:text-4xl md:left-20 font-semibold inset-y-16 text-3xl">
                농자재 전문몰 FarmPi🌿
              </h1>
              <p className="absolute lg:inset-y-64 lg:left-80 lg:text-2xl md:inset-y-44 md: text-xl md:left-20 inset-y-32">
                신상품부터 베스트상품까지
              </p>
              <p className="absolute lg:inset-y-72 lg:left-80 lg:text-2xl md:inset-y-52 md:left-20 md:text-xl inset-y-40 text-xl">
                지금 바로 부담없이 시작해보세요!
              </p>
            </div>
            <div className="">
              <img
                src={'/image/carousel1.gif'}
                alt="carousel"
                className="object-none sm:object-left md:object-center lg:object-right lg:pr-72"
              ></img>
            </div>
          </div>
        </Paper>
      </Size>
    </>
  );
};

export default MainImage;
