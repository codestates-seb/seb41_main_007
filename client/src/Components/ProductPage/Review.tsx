import { FC, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { Descendant } from 'Types/slate';

import Rating from './Rating';
import CommentEditor from '../Editor/Comment';
import { useSession } from 'CustomHook/useSession';
import {
  useCustomFormMutation,
  useCustomMutation,
} from 'CustomHook/useCustomMutaiton';

import ReviewList from './ReviewList';

import styles from './Styles/Review.module.css';
interface Props {
  productId: string;
  session: string | null;
}

const INITIALVALUE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const ReviewEdit: FC<Props> = ({ productId, session }) => {
  const queryClient = useQueryClient();
  const queryKey = ['reviews', productId];
  const [userImage, setUserImage] = useState<any>();
  const [starClicked, setStarClicked] = useState<any>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const [value, setValue] = useState<Descendant[]>(INITIALVALUE);
  const childRef = useRef<{ reset: () => void }>(null);
  const { mutate } = useCustomMutation(
    '/reviews',
    queryKey,
    'POST',
    session,
    true,
  );
  const { mutateAsync } = useCustomFormMutation('/file/upload', 'POST');

  if (!session)
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          리뷰를 작성하실려면 로그인이 필요합니다.
        </div>
        <div className={styles.line}></div>
      </>
    );

  const handleStarClick = (index: number) => {
    let clickStates = [...starClicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setStarClicked(clickStates);
  };

  const handleChangeFile = (e: any) => {
    if (e.target.files[0]) {
      mutateAsync(e.target.files[0])
        .then(({ imageUrls }) => {
          setUserImage(imageUrls);
        })
        .catch((e) => {
          console.info(e);
          setUserImage('');
        });
    }
  };

  const handlerSubmit = () => {
    let score = starClicked.filter(Boolean).length;
    const submitValue = {
      reviewId: Date.now(),
      productId: parseInt(productId),
      reviewTitle: reviewTitle,
      reviewContent: JSON.stringify(value),
      rating: score,
      reviewImage: userImage,
    };
    const cache = queryClient.getQueryData(queryKey) as any;
    if (cache) {
      console.log(cache);
      //중복제거
      const newArr = Array.from(new Set(cache.pages.map(JSON.stringify))).map(
        JSON.parse as any,
      );
      const cacheAdd = {
        result: [submitValue],
        nextPage: true,
        lastPage: false,
      };
      queryClient.setQueryData(queryKey, {
        pages: [cacheAdd, ...newArr],
        pageParams: { ...cache.pageParams },
      });
    }
    mutate(submitValue);
    setValue(INITIALVALUE);
    setStarClicked([false, false, false, false, false]);
    setReviewTitle('');
    setUserImage(null);
  };

  return (
    <>
      <div className={styles.comment_container}>
        <div className={styles.Image_Container}>
          <div className={styles.content}>
            {userImage ? (
              <img
                width={200}
                height={200}
                src={userImage}
                alt="reviewImage"
                className={styles.Input_User_Image}
              />
            ) : (
              <div className={styles.Empty_Image}> </div>
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
            <Rating handleStarClick={handleStarClick} clicked={starClicked} />
          </div>
          <div className={styles.content}>
            <input
              type="text"
              placeholder="리뷰제목을 입력해주세요"
              value={reviewTitle}
              className={styles.Input_Contents}
              style={{ width: '100%' }}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </div>
          <div className={styles.Comment_Input}>
            <CommentEditor
              value={value}
              setValue={(value: any) => setValue(value)}
              ref={childRef}
            />
          </div>
          <button
            className={styles.Comment_Input_Button}
            onClick={handlerSubmit}
          >
            등록
          </button>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
};

const Review: FC = () => {
  const { productid } = useParams();
  const { loading, session } = useSession();
  if (loading) return <></>;
  if (!productid) return <></>;

  return (
    <div>
      <ReviewEdit productId={productid} session={session} />
      <ReviewList productId={productid} session={session} />
    </div>
  );
};

export default Review;
