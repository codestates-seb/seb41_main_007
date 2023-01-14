import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { useCustomQuery } from 'CustomHook/useCustomQuery';

import CustomTitle from 'Components/Header/CustomTitle';
import LazySearchResult from 'Components/Search/SearchResult';

import styles from './Styles/Main.module.css';
import Empty from 'Components/Common/Empty';

const Search: FC = () => {
  const location = useLocation();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const keyword = params.get('keyword');
  // length 만 사용하는 api 스켈레톤을 보여주기위해서 여기서는 data를 안쓰고 오브젝트 수만 씁니다
  const { data, isLoading, error } = useCustomQuery(
    `/products${sch}`,
    `product${sch}`,
  );
  if (isLoading) return <Empty />;
  if (error)
    return <div className={styles.LoadingContainer}>에러 발생하였습니다.</div>;

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
          {data.data.length > 0 && <LazySearchResult sch={sch} />}
        </>
      )}
    </main>
  );
};

export default Search;
