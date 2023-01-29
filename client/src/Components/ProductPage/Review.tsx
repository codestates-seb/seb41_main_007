import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

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
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { useSession } from 'CustomHook/useSession';
import { TYPE_COMMENT } from 'Types/common/product';
import Rating from './Rating';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
const cx = className.bind(styles);

interface Props {
  productId: string | undefined;
}

const CommentItem = ({ item }: { item: TYPE_COMMENT }) => {
  const INITIALVALUE: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
  const { loading, session } = useSession();
  const [replyValue, setReplyValue] = useState<Descendant[]>(INITIALVALUE);
  const [width, setWidth] = useState<number>(700);
  const [data, setData] = useState<Descendant[]>(
    JSON.parse(item.reviewContent),
  );
  const [editmode, setEditmode] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.current) {
      const nodeRect = node.current.getBoundingClientRect();
      setWidth(nodeRect.width);
    }
  }, [node]);

  function handlerOpenEditReply(id: string, name: string) {
    if (id !== '11') {
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
  if (loading) return <></>;
  return (
    <div className={styles.comment_list_wrapper}>
      <div className={styles.comment_input_rest}>
        <div className={styles.comment_top}>
          <div className={styles.comment_top_added}>
            <Tooltip
              content={new Date(item.reviewCreatedAt).toLocaleDateString('ja')}
              arrow
            >
              <span>{customTime(new Date(item.reviewCreatedAt))}</span>
            </Tooltip>
          </div>
        </div>
        {editmode && session ? (
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
        <div className={styles.comment_toolbar}>
          {/* <CommentToolbar
            commentId={item.id}
            commentUserId={item.user.id}
            commentUsername={item.user.name}
            userId={session?.user.id}
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

const ReviewList: FC<Props> = ({ productId }) => {
  const { isLoading, data, refetch, error } = useCustomQuery(
    `/reviews?productId=${productId}&page=1&size=10`,
    ['reviews', productId],
  );
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
  return (
    <>
      {data.data.length > 0 &&
        data.data.map((item: TYPE_COMMENT) => (
          <CommentItem key={item.reviewId} item={item} />
        ))}
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

const ReviewEdit: FC<Props> = ({ productId }) => {
  const { loading, session } = useSession();
  if (loading) return <></>;
  if (!productId) return <></>;

  const { mutate } = useCustomMutation(
    '/reviews',
    ['reviews', productId],
    'POST',
    session as string,
  );
  const INITIALVALUE: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
  const [userImage, setUserImage] = useState<any>();
  const [clicked, setClicked] = useState<any>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const [value, setValue] = useState<Descendant[]>(INITIALVALUE);
  const childRef = useRef<{ reset: () => void }>(null);

  const handleStarClick = (index: number) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const handleChangeFile = (e: any) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      setUserImage(resultImage);
    };
  };

  const handlerSubmit = () => {
    let score = clicked.filter(Boolean).length;
    const submitValue = {
      productId: parseInt(productId),
      reviewTitle: reviewTitle,
      reviewContent: JSON.stringify(value),
      rating: score,
    };
    mutate(submitValue);
  };

  return (
    <>
      <div className={styles.comment_container}>
        <div className={styles.Image_Container}>
          <div className={styles.content}>
            {userImage && (
              <img
                width={200}
                height={200}
                src={userImage}
                alt="reviewImage"
                style={{ objectFit: 'cover' }}
              />
            )}
            <label className={styles.Label_Button} htmlFor="imageFile">
              이미지 선택
            </label>
            <input
              id="imageFile"
              type="file"
              accept="image/svg, image/jpeg, image/png"
              onChange={handleChangeFile}
              className={styles.ReviewImage}
            />
          </div>
        </div>
        <div className={styles.Review_Container}>
          <div className={styles.content}>
            <Rating handleStarClick={handleStarClick} clicked={clicked} />
          </div>
          <div className={styles.content}>
            <input
              type="text"
              placeholder="리뷰제목을 입력해주세요"
              value={reviewTitle}
              className={styles.inputContents}
              style={{ width: '100%' }}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </div>
          <div className={styles.comment_input}>
            <CommentEditor
              value={value}
              setValue={(value: any) => setValue(value)}
              ref={childRef}
            />
          </div>
          <button
            className={styles.comment_input_button}
            onClick={handlerSubmit}
          >
            등록
            {/* {loading ? <Loading width={18} /> : <span>등록</span>} */}
          </button>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
};

const Review: FC = () => {
  const { productid } = useParams();
  return (
    <div>
      <ReviewEdit productId={productid} />
      <ReviewList productId={productid} />
    </div>
  );
};

export default Review;
