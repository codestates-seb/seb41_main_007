import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useCustomQuery } from 'CustomHook/useCustomQuery';

import CustomTitle from 'Components/Header/CustomTitle';
import SearchResult from 'Components/Search/SearchResult';

import styles from './Styles/Main.module.css';
import Empty from 'Components/Common/Empty';
import NotFoundPage from './NotFoundPage';

const Search: FC = () => {
  const location = useLocation();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const keyword = params.get('keyword');
  const { data, isLoading, error } = useCustomQuery(
    `/products${sch}`,
    `product${sch}`,
  );
  if (isLoading)
    return (
      <>
        <CustomTitle title={`${keyword} 에 대한 검색결과 - FARMPI`} />
        <Empty />
      </>
    );
  if (error)
    return (
      <>
        <CustomTitle title={`${keyword} 에 대한 검색결과 - FARMPI`} />
        <NotFoundPage />
      </>
    );

  return (
    <main className={styles.Main_Container}>
      {!keyword ? (
        <div className={styles.Search_Result_Text_Container}>
          <div className={styles.NoKeyword}>
            검색어를 입력하지 않은 경우 추천 상품을 보여드립니다.
          </div>
        </div>
      ) : (
        <>
          <CustomTitle title={`${keyword} 에 대한 검색결과 - FARMPI`} />
          <div className={styles.Search_Result_Text_Container}>
            <p className={styles.Search_Result_Text}>
              &quot;{keyword}&quot; 에 대한 검색결과 ({data.data.length})
            </p>
          </div>
          {data.data.length > 0 && (
            <SearchResult
              sch={sch}
              searchList={data.data}
              searchPageInfo={data.pageInfo}
            />
          )}
        </>
      )}
    </main>
  );
};

export default Search;
