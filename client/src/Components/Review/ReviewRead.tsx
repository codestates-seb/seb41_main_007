import styled from 'styled-components';
import { useFetch } from 'CustomHook/useFetch';
import useInput from 'CustomHook/useInput';
import { useParams } from 'react-router-dom';
const Container = styled.div``;
const Title = styled.div``;
const List = styled.div``;

const dummyData = [
  {review_id: 3,
    member_id: 2,
    review_title:'마음에 들어요',
    review_content:'뭐 이것만 수정이 되면 좋겠어요',
    rating: 5,
    created_at:'2022-10-5',
    review_image:
  }
]

export const Componet = ({data} : Props) =>{
  const [data,setData] = redux(data);
 
   return (
       <>
         <div className="review__title" key={review_id}>{review_title}</div>
     <List>
         <div className="review__image">{review_image}</div>
         <div className="review__content">
           <div className="review__content-text">
             {review_content}
           </div>
           <div className="review__content-product">{product_id}</div>
           <div className="review__content-user">
             <div className="review__content-username">{member_id}</div>
             <div className="review__content-star">{rating}</div>
           </div>
           <div className="review__content-date">{created_at}</div>
         </div>
     </List>
     </>
   )
 }
const ReviewRead = () => {
  const { id } = useParams();
  const [data,isPending,error ]= useFetch('api/revies/${id}/reviews'); // 이걸 리덕스로 담아서 컨트롤을 해라 리뷰 추가했을 때 사용자 입장에선 추가가됨. 
  //const getreview = data[0]; //배열안으로 접근
  const [reviewContent, setReview, resetReview] = useInput('');
  
  return (
    <>
    {!isPending?
 <Container>
   <Component data={data}/>
</Container>
     :<></>}
    </>
  )
};
export default ReviewRead;

interface Props {
  data:{
    review_id: number
    member_id: number
    review_title:string
    review_content:string
    rating: number
    created_at:any
    review_image:any
    product_id: number
  }
}

