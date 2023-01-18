import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from 'Components/Search/ProductList';
import Navigation from 'Components/Pagination/Navigation';
import { TYPE_Product, TYPE_PageInfo } from 'Types/common/product';
interface Props {
  searchList: TYPE_Product[];
  searchPageInfo: TYPE_PageInfo;
  sch: string;
}

const SearchResult: FC<Props> = ({ sch, searchList, searchPageInfo }) => {
  const navigate = useNavigate();
  const { totalPages, page } = searchPageInfo;
  const handlerSetOffset = (page: number) => {
    const params = new URLSearchParams(sch);
    const keyword = params.get('keyword');
    window.scrollTo(0, 0);
    return navigate(
      `/products?keyword=${keyword}&sort=likeCount&order=ascending&page=${page}`,
    );
  };
  return (
    <ul>
      <ProductList products={searchList} />
      <Navigation
        totalPage={totalPages}
        currentPage={page}
        callbackFunc={handlerSetOffset}
      />
    </ul>
  );
};

export default SearchResult;
