import { Carousell } from 'Components/Carousel';
import Index from 'Components/Main/Nav/Index';
import React from 'react';
import styles from './Styles/Main.module.css';

const Test: React.FC = () => {
  return (
    <div className={styles.Main_Container}>
      <Index />
      <Carousell />
    </div>
  );
};

export default Test;
