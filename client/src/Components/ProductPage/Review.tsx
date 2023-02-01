import { FC, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { Descendant } from 'Types/slate';

import Rating from './Rating';
import CommentEditor from '../Editor/Comment';
import { useSession } from 'CustomHook/useSession';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';

import ReviewList from './ReviewList';

import styles from './Styles/Review.module.css';
import { tokenDecode } from 'Utils/commonFunction';
import { TYPE_Token } from 'Types/common/token';
import ImageForm from 'Components/Common/ImageForm';
interface Props {
  productId: string;
  session: string | null;
}

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
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const childRef = useRef<{ reset: () => void }>(null);
  const { mutateAsync } = useCustomMutation(
    '/reviews',
    queryKey,
    'POST',
    session,
    true,
  );

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

  const handlerSubmit = async () => {
    let score = starClicked.filter(Boolean).length;
    const { sub } = tokenDecode(session) as TYPE_Token;
    const submitValue = {
      reviewId: Date.now(),
      productId: parseInt(productId),
      reviewTitle: reviewTitle,
      reviewContent: JSON.stringify(value),
      rating: score,
      reviewImage: userImage,
      memberId: parseInt(sub),
      reviewCreatedAt: Date.now(),
    };
    const res = await mutateAsync(submitValue);
    const cache = queryClient.getQueryData(queryKey) as any;
    if (res && cache) {
      const cacheAdd = {
        result: [res],
        nextPage: true,
        lastPage: false,
      };
      queryClient.setQueryData(queryKey, {
        pages: [cacheAdd, ...cache.pages],
        pageParams: { ...cache.pageParams },
      });
    }
    setStarClicked([false, false, false, false, false]);
    setReviewTitle('');
    setUserImage('');
    childRef.current?.reset();
  };
  return (
    <>
      <div className={styles.Main_Review_Container}>
        <ImageForm userImage={userImage} setUserImage={setUserImage} />
        <div className={styles.Review_Container}>
          <div className={styles.Content}>
            <Rating handleStarClick={handleStarClick} clicked={starClicked} />
          </div>
          <div className={styles.Content}>
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
