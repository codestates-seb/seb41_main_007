import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import ProductList from 'Components/Search/ProductList';
import Navigation from 'Components/Pagination/Navigation';
import Empty from 'Components/Common/Empty';
interface Props {
  sch: string;
}

const SearchResult: FC<Props> = ({ sch }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useCustomQuery(
    `/products${sch}`,
    `product${sch}`,
  );
  const handlerSetOffset = (page: number) => {
    window.scrollTo(0, 0);
    return navigate(`/products${sch.split('page=')[0]}page=${page}`);
  };
  if (isLoading) return <Empty />;
  const { page, totalPages } = data.pageInfo;
  return (
    <ul>
      <>
        <ProductList products={data.data} />
        <Navigation
          totalPage={totalPages}
          currentPage={page}
          callbackFunc={handlerSetOffset}
        />
      </>
    </ul>
  );
};

export default SearchResult;
