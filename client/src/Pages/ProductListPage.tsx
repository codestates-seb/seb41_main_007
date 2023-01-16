import Empty from 'Components/Common/Empty';
import ProductList from 'Components/ProductList/ProductList';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import styles from './Styles/Main.module.css';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const ProductListPage: FC = () => {
  let { categoryId } = useParams();
  const { isLoading, data, error } = useCustomQuery(
    `/products?categoryId=${categoryId}`,
    ' categories',
  );
  if (isLoading) return <Empty />;
  if (error || data.data.length === 0) return <div>error</div>;
  return (
    <main className={styles.Main_Container}>
      <ProductList
        productList={data.data}
        pageInfo={data.pageInfo}
        categoryId={categoryId}
      />
    </main>
  );
};

export default ProductListPage;
