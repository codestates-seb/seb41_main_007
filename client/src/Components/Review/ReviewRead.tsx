import { useState } from 'react';
import { TYPE_ReviewAll } from 'Types/common/product';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

const INITIALVALUE = {
  reviewId: 0,
  reviewTitle: '',
  rating: 0,
  memberName: '',
  reviewImage: '',
  productName: '',
  createdAt: '',
  modifiedAt: '',
};

const ReviewRead: React.FC = () => {
  const { isLoading, data, error } = useCustomQuery('/reviews/all', [
    'reviewsAll',
  ]);
  if (isLoading || error) return <></>;
  console.info(data);
  // const [review, setReview] = useState<TYPE_ReviewAll>(INITIALVALUE);
  // const onClickHandler = () => {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews/all`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'GET',
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       setReview(response);
  //     });
  // };

  return (
    <>
      {/* <button onClick={onClickHandler}>이거 눌러봐</button> */}
      {/* <div>{review}</div> */}
      <div>{data}</div>
    </>
  );
};

export default ReviewRead;
