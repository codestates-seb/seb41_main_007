import { FC, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { customTime } from 'Utils/commonFunction';
import { TYPE_Review } from 'Types/common/product';

import Loading from 'Components/Loading/Loading';
import { SimpleReadOnlyComment } from 'Components/Editor/EditComment';
import ReadOnlyComment from '../Editor/ReadOnlyComment';
import { RatingView } from './Rating';

import styles from './Styles/ReviewList.module.css';
import ReviewToolBar from './ReviewToolBar';
import ReviewReEdit from './ReviewReEdit';

interface Props {
  productId: string;
  session: string | null;
}

interface CommentItem {
  item: TYPE_Review;
}

const CommentItem: FC<CommentItem> = ({ item }) => {
  const review = JSON.parse(item.reviewContent);

  const node = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.Comment_List_Wrapper}>
      <div className={styles.Comment} ref={node}>
        {JSON.parse(item.reviewContent).length > 4 ? (
          <SimpleReadOnlyComment data={review} />
        ) : (
          <ReadOnlyComment data={review} />
        )}
      </div>
    </div>
  );
};

const ReviewList: FC<Props> = ({ productId, session }) => {
  const queryKey = ['reviews', productId];
  const [pages, setPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [editmode, setEditmode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();
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
    useInfiniteQuery(queryKey, getReviewsWithPageInfo, {
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
      <span className={styles.Review_Product_Title}>리뷰리스트</span>
      <span className={styles.line} />
      {data.pages.length > 0 &&
        data.pages.map((page: any) => {
          if (page.isLast) {
            return <div key={Date.now()}></div>;
          }
          return page.result.map((el: TYPE_Review) => {
            return (
              <div key={el.reviewId} style={{ width: '100%' }}>
                {editmode && selectedId === el.reviewId ? (
                  <ReviewReEdit
                    key={el.reviewId}
                    item={el}
                    session={session}
                    setEditmode={setEditmode}
                  />
                ) : (
                  <div className={styles.Review_Container}>
                    <div>
                      <img
                        src={
                          el.reviewImage
                            ? el.reviewImage
                            : 'https://cdn-icons-png.flaticon.com/128/7078/7078329.png'
                        }
                        alt={'reviewImage'}
                        className={styles.Review_Image_Content}
                      />
                    </div>
                    <div className={styles.Review_Contents_Container}>
                      <div className={styles}>
                        <h3 className={styles.Review_Product_Title}>
                          {el.reviewTitle}
                        </h3>
                        <div className={styles.Review_Product_Content}>
                          <CommentItem item={el} />
                        </div>
                      </div>
                      <div className={styles.Review_Second_Row_Container}>
                        <div className={styles.Review_User}>
                          {el.member.name} 님
                        </div>
                        <div className={styles.Review_Rating}>
                          평점: <RatingView num={el.rating} />
                        </div>
                        <div className={styles.Review_Date}>
                          {customTime(el.reviewCreatedAt)}
                        </div>
                      </div>
                    </div>
                    <ReviewToolBar
                      setSelectedId={setSelectedId}
                      setEditmode={() => setEditmode(true)}
                      session={session}
                      reviewId={el.reviewId}
                      memberId={el.member.memberId}
                      productId={el.productId}
                    />
                  </div>
                )}
              </div>
            );
          });
        })}
      {hasNextPage && (
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
      )}
    </div>
  );
};

export default ReviewList;
