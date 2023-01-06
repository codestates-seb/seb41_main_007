import { FC } from 'react';
import './Styles/icon.css';

const HambergerIcon: FC = (): JSX.Element => {
  return (
    <div className="menu">
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="top"
          x="20"
          y="29"
          width="60"
          height="6"
          fill="rgb(118, 127, 66)"
        />
        <rect
          className="middle"
          x="20"
          y="45.5745"
          width="60"
          height="6"
          fill="rgb(118, 127, 66)"
        />
        <rect
          className="bottom"
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
