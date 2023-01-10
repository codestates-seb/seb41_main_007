import { FC, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const ReactQueryTest: FC = () => {
  const [text, setText] = useState<string>('');
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery('products', async () => {
    return await fetch('http://localhost:4000/test', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res: any) => {
      return res.json();
    });
  });

  const { mutate } = useMutation(
    (suggest: any) => {
      console.log(suggest);
      return fetch('http://localhost:4000/test', {
        body: JSON.stringify(suggest),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('products'),
    },
  );

  if (isLoading) return <></>;
  return (
    <div>
      {data.map((el: any) => {
        return <div key={el.id}> {el.text}</div>;
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
