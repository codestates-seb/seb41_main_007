import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { TYPE_ReviewAll } from 'Types/common/product';
import styled from 'styled-components';
import styles from './Styles/Review.module.css';
import { useRef } from 'react';
import { SimpleReadOnlyComment } from 'Components/Editor/EditComment';
import ReadOnlyComment from '../Editor/ReadOnlyComment';
import { RatingView } from '../ProductPage/Rating';
import { customTime } from 'Utils/commonFunction';

interface Props {
  review: TYPE_ReviewAll;
}

const CommentItem = ({ reviewContent }: { reviewContent: string }) => {
  const review = JSON.parse(reviewContent);

  const node = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.Comment_List_Wrapper}>
      <div className={styles.Comment} ref={node}>
        {review.length > 4 ? (
          <SimpleReadOnlyComment data={review} />
        ) : (
          <ReadOnlyComment data={review} />
        )}
      </div>
    </div>
  );
};

const ReviewItem: React.FC<Props> = ({ review }) => {
  return (
    <a
      href={`/product/${review.productId}`}
      className={styles.Review_Detail_Content}
    >
      <div className={styles.Review_Image_Container}>
        <img
          src={
            review.reviewImage
              ? review.reviewImage
              : 'https://cdn-icons-png.flaticon.com/128/7078/7078329.png'
          }
          alt={'reviewImage'}
          className={styles.Review_Image_Content}
        />
      </div>
      <div>
        <h3 className={styles.Review_Product_Container}>
          {review.reviewTitle}
        </h3>
        <div>
          <Product>
            <div className={styles.Review_Product_Title}>
              <CommentItem reviewContent={review.reviewContent} />
            </div>
          </Product>
          <User>
            <p className={styles.Review_User}>{review.memberName}</p>
            <div className={styles.Review_Rating}>
              <RatingView num={review.rating} />
            </div>
            <p className={styles.Review_Date}>{customTime(review.createdAt)}</p>
          </User>
        </div>
      </div>
    </a>
  );
};

const Review: React.FC = () => {
  const { isLoading, data, error } = useCustomQuery('/reviews/all', [
    'reviewsAll',
  ]);
  if (isLoading || error) return <></>;

  return (
    <div className={styles.Review_Container}>
      <div className={styles.Review_Content}>
        <h2 className={styles.Review_Title}>고객만족후기</h2>
        <div className={styles.Review_Data}>
          {data.map((el: TYPE_ReviewAll) => {
            return <ReviewItem key={el.reviewId} review={el} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Review;

const User = styled.div`
  display: flex;
  margin-top: 20px;
  p {
    display: block;
  }
`;

const Product = styled.div`
  margin-top: 8px;
`;
