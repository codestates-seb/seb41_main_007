import { FC } from 'react';
import styles from './Styles/ProductList.module.css';
import Product from './Product';
import { TYPE_Product } from '../../Types/common/product.d';

interface Props {
  products: TYPE_Product[];
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <div className={styles.Products_Container}>
      <div className={styles.Product_List_Container}>
        {products.map((product) => (
          <Product key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
