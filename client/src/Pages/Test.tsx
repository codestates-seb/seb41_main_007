import { FC, useState } from 'react';

const Test: FC = () => {
  const [title, setTitle] = useState('');
  const [num, setNumber] = useState();
  const [category, setCategory] = useState();
  const handler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      method: 'POST',
      body: JSON.stringify({ name: title }),
    }).then((res) => {
      setTitle('');
    });
  };
  const postDelHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${num}`, {
      method: 'DELETE',
    }).then((res) => {
      console.log(res);
    });
  };
  const categoryDelHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/${num}`, {
      method: 'DELETE',
    }).then((res) => {
      console.log(res);
    });
  };

  const basket = () => {
    localStorage.removeItem('baskets');
    localStorage.removeItem('basketsCounter');
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handler}>카테고리 생성</button>
      <input
        type="number"
        value={category}
        onChange={(e) => setCategory(e.target.value as any)}
      />
      <button onClick={categoryDelHandler}>카테고리 삭제</button>
      <input
        type="number"
        value={num}
        onChange={(e) => setNumber(e.target.value as any)}
      />
      <button onClick={postDelHandler}>포스트 삭제</button>

      <input
        type="number"
        value={num}
        onChange={(e) => setNumber(e.target.value as any)}
      />
      <button onClick={basket}>로컬스토리지 비우기~</button>
    </div>
  );
};

export default Test;
