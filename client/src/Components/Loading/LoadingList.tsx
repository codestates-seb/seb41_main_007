import { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Styles/LoadingList.module.css';

interface Props {
  num: number;
}

const LoadingList: FC<Props> = ({ num }) => {
  return (
    <div className={styles.Loading_Container}>
      <SkeletonTheme highlightColor="white">
        <ul className={styles.Loading_List_Container}>
          {SkeletonContent(num)}
        </ul>
      </SkeletonTheme>
    </div>
  );
};

const SkeletonContent = (num: number) => {
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(
      <li className={styles.Loading_List_Content} key={i}>
        <div className={styles.Loading_Img_Contanier}>
          <Skeleton className={styles.Loading_Content_Img} />
        </div>
        <Skeleton width={'80px'} style={{ marginTop: '10px' }} />
        <Skeleton width={'130px'} style={{ marginTop: '5px' }} />
      </li>,
    );
  }
  return array;
};

export default LoadingList;
