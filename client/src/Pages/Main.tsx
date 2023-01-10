import { Carousell } from 'Components/Carousel';
import Index from 'Components/Main/Nav/Index';
import { FC } from 'react';
import styles from './Styles/Main.module.css';

const Main: FC = (): JSX.Element => {
  return (
    <>
      <div className={styles.Main_Container}>
        <Index />
        <Carousell />
      </div>
    </>
  );
};

export default Main;
