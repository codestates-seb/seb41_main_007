import { FC } from 'react';
import styles from './Styles/index.module.css';
import NavList from './NavList';

const Index: FC = () => {
  return (
    <div className={styles.Nav_Container}>
      <NavList />
    </div>
  );
};

export default Index;
