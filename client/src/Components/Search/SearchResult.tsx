import { FC, lazy, Suspense } from 'react';

import LoadingList from 'Components/Loading/LoadingList';
const LazyProductList = lazy(() => import('Components/ProductList'));
interface SearchProps {
  productId: number;
  name: string;
  price: number;
  photo: string;
}

interface Props {
  data: SearchProps[];
}

const SearchResult: FC<Props> = ({ data }) => {
  return (
    <ul>
      <Suspense fallback={<LoadingList num={data.length} />}>
        <LazyProductList products={data} />
      </Suspense>
    </ul>
  );
};

export default SearchResult;
