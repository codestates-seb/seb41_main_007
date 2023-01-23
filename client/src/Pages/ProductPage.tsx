import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
// import { flushSync } from 'react-dom';
import CounterButton from 'Components/ProductPage/Counterbutton';
import { useNumberComma } from 'Utils/commonFunction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Empty from 'Components/Common/Empty';
import CustomTitle from 'Components/Header/CustomTitle';
import BuyButton from 'Components/Common/BuyButton';
import useScrollTop from 'CustomHook/useScrollTop';
import { useAppDispatch } from 'Redux/app/hook';
import { countset } from 'Redux/reducer/priceSlice';
import Ratingstar from 'Components/Common/Ratingstar';
import { BGcontainer } from 'Components/Common/BGcontainer';

const ProductContainer = styled.div`
  margin-top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ProductMenuTitle = styled.h2`
  font-size: var(--xlarge);
  font-weight: bold;
  padding: 30px;
`;
const ProductMain = styled.div`
  margin: 0 auto;
  width: 920px;
  height: 480px;

  display: flex;
`;
const ImageBox = styled.img`
  width: 480px;
  height: 480px;
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
  width: 350px;
  height: 25px;
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

export interface counterProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

//1번 현재주소를 받아와야함
//2번 ?reurl= 현재주소 넣어줘야함
//3번 읽고 돌아와야함

const ProductPage: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const dispatch = useAppDispatch();
  useScrollTop();
  let param = useParams();
  const { data, isLoading, error } = useCustomQuery(
    `/products/${param.productid}`,
    `products${param.productid}`,
  );
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

  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt:
        'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt:
        'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt:
        'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt:
        'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
  ];

  const features = [
    { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
    {
      name: 'Material',
      description:
        'Solid walnut base with rare earth magnets and powder coated steel card cover',
    },
    { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
    {
      name: 'Finish',
      description: 'Hand sanded and finished with natural oil',
    },
    { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
    {
      name: 'Considerations',
      description:
        'Made from natural materials. Grain and color vary with each item.',
    },
  ];

  if (isLoading) return <Empty />;
  if (error) return <></>;
  console.log(data);
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

  //리턴 url , 로컬스토리지에 담기
  return (
    <BGcontainer>
      <ProductContainer>
        <ProductMenuTitle></ProductMenuTitle>
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

            <ProductTable fontsize="14px" lhtop="14px" Mgtop="50px">
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
            <BuyButton
              background="var(--greenlogo);"
              color="var(--bg-white-05)"
            >
              결제하기
            </BuyButton>
          </ProductBox>
        </ProductMain>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500"></p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Technical Specifications
              </h2>
              <p className="mt-4 text-gray-500">
                The walnut wood card tray is precision milled to perfectly fit a
                stack of Focus cards. The powder coated steel divider separates
                active cards from new ones, or can be used to archive important
                task lists.
              </p>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {features.map((feature) => (
                  <div
                    key={feature.name}
                    className="border-t border-gray-200 pt-4"
                  >
                    <dt className="font-medium text-gray-900">
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                className="rounded-lg bg-gray-100"
              />
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                alt="Top down view of walnut card tray with embedded magnets and card groove."
                className="rounded-lg bg-gray-100"
              />
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                alt="Side of walnut card tray with card groove and recessed card area."
                className="rounded-lg bg-gray-100"
              />
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                alt="Walnut card tray filled with cards and card angled in dedicated groove."
                className="rounded-lg bg-gray-100"
              />
            </div>
          </div>
        </div>
      </ProductContainer>
    </BGcontainer>
  );
};

export default ProductPage;

//버튼 후버기능 제거하기
//카운터 버튼 오류 안보이게 하기
// const notify = () => toast.info("toastify test!");
// // 성공 알람 ( 초록색 창 )
// const success = () => toast.success("Success!");
// // 실패 알람 ( 빨간색 창 )
// const error = () => toast.error("Error!");
// // 경고 알람 ( 노란색 창 )
// const warning = () => toast.warning("Warnning!");
// // 정보 알람
// const info = () => toast.info("Info...");
// toast
// 도트깨짐
