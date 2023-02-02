import { FC, useState } from 'react';
import styles from './Styles/Test.module.css';
import { BGcontainer } from 'Components/Common/BGcontainer';
import { Link } from 'react-router-dom';

const Test: FC = () => {
  const [title, setTitle] = useState('');
  const [num, setNumber] = useState(0);
  const [category, setCategory] = useState(0);
  const token = localStorage.getItem('access_token');
  const titleHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: title }),
    })
      .then((res) => {
        console.info(res);
        setTitle('');
        alert('카테고리 추가완료');
      })
      .catch((e) => {
        console.error(e);
        alert('실패');
      });
  };
  const postDelHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${num}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.info(res);
        alert('삭제완료');
      })
      .catch((e) => {
        console.error(e);
        alert('실패');
      });
  };
  const categoryDelHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/${num}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.info(res);
        alert('삭제완료');
      })
      .catch((e) => {
        console.error(e);
        alert('실패');
      });
  };
  const cacheDelHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/caches/initialization`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        alert('캐시지우기완료');
        console.info(res);
      })
      .catch((e) => {
        console.error(e);
        alert('실패');
      });
  };

  const basket = () => {
    localStorage.removeItem('baskets');
    localStorage.removeItem('basketsCounter');
    alert('장바구니 초기화완료');
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
