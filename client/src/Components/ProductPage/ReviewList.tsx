import Loading from 'Components/Loading/Loading';
import { TYPE_COMMENT } from 'Types/common/product';
import { FC, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import styles from './Styles/Review.module.css';
import { Descendant } from 'Types/slate';
import {
  EditComment,
  SimpleReadOnlyComment,
} from 'Components/Editor/EditComment';
import ReadOnlyComment from '../Editor/ReadOnlyComment';

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
    <div className={styles.comment_list_wrapper}>
      <div className={styles.comment_input_rest}>
        {/* <div className={styles.comment_top}>
          <div className={styles.comment_top_added}>
            <Tooltip
              content={new Date(item.reviewCreatedAt).toLocaleDateString('ko')}
              arrow
            >
              <span>{customTime(new Date(item.reviewCreatedAt))}</span>
            </Tooltip>
          </div>
        </div> */}
        {editmode ? (
          <EditComment
            value={JSON.parse(item.reviewContent)}
            commentId={item.reviewId}
            setCancel={() => setEditmode(false)}
            setData={(value: Descendant[]) => setData(value)}
          />
        ) : (
          <div className={styles.comment} ref={node}>
            {JSON.parse(item.reviewContent).length > 4 ? (
              <SimpleReadOnlyComment data={data} />
            ) : (
              <ReadOnlyComment data={data} />
            )}
          </div>
        )}
      </div>
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
        <Loading width={30} />
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
    <>
      {data.pages.length > 0 &&
        data.pages.map((page: any) => {
          if (page.isLast) {
            return <div key={0}>리뷰를 다 불러왔습니다</div>;
          }
          return page.result.map((el: TYPE_COMMENT) => {
            return (
              <CommentItem key={el.reviewId} item={el} session={session} />
            );
          });
        })}
      {isFetching && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Loading width={10} />
        </div>
      )}
      {hasNextPage && <button onClick={() => fetchNextPage()}>패치하기</button>}
    </>
  );
};

export default ReviewList;
