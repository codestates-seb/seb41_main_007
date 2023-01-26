import { FC } from 'react';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import Product from 'Components/Common/Product';
import { TYPE_Product } from 'Types/common/product';

// import styled from 'styled-components';
// const Content = styled.div`
//   span {
//     display: block;
//   }
// `;

const BestProduct: FC = () => {
  const size = 8;
  const page = 1;
  const sort = 'likeCount';
  const order = 'descending';
  const { data, isLoading, error } = useCustomQuery(
    `/products?sort=${sort}&order=${order}&page=${page}&size=${size}`,
    `product?sort=${sort}&order=${order}&page=${page}&size=${size}`,
  );

  if (isLoading) return <></>;
  if (error) return <></>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl font-bold font-serif tracking-tight text-gray-900">
          베스트 상품
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.data &&
            data.data.map((product: TYPE_Product) => {
              product['isBest'] = true;
              return <Product key={product.productId} product={product} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default BestProduct;

// {data.data &&
//   data.data.map((el: any) => {
//     return <Product key={product.productId} product={product} />;
//   })}
// {products.map((product) => (
//   <div key={product.id} className="group relative">
//     <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
//       <img
//         src={product.imageSrc}
//         alt={product.imageAlt}
//         className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//       />
//     </div>
//     <div className="mt-4">
//       <div>
//         <h3 className="text-sm text-gray-700">
//           <a href={product.href}>
//             <span aria-hidden="true" className="absolute inset-0" />
//             {product.name}
//           </a>
//         </h3>
//       </div>
//       <p className="text-sm font-medium text-gray-900">
//         {product.price}
//       </p>
//     </div>
//   </div>
// ))}
