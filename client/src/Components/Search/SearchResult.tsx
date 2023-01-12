import { FC } from 'react';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import ProductList from 'Components/ProductList';
interface Props {
  sch: string;
}

const SearchResult: FC<Props> = ({ sch }) => {
  const { data, isLoading } = useCustomQuery(
    `/products${sch}`,
    `product${sch}`,
  );
  if (isLoading) return <></>;

  return (
    <ul>
      <ProductList products={data.data} />
    </ul>
  );
};

export default SearchResult;
