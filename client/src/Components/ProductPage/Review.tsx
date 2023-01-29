import { FC, useCallback, useEffect, useRef, useState } from 'react';

import styles from './Styles/Review.module.css';
import className from 'classnames/bind';

import { Node } from 'slate';
import { Descendant } from 'Types/slate';

import Tooltip from 'Components/Common/Tooltip';
import Loading from 'Components/Loading/Loading';

import CommentEditor from '../Editor/Comment';
import ReadOnlyComment from '../Editor/ReadOnlyComment';
import { EditComment, SimpleReadOnlyComment } from '../Editor/EditComment';

import { customTime } from 'Utils/commonFunction';
const cx = className.bind(styles);

const INITIALVALUE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const CommentItem = ({
  item,
  session,
  userInfo,
  commentCount,
}: {
  item: any;
  session?: any;
  userInfo?: { nickname: string; userId: number };
  commentCount: number;
}) => {
  const [replyValue, setReplyValue] = useState<Descendant[]>(INITIALVALUE);
  const [width, setWidth] = useState<number>(700);
  const [data, setData] = useState<Descendant[]>(JSON.parse(item.body));
  const [editmode, setEditmode] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.current) {
      const nodeRect = node.current.getBoundingClientRect();
      setWidth(nodeRect.width);
    }
  }, [node]);

  function handlerOpenEditReply(id: string, name: string) {
    if (id !== session?.user.id) {
      const newValue: Descendant[] = [
        {
          type: 'paragraph',
          children: [
            {
              type: 'mention',
              character: name,
              children: [{ text: '' }],
            },
            { text: '' },
          ],
        },
      ];
      setReplyValue(newValue);
    }
  }

  return (
    <div className={styles.comment_list_wrapper}>
      <div className={styles.comment_input_rest}>
        <div className={styles.comment_top}>
          <div className={styles.comment_top_added}>
            <Tooltip
              content={new Date(item.createdAt).toLocaleDateString('ja')}
              arrow
            >
              <span>{customTime(item.createdAt)}</span>
            </Tooltip>
          </div>
        </div>
        {editmode && session && userInfo ? (
          <EditComment
            value={JSON.parse(item.body)}
            commentId={item.id}
            setCancel={() => setEditmode(false)}
            setData={(value: Descendant[]) => setData(value)}
          />
        ) : (
          <div className={styles.comment} ref={node}>
            {JSON.parse(item.body).length > 4 ||
            Math.floor(width / 14) * 4 < item.length ? (
              <SimpleReadOnlyComment data={data} />
            ) : (
              <ReadOnlyComment data={data} />
            )}
          </div>
        )}
        <div className={styles.comment_toolbar}>
          {/* <CommentToolbar
            commentId={item.id}
            commentUserId={item.user.id}
            commentUsername={item.user.name}
            userId={session?.user.id}
            likeCount={item.likeCount}
            isLike={item.isLike}
            setEditmode={() => setEditmode(true)}
            openReply={(id: string, name: string) =>
              handlerOpenEditReply(id, name)
            }
            commentCount={commentCount}
          /> */}
        </div>
      </div>
    </div>
  );
};

const ReviewList = () => {
  // const { loading, error, data, fetchMore, refetch } = useQuery<
  //   CommentsData,
  //   CommentsVars
  // >(COMMENT_QUERY, {
  //   variables: {
  //     userId: session?.user.id,
  //     postId: postId,
  //     limit: 20,
  //     sort: "top",
  //   },
  // });
  // const getfetchMore = useCallback(() => {
  //   if (data && data.getComments.pageInfo.hasNextPage) {
  //     fetchMore({
  //       variables: {
  //         limit: 20,
  //         cursor:
  //           data.getComments.comments[data.getComments.comments.length - 1].id,
  //       },
  //     });
  //   }
  // }, [data, fetchMore]);
  // const [ref, setRef] = useInfiniteScroll(getfetchMore);
  // if (loading)
  //   return (
  //     <div
  //       style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
  //     >
  //       <Loading width={30} />
  //     </div>
  //   );
  // if (error || !data)
  //   return (
  //     <button
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         marginTop: 15,
  //         color: "var(--black-10)",
  //       }}
  //       onClick={() => refetch()}
  //     >
  //       もう一度やり直す
  //     </button>
  //   );
  return (
    <>
      {/* {data &&
        data.getComments.comments.map((item) => (
          <CommentItem
            adminList={adminList}
            key={item.id}
            item={item}
            session={session}
            userInfo={userInfo}
            commentCount={commentCount}
          />
        ))} */}
      {/* {data.getComments.pageInfo.hasNextPage && (
        <div
          ref={setRef}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            padding: "20px 0px",
          }}
        >
          <Loading width={30} />
        </div>
      )} */}
    </>
  );
};

const ReviewEdit: FC = () => {
  const INITIALVALUE: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(INITIALVALUE);
  const childRef = useRef<{ reset: () => void }>(null);
  const text = (value: any) => {
    return value
      .map((n: any) => Node.string(n))
      .join('')
      .replace(
        /[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\u3164\uFEFF]/g,
        '',
      );
  };

  const handlerSubmit = () => {};
  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_input_rest}>
        <div className={styles.comment_input}>
          <CommentEditor
            value={value}
            setValue={(value: any) => setValue(value)}
            ref={childRef}
          />
        </div>
        <button
          className={cx('comment_input_button', {
            comment_input_button_sucess: !!text(value),
          })}
          onClick={handlerSubmit}
        >
          등록
          {/* {loading ? <Loading width={18} /> : <span>등록</span>} */}
        </button>
      </div>
    </div>
  );
};

const Review: FC = () => {
  return <ReviewEdit />;
};

export default Review;
