import { FC } from 'react';
import styles from './Styles/Nav.module.css';

const NavList: FC = () => {
  return (
    <div className={styles.Nav_Contents_Container}>
      <div className={styles.Nav_Content}>하우스 시설 자재</div>
      <div className={styles.Nav_Content}>과수 원예자재</div>
      <div className={styles.Nav_Content}>부직포 제초매트</div>
      <div className={styles.Nav_Content}>관수 배관자재 </div>
      <div className={styles.Nav_Content}>차광망 기타망</div>
      <div className={styles.Nav_Content}>농기계 농업용 자재 </div>
      <div className={styles.Nav_Content}>방충망 </div>
      <div className={styles.Nav_Content}>정원 원예용품 </div>
      <div className={styles.Nav_Content}>생활용품 잡화</div>
    </div>
  );
};

export default NavList;
