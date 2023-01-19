import { FC } from 'react';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
const products = [
  {
    id: 1,
    name: '방조망 벽색 1.5cm/5kg 참새망 그물 조류방지',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '27,000원',
  },
  {
    id: 2,
    name: '방조망 벽색 1.5cm/5kg 참새망 그물 조류방지',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '27,000원',
  },
  {
    id: 3,
    name: '방조망 벽색 1.5cm/5kg 참새망 그물 조류방지',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '27,000원',
  },
  {
    id: 4,
    name: '방조망 벽색 1.5cm/5kg 참새망 그물 조류방지',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '27,000원',
  },
  {
    id: 5,
    name: '방조망 벽색 1.5cm/5kg 참새망 그물 조류방지',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '27,000원',
  },
  {
    id: 6,
    name: '방조망 벽색 1.5cm/5kg 참새망 그물 조류방지',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '27,000원',
  },
  {
    id: 7,
    name: '방조망 벽색 1.5cm/5kg 참새망 그물 조류방지',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '27,000원',
  },
  {
    id: 8,
    name: '방조망 벽색 1.5cm/5kg 참새망 그물 조류방지',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '27,000원',
  },
  // More products...
];

const ExampleBest: FC = () => {
  const size = 8;
  const page = 1;
  const sort = 'likeCount';
  const order = 'descending';
  const { data, isLoading, error } = useCustomQuery(
    `/products?sort=${sort}&order=${order}&page=${page}&size=${size}`,
    `product?sort=${sort}&order=${order}&page=${page}&size=${size}`,
  );

  if (isLoading) return <></>;
  if (error) return <>error낫음</>;
  console.log(data.data);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold font-serif tracking-tight text-gray-900">
          베스트 상품
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* Component/Common/Product.
          {data.data && data.data.map((el:any)=>{ */}
          {/* return <Product key={product.productId} product={product} />          
          }); } */}
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
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
  );
};

export default ExampleBest;
