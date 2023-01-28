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
import { useNavigate } from 'react-router-dom';
import SelectBox from 'Components/BasketPage/SelectBox';
import { TYPE_ProductOption, counttype } from 'Types/common/product';
import { useSession } from 'CustomHook/useSession';
const ProductMain = styled.div`
  margin: 0 auto 50px auto;
  width: 920px;
  height: 480px;

  display: flex;
`;
const ImageBox = styled.img`
  width: 500px;
  height: 500px;
  margin-left: 30px;
  margin-top: 83px;
  background: red;
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
  margin-bottom: 20px;
`;

const ProductTitle = styled.h1`
  margin-top: 100px;
  margin-bottom: 15px;
  width: 350px;
  height: 38px;
  font-size: var(--xxlarge);
  font-weight: bold;
`;
const ProductContent = styled.p`
  max-width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: -webkit-box;
  -webkit-line-clamp: 1;

  height: 50px;

  font-size: var(--medium);
  font-weight: bold;
  margin-bottom: -20px;
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
  height: 45px;
  padding: 32px 0;
  margin-top: ${(props) => props.Mgtop};
  line-height: 16px;
  border-top: 1px solid var(--gray-05);
  font-size: ${(props) => props.fontsize};
  font-weight: bold;
  position: relative;
  line-height: ${(props) => props.lhtop};
  // cursor: pointer;
  margin-bottom: -5px;
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

// interface counttype {
//   id: number;
//   price: number;
//   count: number;
//   optionprice: number;
//   optionname: string;
//   productOptionId: number;
// }
const ProductMainBox: React.FC<props> = ({ data }) => {
  const [count, setCount] = useState<number>(1);
  const [option, setOption] = useState<TYPE_ProductOption>(
    data.productOptionResponseDtos[0],
  );
  const { session, loading } = useSession();
  if (loading) return <></>;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  if (session) {
    //확인용
    fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session}`,
      },
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((res: Response) => {
        console.log(res);
      });
  }

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

  const onClickBasket = (data: any) => {
    const jsondata: string | null = localStorage.getItem('baskets');
    const baskets = JSON.parse(jsondata || '[]') || [];

    const jsondataCounter: string | null =
      localStorage.getItem('basketsCounter');
    const basketsCounter = JSON.parse(jsondataCounter || '[]') || [];
    let IsSame: boolean = false;

    basketsCounter.forEach((el: any) => {
      if (el.productOptionId === option.productOptionId) {
        IsSame = true;
      }
    });

    // baskets.forEach((el: any) => {
    //   console.log(el.productOptionResponseDtos);
    //   if (data.productId === el.productId) IsSame = true;
    // });

    if (IsSame) {
      fullBasketAlram();

      return;
    }

    data.productOptionResponseDtos.forEach((element: TYPE_ProductOption) => {
      if (element.productOptionId === option.productOptionId) {
        const newData = { ...data, productOptionResponseDtos: element };
        baskets.push(newData);
        const dispatchdata = {
          id: newData.productOptionResponseDtos.productOptionId,
          price: data.price + option.price,
          count: count,
        };
        dispatch(countset(dispatchdata));
      }
    });

    const datacount: counttype = {
      id: data.productId,
      price: data.price,
      optionprice: option.price,
      optionname: option.productOptionName,
      productOptionId: option.productOptionId,
      count: count,
    };

    basketsCounter.push(datacount);
    emptyBasketAlram();
    localStorage.setItem('basketsCounter', JSON.stringify(basketsCounter));
    //백업용
    localStorage.setItem('baskets', JSON.stringify(baskets));
    if (session) {
      const suggest = {
        productOptionId: option.productOptionId,
        quantity: count,
      };

      fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
        body: JSON.stringify(suggest),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
        method: 'POST',
      }).then((response) => console.log(response));
    }
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
          <ProductPrice Mgtop="2px">
            {useNumberComma(data.price)}
            <span>원</span>
          </ProductPrice>
          <SelectBox
            Optiondata={data.productOptionResponseDtos}
            setOption={setOption}
          ></SelectBox>
          <ProductTable fontsize="14px" lhtop="14px" Mgtop="20px">
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
              {useNumberComma((data.price + option.price) * count)}
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
          <BuyButton
            background="var(--greenlogo);"
            color="var(--bg-white-05)"
            onClick={() => navigate('/basket')}
          >
            결제하기
          </BuyButton>
        </ProductBox>
      </ProductMain>
    </div>
  );
};

export default ProductMainBox;
//객체 배열관리
//밀림 현상
//백엔드와 소통
// let search = location.href;
// search = 'returnUrl=' + search;

// // const getStorage = (object, ID) => {
// // window.location.href
// // 비로그인시 return url
//옵션아이디로 수정함녀서 괴랄해짐
//유지보수 고려한 코딩
