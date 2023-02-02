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
        <ul>{SkeletonContent(num)}</ul>
      </SkeletonTheme>
    </div>
  );
};

export const SkeletonContent = (num: number) => {
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(
      <li className={styles.Loading_List_Content} key={i}>
        <div className={styles.Loading_Img_Contanier}>
          <Skeleton className={styles.Loading_Content_Img} />
        </div>
        <Skeleton
          className={styles.Loading_Content}
          width={'100px'}
          style={{ marginTop: '10px' }}
        />
        <Skeleton className={styles.Loading_Content} width={'130px'} />
      </li>,
    );
  }
  return array;
};

export default LoadingList;
