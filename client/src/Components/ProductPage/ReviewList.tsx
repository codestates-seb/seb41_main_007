import { FC, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { TYPE_COMMENT } from 'Types/common/product';
import { Descendant } from 'Types/slate';

import Loading from 'Components/Loading/Loading';
import {
  EditComment,
  SimpleReadOnlyComment,
} from 'Components/Editor/EditComment';
import ReadOnlyComment from '../Editor/ReadOnlyComment';

import { customTime } from 'Utils/commonFunction';
import styles from './Styles/ReviewList.module.css';
import Rating, { RatingView } from './Rating';

interface Props {
  productId: string;
  session: string | null;
}

interface CommentItem {
  session: string | null;
  item: TYPE_COMMENT;
}

const CommentItem: FC<CommentItem> = ({ item, session }) => {
  const [data, setData] = useState<Descendant[]>(
    JSON.parse(item.reviewContent),
  );
  const [editmode, setEditmode] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.Comment_List_Wrapper}>
      {editmode ? (
        <EditComment
          value={JSON.parse(item.reviewContent)}
          commentId={item.reviewId}
          setCancel={() => setEditmode(false)}
          setData={(value: Descendant[]) => setData(value)}
        />
      ) : (
        <div className={styles.Comment} ref={node}>
          {JSON.parse(item.reviewContent).length > 4 ? (
            <SimpleReadOnlyComment data={data} />
          ) : (
            <ReadOnlyComment data={data} />
          )}
        </div>
      )}
    </div>
  );
};

const ReviewList: FC<Props> = ({ productId, session }) => {
  const [pages, setPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const getReviewsWithPageInfo = async (props: any) => {
    const data = await fetch(
      `${
        process.env.REACT_APP_BACKEND_URL
      }/reviews?productId=${productId}&page=${pages}&size=${5}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res: Response) => {
        return res.json();
      })
      .catch((e) => {
        return e;
      });
    const { page, totalPages } = data.pageInfo;
    const hasNextPage = totalPages - page >= 0;
    if (!hasNextPage) setHasNextPage(false);
    return {
      result: data.data,
      nextPage: hasNextPage,
      isLast: !hasNextPage,
    };
  };

  const { isFetching, data, fetchNextPage, isLoading, error, refetch } =
    useInfiniteQuery(['reviews', productId], getReviewsWithPageInfo, {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
      onSuccess: () => {
        setPages(pages + 1);
      },
    });

  if (isLoading)
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
      >
        <Loading width={50} height={50} />
      </div>
    );

  if (error)
    return (
      <button
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 15,
          color: 'var(--black-10)',
        }}
        onClick={() => refetch()}
      >
        한번 더 시도하기
      </button>
    );

  if (!data) return <></>;

  return (
    <div className={styles.ReviewList_Container}>
      <span>리뷰리스트</span>
      <span className={styles.line} />
      {data.pages.length > 0 &&
        data.pages.map((page: any) => {
          if (page.isLast) {
            return <div key={Date.now()}>리뷰를 다 불러왔습니다</div>;
          }
          return page.result.map((el: TYPE_COMMENT) => {
            return (
              <div key={el.reviewId} className={styles.Review_Container}>
                <img
                  src={
                    el.reviewImage
                      ? el.reviewImage
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/First_Tractor_Company_-_old_working_model_-_01.jpg/220px-First_Tractor_Company_-_old_working_model_-_01.jpg'
                  }
                  alt={'reviewImage'}
                  className={styles.Review_Image_Content}
                />
                <div className={styles.Review_Contents_Container}>
                  <div className={styles}>
                    <h3 className={styles.Review_Product_Title}>
                      {el.reviewTitle}
                    </h3>
                    <div className={styles.Review_Product_Content}>
                      <CommentItem item={el} session={session} />
                    </div>
                  </div>
                  <div className={styles.Review_Second_Row_Container}>
                    <div className={styles.Review_User}>{el.memberId}</div>
                    <div className={styles.Review_Rating}>
                      평점: <RatingView num={el.rating} />
                    </div>
                    <div className={styles.Review_Date}>
                      {customTime(el.reviewCreatedAt)}
                    </div>
                  </div>
                </div>
              </div>
            );
          });
        })}
      {hasNextPage && (
        <div className={styles.FetchMore_Container}>
          <button
            className={styles.FetchMore_Button}
            onClick={() => fetchNextPage()}
          >
            {isFetching ? (
              <div className={styles.Loading_Container}>
                <Loading width={20} height={20} />
              </div>
            ) : (
              '리뷰 더보기'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
