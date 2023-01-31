import { FC, useState } from 'react';

const Test: FC = () => {
  const [title, setTitle] = useState('');
  const handler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      method: 'POST',
      body: JSON.stringify({ name: title }),
    }).then((res) => {
      setTitle('');
    });
  };
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handler}>카테고리 생성</button>
    </div>
  );
};

export default Test;
