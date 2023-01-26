import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from 'Components/Common/ProductList';
import Navigation from 'Components/Pagination/Navigation';
import { TYPE_Product, TYPE_PageInfo } from 'Types/common/product';
import { BGcontainer } from 'Components/Common/BGcontainer';
import CategoryList from 'Components/Common/CategoryList';
import styles from './Styles/Search.module.css';
interface Props {
  searchList: TYPE_Product[];
  searchPageInfo: TYPE_PageInfo;
  sch: string;
}

const SearchResult: FC<Props> = ({ sch, searchList, searchPageInfo }) => {
  const navigate = useNavigate();
  const params = new URLSearchParams(sch);
  const keyword = params.get('keyword');
  const { totalPages, page } = searchPageInfo;
  const handlerSetOffset = (page: number) => {
    window.scrollTo(0, 0);
    return navigate(
      `/products?size=20&keyword=${keyword}&sort=likeCount&order=ascending&page=${page}`,
    );
  };

  return (
    <>
      <CategoryList />
      <div className={styles.Search_Result_Text_Container}>
        <p className={styles.Search_Result_Text}>
          &quot;{keyword}&quot; 에 대한 검색결과
        </p>
      </div>
      {searchList.length !== 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ProductList products={searchList} />
          <Navigation
            totalPage={totalPages}
            currentPage={page}
            callbackFunc={handlerSetOffset}
          />
        </div>
      ) : (
        <div className={styles.Search_Result_Text_Container}>
          <div className={styles.Search_Text_Container}>
            검색된 상품이 없습니다.
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
