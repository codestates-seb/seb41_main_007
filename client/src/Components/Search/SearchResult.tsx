import { FC } from 'react';
import ProductList from 'Components/ProductList';
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
      <ProductList products={data} />
    </ul>
  );
};

export default SearchResult;
