import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Styles/Main.module.css';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import SearchResult from 'Components/Search/SearchResult';
import CustomTitle from 'Components/Header/CustomTitle';
import LoadingList from 'Components/Loading/LoadingList';

const Search: FC = () => {
  const location = useLocation();
  const sch = location.search;
  const { data, isLoading, error } = useCustomQuery(
    `/products${sch}`,
    'productsSearch',
  );
  const params = new URLSearchParams(sch);
  const keyword = params.get('keyword');
  if (isLoading) return <LoadingList />;
  if (error)
    return <div className={styles.LoadingContainer}>에러 발생하였습니다.</div>;
  return (
    <main className={styles.Main_Container}>
      {keyword && (
        <>
          <CustomTitle title={`${keyword} 에 대한 검색결과`} />
          <div className={styles.Search_Result_Text_Container}>
            <p className={styles.Search_Result_Text}>
              &quot;{keyword}&quot; 에 대한 검색결과 ({data.data.length})
            </p>
          </div>
        </>
      )}
      {!keyword ? (
        <div className={styles.NoKeyword}>
          검색어를 입력하지 않은 경우 추천 상품을 보여드립니다.
        </div>
      ) : (
        <div>{data.data.length > 0 && <SearchResult data={data.data} />}</div>
      )}
    </main>
  );
};

export default Search;
