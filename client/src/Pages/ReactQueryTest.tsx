import Empty from 'Components/Common/Empty';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { FC, useState } from 'react';
import NotFoundPage from './NotFoundPage';

interface Review {
  productId: number;
  reviewId: number;
  memberId: number;
  reviewTitle: string;
  reviewContent: string;
  rating: number;
}

const ReactQueryTest: FC = () => {
  const [text, setText] = useState<string>('');
  const productId = 1;
  //해당하는 id 를 ${productId} 넣어서 사용하기
  const page = 1;
  const size = 10;
  const { data, isLoading, error } = useCustomQuery(
    `/reviews?productId=${productId}&page=${page}&size=${size}`,
    `reviews?productId=${productId}&page=${page}&size=${size}`,
  );

  const { mutate } = useCustomMutation('/reviews', 'reviews', 'POST');
  // 아직 api post reviews 미완성
  if (isLoading) return <Empty />;
  if (error) return <NotFoundPage />;
  console.log(data);
  return (
    <div>
      {data &&
        data.data.map((el: Review) => {
          return (
            <div key={el.reviewId}>
              <div>{el.reviewTitle}</div>
              <div>{el.reviewContent}</div>
            </div>
          );
        })}
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="입력해주세요"
      />
      <button
        onClick={() => {
          mutate({
            productId: 1,
            reviewTitle: '이 상품 뭔가요',
            reviewContent: '이 상품 너무 좋아요',
            rating: 4,
          });
        }}
      >
        클릭시 변경
      </button>
    </div>
  );
};

export default ReactQueryTest;
