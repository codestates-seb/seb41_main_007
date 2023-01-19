import ExampleBest from 'Components/BestProduct/BestCss';
import { Carousell } from 'Components/Common/Carousel';
import NewCarousel from 'Components/NewProduct/NewCss';
import Example from 'Components/Review/ReviewCss';
import StartDive from 'Components/NewProduct/StartDive';
import Index from 'Components/Main/Nav/Index';
import { FC } from 'react';
import styles from './Styles/Main.module.css';
import CustomTitle from 'Components/Header/CustomTitle';
import Story from 'Components/Main/Story';
const Main: FC = (): JSX.Element => {
  return (
    <main className={styles.Main_Container}>
      <CustomTitle title="FarmPi" description={'팜피에 오신걸 환영합니다!'} />
      <Index />
      <Carousell />
      <Story />
      <NewCarousel />
      <StartDive />
      <ExampleBest />
      <Example />
    </main>
  );
};

export default Main;
