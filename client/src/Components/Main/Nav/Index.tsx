import { FC } from 'react';
import styles from './Styles/index.module.css';
import NavList from './NavList';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

const Index: FC = () => {
  const { data, isLoading, error } = useCustomQuery(
    '/categories',
    'categories',
  );
  if (isLoading) return <></>;
  if (error) return <></>;
  return (
    <div className={styles.Nav_Container}>
      <NavList categoryList={data} />
    </div>
  );
};

export default Index;
