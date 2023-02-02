import { FC } from 'react';
import { Carousell } from 'Components/Common/Carousel';
import Review from 'Components/Review/Review';
import StartDive from 'Components/NewProduct/StartDive';
import CustomTitle from 'Components/Header/CustomTitle';
import Story from 'Components/Main/Story';
import NewProduct from 'Components/NewProduct/NewProduct';
import BestProduct from 'Components/BestProduct/BestProduct';
import useScrollTop from 'CustomHook/useScrollTop';

const Main: FC = (): JSX.Element => {
  useScrollTop();
  return (
    <main>
      <CustomTitle title="FarmPi" description={'팜피에 오신걸 환영합니다!'} />
      <Carousell />
      <Story />
      <NewProduct />
      <StartDive />
      <BestProduct />
      <Review />
    </main>
  );
};

export default Main;
