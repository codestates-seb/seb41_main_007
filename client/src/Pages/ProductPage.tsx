import React from 'react';
import styled from 'styled-components';

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
`;
const ProductBox = styled.div`
  width: 400px;
  height: 480px;
  border: 2px solid blue;
  margin-left: 40px;
`;

const ProductPrice = styled.div`
  width: 350px;
  height: 50px;
  font-size: var(--large);
  font-weight: bold;
`;

const ProductTitle = styled.h1`
  width: 350px;
  height: 50px;
  font-size: var(--xlarge);
  font-weight: bold;
`;
const ProductContent = styled.p`
  width: 350px;
  height: 50px;
  font-size: var(--medium);
  font-weight: bold;
`;
const ProductTable = styled.div`
  width: 350px;
  height: 50px;
  padding: 20px 0;
  line-height: 16px;
  border-top: 1px solid var(--black-20);
  font-size: var(--medium);
  font-weight: bold;
  position: relative;
  // cursor: pointer;
`;
const CounterDiv = styled.div`
  --swiper-theme-color: #007aff;
  --swiper-navigation-size: 44px;
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
`;
const CounterButton = styled.button`
  cursor: pointer;
`;

const CounterInput = styled.input``;

const ProductPage: React.FC = () => {
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

  return (
    <ProductContainer>
      <ProductMenuTitle>상품이야~</ProductMenuTitle>
      <ProductMain>
        <ImageBox>상품이야~</ImageBox>
        <ProductBox>
          <ProductPrice>공백</ProductPrice>
          <ProductTitle>표준 차례상 세트</ProductTitle>
          <ProductContent>정성을 가득 담은 표준 차례상이에요</ProductContent>
          <ProductPrice>2,000원</ProductPrice>
          <ProductTable>
            상품수량
            <CounterDiv>
              <CounterButton>
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0"
                />
                <span className="material-symbols-outlined">add_box</span>
              </CounterButton>
              <CounterInput></CounterInput>
              <CounterButton>
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
                />
                <span className="material-symbols-outlined">
                  indeterminate_check_box
                </span>
              </CounterButton>
            </CounterDiv>
          </ProductTable>
          <ProductTable>총상품금액</ProductTable>
          히히
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
