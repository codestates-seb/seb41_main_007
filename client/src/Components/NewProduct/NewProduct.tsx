import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import Data from 'Components/Common/Data';
import { useNavigate, Link } from 'react-router-dom';
const Container = styled.div`
  div {
    width: 100%;
    height: 360px;
  }
`;
const StyledSlider = styled(Slider)`
  position: relative;
  width: 100%;
  height: 400px;

  .slick-prev {
    top: 40%;
    left: -5%;
    z-index: 1;
    background-color: #7f7f7f;
    width: 40px;
    height: 40px;
  }
  .slick-prev:before {
    font-family: 'Font Awesome 5 Free';
    content: '<';
    color: white;
    font-size: 18px;
  }

  .slick-next:before {
    font-family: 'Font Awesome 5 Free';
    content: '>';
    color: white;
    font-size: 18px;
  }

  .slick-next {
    top: 40%;
    right: -3%;
    z-index: 1;
    background-color: #7f7f7f;
    width: 40px;
    height: 40px;
  }
`;
const NewProduct: React.FC = (): JSX.Element => {
  const size = 8;
  const page = 1;
  const sort = 'productId';
  const order = 'descending';
  const { data, isLoading, error } = useCustomQuery(
    `/products?sort=${sort}&order=${order}&page=${page}&size=${size}`,
    `product?sort=${sort}&order=${order}&page=${page}&size=${size}`,
  );

  if (isLoading) return <></>;
  if (error) return <>error났음</>;
  console.log(data.data);

  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="pb-7 text-4xl font-bold tracking-tight text-gray-900 font-serif">
          새로운 상품
        </h2>
        <Container>
          <StyledSlider {...settings}>
            {data.data &&
              data.data.map((data: any, i: any) => <Data key={i} {...data} />)}
          </StyledSlider>
        </Container>
      </div>
    </>
  );
};

export default NewProduct;
