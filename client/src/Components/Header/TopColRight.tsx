import { FC } from 'react';
import styles from './Styles/TopColRight.module.css';
const TopColRight: FC = () => {
  return (
    <div>
      <ul className={styles.Nav_Container1}>
        <li className={styles.Nav_Menu1}>내정보</li>
        <li className={styles.Nav_Menu1}> |</li>
        <li className={styles.Nav_Menu1}>로그아웃</li>
      </ul>
      <ul className={styles.Nav_Container2}>
        <li className={styles.Nav_Menu2}>장바구니</li>
        <li className={styles.Nav_Menu2}>상품보기</li>
      </ul>
    </div>
  );
};

export default TopColRight;
