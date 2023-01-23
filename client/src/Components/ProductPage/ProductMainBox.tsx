import styled from 'styled-components';
import Ratingstar from 'Components/Common/Ratingstar';
import { useNumberComma } from 'Utils/commonFunction';
import { ToastContainer, toast } from 'react-toastify';
import CounterButton from './Counterbutton';
import CustomTitle from 'Components/Header/CustomTitle';
import 'react-toastify/dist/ReactToastify.css';
import BuyButton from 'Components/Common/BuyButton';
import { useState } from 'react';
import { useAppDispatch } from 'Redux/app/hook';
import { countset } from 'Redux/reducer/priceSlice';

const ProductMain = styled.div`
  margin: 0 auto;
  width: 920px;
  height: 480px;

  display: flex;
`;
const ImageBox = styled.img`
  width: 480px;
  height: 480px;
  margin-left: 30px;
`;
const ProductBox = styled.div`
  width: 400px;
  height: 480px;

  margin-left: 40px;
`;

const ProductPrice = styled.div<{ Mgtop: string }>`
  width: 350px;
  height: 27px;
  font-size: var(--large);
  font-weight: bold;
  margin-top: ${(props) => props.Mgtop};
`;

const ProductTitle = styled.h1`
  margin-top: 25px;
  width: 350px;
  height: 38px;
  font-size: var(--xlarge);
  font-weight: bold;
`;
const ProductContent = styled.p`
  max-width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nomal;
  display: -webkit-box;
  -webkit-line-clamp: 2;

  height: 50px;

  font-size: var(--medium);
  font-weight: bold;
`;
const ProductTable = styled.div<{
  Mgtop?: string;
  fontsize?: string;
  lhtop?: string;
}>`
  display: flex;

  justify-content: center;
  flex-direction: column;
  width: 350px;
  height: 50px;
  padding: 32px 0;
  margin-top: ${(props) => props.Mgtop};
  line-height: 16px;
  border-top: 1px solid var(--gray-05);
  font-size: ${(props) => props.fontsize};
  font-weight: bold;
  position: relative;
  line-height: ${(props) => props.lhtop};
  // cursor: pointer;
`;

const Price = styled.p`
  line-height: 1;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  vertical-align: baseline;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: var(--large);
  font-weight: 600;
  color: var(--priceColor);
`;

interface props {
  data: any;
}

const ProductMainBox: React.FC<props> = ({ data }) => {
  const [count, setCount] = useState<number>(1);
  const dispatch = useAppDispatch();

  const onIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const onDecrease = () => {
    setCount((prevCount) => {
      if (prevCount === 1) {
        return prevCount;
      }
      return prevCount - 1;
    });
  };

  const emptyBasketAlram = () =>
    toast.success('장바구니에 담는 중입니다.', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const fullBasketAlram = () =>
    toast.warning('이미 장바구니에 들어있습니다.', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  let search = location.href;
  search = 'returnUrl=' + search;

  // const getStorage = (object, ID) => {
  // window.location.href
  // 비로그인시 return url

  const onClickBasket = (data: any) => {
    const jsondata: string | null = localStorage.getItem('baskets');

    const baskets = JSON.parse(jsondata || '[]') || [];

    let IsSame: boolean = false;

    baskets.forEach((el: any) => {
      if (data.productId === el.productId) IsSame = true;
    });

    if (IsSame) {
      fullBasketAlram();

      return;
    }
    dispatch(countset({ id: data.productId, price: data.price, count: 1 }));
    baskets.push(data);

    emptyBasketAlram();
    localStorage.setItem('baskets', JSON.stringify(baskets));
  };

  return (
    <div>
      <ProductMain>
        <CustomTitle title={`${data.name} 상품 - FARMPI`} />
        <ImageBox src={data.photo}></ImageBox>
        <ProductBox>
          <ProductTitle className="font-serif">{data.name}</ProductTitle>
          <ProductContent>{data.description}</ProductContent>
          <Ratingstar num={4}></Ratingstar>
          <ProductPrice Mgtop="10px">
            {useNumberComma(data.price)}
            <span>원</span>
          </ProductPrice>

          <ProductTable fontsize="14px" lhtop="14px" Mgtop="28px">
            상품수량
            <CounterButton
              count={count}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </ProductTable>
          <ProductTable fontsize="16px" lhtop="16px" Mgtop="0">
            총 상품 금액
            <Price>
              {useNumberComma(data.price * count)}
              <span>원</span>
            </Price>
          </ProductTable>
          <BuyButton
            background={'var( --white-02)'}
            onClick={() => onClickBasket(data)}
          >
            장바구니담기
          </BuyButton>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
          <BuyButton background="var(--greenlogo);" color="var(--bg-white-05)">
            결제하기
          </BuyButton>
        </ProductBox>
      </ProductMain>
    </div>
  );
};

export default ProductMainBox;
