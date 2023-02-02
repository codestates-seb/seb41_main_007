import Slider from 'react-slick';
import { FC } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { TYPE_Product } from 'Types/common/product';
import Product from './Product';
import { useMediaQuery } from 'react-responsive';
import styles from './Styles/ProductSlider.module.css';
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

interface Props {
  productList: TYPE_Product[];
  isNew?: boolean;
  isBest?: boolean;
}

const ProductSlider: FC<Props> = ({
  productList,
  isNew = false,
  isBest = false,
}) => {
  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <StyledSlider {...settings}>
      {productList.map((product: TYPE_Product) => {
        if (isNew) {
          product['isNew'] = true;
        }
        if (isBest) {
          product['isBest'] = true;
        }
        return <Product key={product.productId} product={product} />;
      })}
    </StyledSlider>
  );
};

export default ProductSlider;
