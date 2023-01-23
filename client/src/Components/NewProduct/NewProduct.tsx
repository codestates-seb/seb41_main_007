import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import Data from 'Components/Common/Data';
const Container = styled.div`
  div {
    width: 100%;
    height: 360px;
  }
`;
// interface useItemProps {
//   photo: string;
//   name: string;
//   price: number;
// }

// const Content = styled.div`
//   img {
//     width: 280px;
//     height: 250px;
//     margin-bottom: 5px;
//   }
//   span {
//     display: block;
//   }
// `;

// const Data = ({ photo, name, price }: useItemProps) => {
//   return (
//     <>
//       <Content>
//         <img src={photo} alt="carousel"></img>
//         <span className="text-red-600 text-xs mt-4">#신제품</span>
//         <span className="font-semibold text-sm mt-2">{name}</span>
//         <span className="text-gray-400 text-xs mt-1">
//           주문시 10% 추가 할인쿠폰 사용 가능
//         </span>
//         <span className="text-red-700 font-semibold text-sm mt-2">
//           {useNumberComma(price)}원
//         </span>
//       </Content>
//     </>
//   );
// };
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
  if (error) return <>error낫음</>;
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
