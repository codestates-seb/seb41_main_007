import { FC, lazy } from 'react';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
const LazyProductList = lazy(() => import('Components/ProductList'));
// interface SearchProps {
//   productId: number;
//   name: string;
//   price: number;
//   photo: string;
// }

interface Props {
  sch: string;
}

const SearchResult: FC<Props> = ({ sch }) => {
  const { data, isLoading } = useCustomQuery(
    `/products${sch}`,
    'productsSearch',
  );
  if (isLoading) return <></>;

  return (
    <ul>
      <LazyProductList products={data.data} />
    </ul>
  );
};

export default SearchResult;
