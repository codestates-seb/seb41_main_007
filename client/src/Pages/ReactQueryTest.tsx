import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { FC, useState } from 'react';

const ReactQueryTest: FC = () => {
  const [text, setText] = useState<string>('');
  const { data, isLoading, error } = useCustomQuery('/products', 'products');

  const { mutate } = useCustomMutation('/categories', 'categories', 'POST');

  if (isLoading) return <></>;
  if (error) return <div> error</div>;
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
            name: '부직포 및 제초매트',
          });
        }}
      >
        클릭시 변경
      </button>
    </div>
  );
};

export default ReactQueryTest;
