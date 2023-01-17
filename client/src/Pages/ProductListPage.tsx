import Empty from 'Components/Common/Empty';
import ProductList from 'Components/ProductList/ProductList';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import styles from './Styles/ProductList.module.css';
import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CustomTitle from 'Components/Header/CustomTitle';
import NotFoundPage from './NotFoundPage';

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
    `categoryId${categoryId}page${pageQuery}`,
  );
  if (isLoading)
    return (
      <>
        <CustomTitle
          title={`${categoryId} 상품 리스트 | FarmPi`}
          description={`카테고리${categoryId}번 상품입니다`}
        />
        <Empty />;
      </>
    );
  if (error || data.data.length === 0)
    return (
      <>
        <NotFoundPage />
      </>
    );
  return (
    <main className={styles.Main_Container}>
      <CustomTitle
        title={`${categoryId} 상품 리스트 | FarmPi`}
        description={`카테고리${categoryId}번 상품입니다`}
      />
      <div className={styles.Line_Container}>
        카테고리 {categoryId}번 상품들
      </div>
      <ProductList
        productList={data.data}
        pageInfo={data.pageInfo}
        categoryId={categoryId}
      />
    </main>
  );
};

export default ProductListPage;
