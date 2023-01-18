import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from 'Components/Pagination/Navigation';
import Product from 'Components/Common/Product';

import styles from './Styles/Product.module.css';
import { TYPE_PageInfo, TYPE_Product } from '../../Types/common/product.d';
import useScrollTop from '../../CustomHook/useScrollTop';
interface Props {
  productList: TYPE_Product[];
  pageInfo: TYPE_PageInfo;
  categoryId: string | undefined;
}

const ProductList: FC<Props> = ({ productList, pageInfo, categoryId }) => {
  useScrollTop();
  const navigate = useNavigate();
  const { page, totalPages } = pageInfo;
  const handlerSetOffset = (page: number) => {
    window.scrollTo(0, 0);
    return navigate(`/products/${categoryId}?page=${page}`);
  };
  return (
    <div>
      <div className={styles.Products_Container}>
        <div className={styles.Product_List_Container}>
          {productList.map((product: TYPE_Product) => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
      </div>
      <Navigation
        totalPage={totalPages}
        currentPage={page}
        callbackFunc={handlerSetOffset}
      />
    </div>
  );
};

export default ProductList;
