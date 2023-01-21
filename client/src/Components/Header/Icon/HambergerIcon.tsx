import { FC } from 'react';
import styles from './Styles/icon.module.css';

const HambergerIcon: FC = (): JSX.Element => {
  return (
    <div className={styles.menu}>
      <svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="20" y="29" width="60" height="6" fill="rgb(118, 127, 66)" />
        <rect
          x="20"
          y="45.5745"
          width="60"
          height="6"
          fill="rgb(118, 127, 66)"
        />
        <rect
          x="20"
          y="62.1489"
          width="60"
          height="6"
          fill="rgb(118, 127, 66)"
        />
      </svg>
    </div>
  );
};

export default HambergerIcon;
