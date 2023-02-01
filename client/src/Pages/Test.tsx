import { FC, useState } from 'react';
import styles from './Styles/Test.module.css';
import { BGcontainer } from 'Components/Common/BGcontainer';
import { Link } from 'react-router-dom';

const Test: FC = () => {
  const [title, setTitle] = useState('');
  const [num, setNumber] = useState(0);
  const [category, setCategory] = useState(0);
  const titleHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      method: 'POST',
      body: JSON.stringify({ name: title }),
    })
      .then((res) => {
        console.info(res);
        setTitle('');
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const postDelHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${num}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.info(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const categoryDelHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/${num}`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.info(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const cacheDelHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/caches/initialization`, {
      method: 'DELETE',
    })
      .then((res) => {
        console.info(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const basket = () => {
    localStorage.removeItem('baskets');
    localStorage.removeItem('basketsCounter');
  };

  return (
    <>
      <Link to="/">
        <h1>홈으로 돌아가기</h1>
      </Link>
      <BGcontainer>
        <div className={styles.Container}>
          <span>카테고리 이름</span>
          <input
            className={styles.Input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className={styles.Button} onClick={titleHandler}>
            카테고리 생성
          </button>
          <span>카테고리 번호</span>
          <input
            className={styles.Input}
            type="number"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          />
          <button className={styles.Button} onClick={categoryDelHandler}>
            카테고리 삭제
          </button>
          <span>포스트 번호</span>
          <input
            className={styles.Input}
            type="number"
            value={num}
            onChange={(e) => setNumber(e.target.value as any)}
          />
          <button className={styles.Button} onClick={postDelHandler}>
            포스트 삭제
          </button>
          <button className={styles.Button} onClick={basket}>
            로컬스토리지 비우기
          </button>
          <button className={styles.Button} onClick={cacheDelHandler}>
            캐시 지우기
          </button>
        </div>
      </BGcontainer>
    </>
  );
};

export default Test;
