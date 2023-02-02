import { FC } from 'react';
import styles from './Styles/ProductList.module.css';
import Product from './Product';
import { TYPE_Product } from '../../Types/common/product';
import useScrollTop from 'CustomHook/useScrollTop';

interface Props {
  products: TYPE_Product[];
}

const ProductList: FC<Props> = ({ products }) => {
  useScrollTop();
  console.log(products);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
