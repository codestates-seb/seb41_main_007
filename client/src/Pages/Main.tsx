import { FC } from 'react';

import ExampleBest from 'Components/BestProduct/BestCss';
import { Carousell } from 'Components/Common/Carousel';
import NewCarousel from 'Components/NewProduct/NewCss';
import Example from 'Components/Review/ReviewCss';
import StartDive from 'Components/NewProduct/StartDive';
import CustomTitle from 'Components/Header/CustomTitle';
import Story from 'Components/Main/Story';
import { BGcontainer } from 'Components/Common/BGcontainer';

const Main: FC = (): JSX.Element => {
  return (
    <main>
      <BGcontainer>
        <CustomTitle title="FarmPi" description={'팜피에 오신걸 환영합니다!'} />
        <Carousell />
        <Story />
        <NewCarousel />
        <StartDive />
        <ExampleBest />
        <Example />
      </BGcontainer>
    </main>
  );
};

export default Main;
