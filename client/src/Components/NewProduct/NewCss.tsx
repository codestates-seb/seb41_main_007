import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faB, faChevronRight } from '@fortawesome/free-brands-svg-icons';
// library.add(fab, faAlignRight);
const Container = styled.div`
  div {
    width: 1200px;
    height: 300px;
  }
`;
interface useItemProps {
  url: string;
}

const Content = styled.div`
  img {
    width: 280px;
    height: 250px;
    margin-bottom: 5px;
  }
`;
const Data = ({ url }: useItemProps) => {
  return (
    <>
      <Content>
        <img src={url} alt="carousel"></img>
        <div className="text-red-500">#신제품</div>
        <div className="font-semibold">새로운 상품 새모이 장비</div>
        <div className="text-gray-400">주문시 10% 추가 할인쿠폰 사용 가능</div>
        <div className="text-red-500 font-semibold">7200원</div>
      </Content>
    </>
  );
};
const StyledSlider = styled(Slider)`
  position: relative;
  width: 100%;
  height: 400px;

  .slick-prev {
    top: 45%;
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
    top: 45%;
    right: -4%;
    z-index: 1;
    background-color: #7f7f7f;
    width: 40px;
    height: 40px;
  }
`;
const NewCarousel: React.FC = (): JSX.Element => {
  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };
  const datas = [
    {
      url: `https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg`,
    },
    {
      url: `https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg`,
    },
    {
      url: `https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg`,
    },
    {
      url: `https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg`,
    },
    {
      url: `https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg`,
    },
  ];
  return (
    <>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="pb-7 text-4xl font-bold tracking-tight text-gray-900 font-serif">
          새로운 상품
        </h2>
        <Container>
          <StyledSlider {...settings}>
            {datas.map((data, i) => (
              <Data key={i} {...data} />
            ))}
          </StyledSlider>
        </Container>
      </div>
    </>
  );
};

export default NewCarousel;
