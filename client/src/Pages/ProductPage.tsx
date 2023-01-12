import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

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
  border: 2px solid red;
  display: flex;
`;
const ImageBox = styled.div`
  width: 480px;
  height: 480px;
  border: 2px solid red;
  background-image: url(https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg);
  background-position: 40% 50%;
`;
const ProductBox = styled.div`
  width: 400px;
  height: 480px;
  border: 2px solid yellow;
  margin-left: 40px;
`;

const ProductPrice = styled.div<{ Mgtop: string }>`
  width: 350px;
  height: 30px;
  font-size: var(--large);
  font-weight: bold;
  margin-top: ${(props) => props.Mgtop};
`;

const ProductTitle = styled.h1`
  width: 350px;
  height: 38px;
  font-size: var(--xlarge);
  font-weight: bold;
`;
const ProductContent = styled.p`
  width: 350px;
  height: 37px;
  font-size: var(--medium);
  font-weight: bold;
`;
const ProductTable = styled.div<{
  Mgtop: string;
  fontsize: string;
  lhtop: string;
}>`
  display: flex;

  justify-content: center;
  flex-direction: column;
  width: 350px;
  height: 50px;
  padding: 32px 0;
  margin-top: ${(props) => props.Mgtop};
  line-height: 16px;
  border-top: 1px solid var(--black-20);
  font-size: ${(props) => props.fontsize};
  font-weight: bold;
  position: relative;
  line-height: ${(props) => props.lhtop};
  // cursor: pointer;
`;
const CounterDiv = styled.div`
  line-height: 1;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: blue;
`;
const CounterDivBox = styled.div`
  line-height: 1;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  position: relative;
  width: 77px;
  border: 1px solid #e5e5e5;
`;
const CounterButton = styled.button<{ isTrue: boolean }>`
  cursor: pointer;
  outline: none;
  padding: 0;
  border: 0;

  line-height: 1;
  background: none;
  font-family: inherit;
  border-radius: 0;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 0;

  ${(props) => (props.isTrue ? 'left: 0' : 'right: 0')};
  border-right: 1px solid #e5e5e5;
  background: lightgreen;
`;

const CounterInput = styled.input`
  border: 0;
  border-radius: 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  height: 24px;
  padding: 0 10px 0 24px;
  text-align: center;
  font-size: 12px;
  background: blue;
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
  color: #b41c11;
`;

const BuyButton = styled.a`
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  vertical-align: baseline;
  background: transparent;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid #e5e5e5;
  white-space: nowrap;
  height: 60px;
  line-height: 60px;
  padding: 0 12px;
  color: #fff;
  display: block;
  width: 350px;
  border-color: #0d5611;
  background-color: #0d5611;
  margin-top: 13px;
`;

//1번 현재주소를 받아와야함
//2번 ?reurl= 현재주소 넣어줘야함
//3번 읽고 돌아와야함
const ProductPage: React.FC = () => {
  let param = useParams();
  let search = location.href;
  search = 'returnUrl=' + search;
  console.log(param);
  console.log(search);

  const [count, setCount] = useState<number>(1);
  const [result, setresult] = useState<number>(3000);
  const { data, isLoading, error } = useCustomQuery(
    `/products/${param}`,
    `products${param}`,
  );
  const onIncrease = () => {
    console.log(count, result);
    setCount((prevCount) => prevCount + 1);
    console.log(count);
  };

  const onDecrease = () => {
    setCount((prevCount) => {
      if (prevCount === 1) {
        return prevCount;
      }
      return prevCount - 1;
    });
  };
  // const getStorage = (object, ID) => {
  // window.location.href
  // 비로그인시 return url
  const onClickBasket = () => {
    const jsondata: string | null = localStorage.getItem('baskets');
    console.log(jsondata);
    const baskets = JSON.parse(jsondata || '[]') || [];
    console.log(baskets);
    // let isSame = false;
    // baskets.forEach((el) => {
    //   if (object.id === el.id) isSame = true;
    // });

    // if(isSame){
    //   console.log("이미장바구니");
    //   return;
    // }
    // baskets.push(Object);

    localStorage.setItem('baskets', JSON.stringify(baskets));
  };

  useEffect(() => {
    setresult(count * 3000);
  }, [count]);

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

  //리턴 url , 로컬스토리지에 담기
  return (
    <ProductContainer>
      <ProductMenuTitle></ProductMenuTitle>
      <ProductMain>
        <ImageBox></ImageBox>
        <ProductBox>
          <ProductPrice Mgtop="0"></ProductPrice>
          <ProductTitle className="font-serif">말파이트 트랙터</ProductTitle>
          <ProductContent>국내산 최고의 제품</ProductContent>
          <ProductPrice Mgtop="0">3,000원</ProductPrice>
          <ProductTable fontsize="14px" lhtop="14px" Mgtop="50px">
            상품수량
            <CounterDiv>
              <CounterDivBox>
                <CounterButton onClick={onIncrease} isTrue={true} type="button">
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0"
                  />
                  <span className="material-symbols-outlined">add_box</span>
                </CounterButton>
                <CounterInput
                  type="number"
                  value={count}
                  readOnly
                ></CounterInput>
                <CounterButton onClick={onDecrease} isTrue={false}>
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
                  />
                  <span className="material-symbols-outlined">
                    indeterminate_check_box
                  </span>
                </CounterButton>
              </CounterDivBox>
            </CounterDiv>
          </ProductTable>
          <ProductTable fontsize="16px" lhtop="16px" Mgtop="0">
            총 상품 금액
            <Price>
              {result}
              <span>원</span>
            </Price>
          </ProductTable>
          <BuyButton onClick={onClickBasket}>장바구니 담기</BuyButton>
          <BuyButton>결제하기</BuyButton>
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
                        <span aria-hidden="true" className="absolute inset-0" />
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
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
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
  );
};

export default ProductPage;
