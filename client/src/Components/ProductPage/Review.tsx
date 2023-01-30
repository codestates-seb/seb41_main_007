import { FC, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

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

const ReviewEdit: FC<Props> = ({ productId, session }) => {
  const { mutate } = useCustomMutation('/', '', 'POST');
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
    let score = clicked.filter(Boolean).length;

    const submitValue = {
      productId: parseInt(productId),
      reviewTitle: reviewTitle,
      reviewContent: JSON.stringify(value),
      rating: score,
      reviewImage: userImage,
    };
    mutate(submitValue);
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
              <div> </div>
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
