import styled from 'styled-components';
// import { useCustomQuery } from 'CustomHook/useCustomQuery';
// import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
// import { FC, useState } from 'react';
// import { useFetch } from 'CustomHook/useFetch';
//import useInput from 'CustomHook/useInput';
// import { useParams } from 'react-router-dom';
import { useAppSelector } from 'Redux/app/hook';
import {
  // saveData,
  selectSave,
  // ObjectSaveState,
} from 'Redux/reducer/objectSaveSlice';

const Container = styled.div``;
const List = styled.div``;

export const ReviewRead: React.FC = () => {
  // const [reviewContent, setReview] = useInput('');
  // const { data, isLoading, error } = useCustomQuery('/review', '');
  const save = useAppSelector(selectSave);
  const review = save[0];
  //const dispatch = useAppDispatch();

  // if (isLoading) return <></>;
  // if (error) return <div>error</div>;
  return (
    <>
      <Container>
        {/* {review &&
          review.data.map((el: ObjectSaveState) => {
            return ( */}
        <>
          <div className="review__title" key={review.review_id}>
            {review.review_title}
          </div>
          <List>
            {/* <div className="review__image">{review.review_image}</div> */}
            <div className="review__content">
              <div className="review__content-text">
                {review.review_content}
              </div>
              <div className="review__content-product">{review.product_id}</div>
              <div className="review__content-user">
                <div className="review__content-username">
                  {review.member_id}
                </div>
                <div className="review__content-star">{review.rating}</div>
              </div>
              <div className="review__content-date">{review.created_at}</div>
            </div>
          </List>
        </>
      </Container>
    </>
  );
};

// const Componet: React.FC = ({ data }: Props) => {
//   const [data, setData] = redux(data);

//   return (
//     <>
//       <div className="review__title" key={review_id}>
//         {review_title}
//       </div>
//       <List>
//         <div className="review__image">{review_image}</div>
//         <div className="review__content">
//           <div className="review__content-text">{review_content}</div>
//           <div className="review__content-product">{product_id}</div>
//           <div className="review__content-user">
//             <div className="review__content-username">{member_id}</div>
//             <div className="review__content-star">{rating}</div>
//           </div>
//           <div className="review__content-date">{created_at}</div>
//         </div>
//       </List>
//     </>
//   );
// };
// export default Component;
