import { FC } from 'react';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import Product from 'Components/Common/Product';
import { TYPE_Product } from 'Types/common/product';
import Best_Product from 'Components/Common/Best_product';

const BestProduct: FC = () => {
  const size = 8;
  const page = 1;
  const sort = 'rating';
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
        <div className="mt-6 grid gap-y-10 gap-x-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data.data &&
            data.data.map((product: TYPE_Product) => {
              product['isBest'] = true;
              return <Best_Product key={product.productId} product={product} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default BestProduct;
