import ExampleBest from 'Components/BestProduct/BestCss';
import { Carousell } from 'Components/Carousel';
import NewCarousel from 'Components/NewProduct/NewCss';
import Example from 'Components/Review/ReviewCss';
import React from 'react';

const Test: React.FC = () => {
  return (
    <>
      <Carousell />
      <ExampleBest />
      <NewCarousel />
      <Example />
    </>
  );
};

export default Test;
