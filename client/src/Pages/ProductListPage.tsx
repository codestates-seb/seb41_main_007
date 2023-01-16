import Empty from 'Components/Common/Empty';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const ProductListPage: FC = () => {
  let { categoryId } = useParams();
  const { isLoading, data, error } = useCustomQuery('/', 'qe');
  if (isLoading) return <Empty />;
  if (error) return <div>error</div>;
  console.log(categoryId, data);
  return <div></div>;
};

export default ProductListPage;
