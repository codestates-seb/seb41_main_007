import ExampleBest from 'Components/BestProduct/BestCss';
import { Carousell } from 'Components/Carousel';
import NewCarousel from 'Components/NewProduct/NewCss';
import Example from 'Components/Review/ReviewCss';
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
      <ExampleBest />
      <NewCarousel />
      <Example />
    </>
  );
};

export default Main;
