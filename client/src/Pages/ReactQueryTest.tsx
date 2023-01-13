import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { FC, useState } from 'react';

const ReactQueryTest: FC = () => {
  const [text, setText] = useState<string>('');
  const { data, isLoading, error } = useCustomQuery(
    '/reviews?productId=1&page=1&size=10',
    'reviews',
  );

  const { mutate } = useCustomMutation(
    '/reviews?productId=1&page=1&size=10',
    'reviews',
    'POST',
  );

  if (isLoading) return <></>;
  if (error) return <div> error</div>;
  console.log(data);
  return (
    <div>
      {data &&
        data.data.map((el: { productId: number; name: string }) => {
          return <div key={el.productId}> {el.name}</div>;
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
            reviewTitle: '이 장비 좋네요',
            reviewContent: '정말 좋고 배송 빠르네요',
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
