import { FC, useState } from 'react';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';

import { useQueryClient } from 'react-query';
import { EditComment } from 'Components/Editor/EditComment';
import { Descendant } from 'Types/slate';
import styles from './Styles/ReviewReEdit.module.css';
import Rating from './Rating';
import { TYPE_Review } from 'Types/common/product';
import ImageForm from 'Components/Common/ImageForm';
import { toast } from 'react-toastify';

interface Props {
  item: TYPE_Review;
  session: string | null;
  setEditmode: (param: boolean) => void;
}

const ReviewReEdit: FC<Props> = ({ session, item, setEditmode }) => {
  const queryKey = ['reviews', `${item.productId}`];
  const queryClient = useQueryClient();
  const starArr = [];
  for (let i = 0; i < 5; i++) {
    if (i < item.rating) {
      starArr.push(true);
    } else {
      starArr.push(false);
    }
  }
  const [reviewContentData, setReviewContentData] = useState<Descendant[]>(
    JSON.parse(item.reviewContent),
  );
  const [userImage, setUserImage] = useState<any>(item.reviewImage);
  const [starClicked, setStarClicked] = useState<any>(starArr);
  const [reviewTitle, setReviewTitle] = useState<string>(item.reviewTitle);
  const { mutate } = useCustomMutation(
    `/reviews/${item.reviewId}`,
    ['ReviewsPatch', item.productId],
    'PATCH',
    session,
    true,
  );

  const handleStarClick = (index: number) => {
    let clickStates = [...starClicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setStarClicked(clickStates);
  };

  const handlerSubmit = () => {
    let score = starClicked.filter(Boolean).length;
    const submitValue = {
      reviewId: item.reviewId,
      productId: item.productId,
      memberId: item.member.memberId,
      reviewContent: JSON.stringify(reviewContentData),
      reviewTitle: reviewTitle,
      rating: score,
      reviewImage: userImage,
    };
    const cache = queryClient.getQueryData(queryKey) as any;
    if (cache) {
      for (let i = 0; i < cache.pages.length; i++) {
        for (let j = 0; j < cache.pages[i].result.length; j++) {
          if (cache.pages[i].result[j]['reviewId'] === item.reviewId) {
            cache.pages[i].result[j] = {
              productId: cache.pages[i].result[j]['productId'],
              reviewId: cache.pages[i].result[j]['reviewId'],
              member: cache.pages[i].result[j]['member'],
              reviewLastModifiedAt: `${new Date()}`,
              reviewCreatedAt: cache.pages[i].result[j]['reviewCreatedAt'],
              reviewContent: JSON.stringify(reviewContentData),
              reviewTitle: reviewTitle,
              rating: score,
              reviewImage: userImage,
            };
          }
        }
      }
      mutate(submitValue);
      setEditmode(false);
    } else {
      toast.error('리뷰 변경실패');
    }
  };

  return (
    <>
      <div className={styles.MainReview_Container}>
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
              maxLength={100}
              className={styles.Input_Contents}
              style={{ width: '100%' }}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </div>
          <div className={styles.Content}>
            <EditComment
              value={reviewContentData}
              setReviewContentData={setReviewContentData}
              setCancel={() => setEditmode(false)}
              handlerSubmit={handlerSubmit}
            />
          </div>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
};

export default ReviewReEdit;
