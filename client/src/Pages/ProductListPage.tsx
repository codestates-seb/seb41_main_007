import Empty from 'Components/Common/Empty';
import ProductList from 'Components/ProductList/ProductList';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import styles from './Styles/ProductList.module.css';
import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ProductListPage: FC = () => {
  let { categoryId } = useParams();
  const location = useLocation();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const pageQuery = params.get('page');
  const { isLoading, data, error } = useCustomQuery(
    pageQuery
      ? `/products?categoryId=${categoryId}&page=${parseInt(pageQuery)}`
      : `/products?categoryId=${categoryId}`,
    `categories${categoryId}page${pageQuery}`,
  );
  if (isLoading) return <Empty />;
  if (error || data.data.length === 0) return <div>error</div>;
  return (
    <main className={styles.Main_Container}>
      <div className={styles.Line_Container}>카테고리 1번 상품들</div>
      <ProductList
        productList={data.data}
        pageInfo={data.pageInfo}
        categoryId={categoryId}
      />
    </main>
  );
};

export default ProductListPage;
