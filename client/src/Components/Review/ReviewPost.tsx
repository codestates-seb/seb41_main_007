// import { reviewCreate, reviewDelete, reviewPatch } from 'Utils/api';
// import { useParams } from 'react-router-dom';
// const submitForm = (e) => {
//   e.preventDefault();
//   reviewCreate(`/api/review/${id}/reviews`, id, {
//     text: reviewContent,
//   });
//   resetReview();
// };

// const deleteForm = (review_id) => {
//   // alert(`${commentId}`);
//   const isDelete = confirm('코멘트를 삭제할까요?');
//   if (isDelete) {
//     reviewDelete(`/api/reviews/${review_id}`, id);
//   }
// };

// const patchForm = (review_id) => {
//   alert(`${review_id}`);
//   reviewPatch(`/api/reviews/${review_id}`, id, {
//     review_id: review_id,
//     text: reviewContent,
//   });
//   resetReview();
// };

// const ReviewPost = () => {
//   const { id } = useParams();
//   return (
//     <>
//       <div></div>
//     </>
//   );
// };
// export default ReviewPost;
