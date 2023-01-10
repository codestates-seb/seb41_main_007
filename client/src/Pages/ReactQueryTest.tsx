import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { FC, useState } from 'react';

const ReactQueryTest: FC = () => {
  const [text, setText] = useState<string>('');
  const { data, isLoading, error } = useCustomQuery('/products', 'products');

  const { mutate } = useCustomMutation('/products', 'products', 'POST');

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
          mutate({ id: data.length, text });
        }}
      >
        클릭시 변경
      </button>
    </div>
  );
};

export default ReactQueryTest;
