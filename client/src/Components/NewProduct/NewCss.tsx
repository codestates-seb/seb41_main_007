import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const NewCarousel = () => {
  const settings = {
    dots: true, // 캐러셀의 점을 보여줄 것인지
    infinite: true, // 마지막 장 다음에 첫번째가 나오게 할 것인지
    speed: 500, // 넘어가는 속도는 몇으로 할 것인지
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="pb-7 text-2xl font-bold tracking-tight text-gray-900">
          New
        </h2>
        <div className="carousel">
          <Slider {...settings}>
            <div>Slide1</div>
            <div>Slide2</div>
            <div>Slide3</div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default NewCarousel;
