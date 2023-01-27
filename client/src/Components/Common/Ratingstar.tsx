import React from 'react';

interface props {
  num: number;
}
const Ratingstar: React.FC<props> = ({ num }) => {
  let star = '';
  for (let i = 0; i < num; i++) {
    star = star + '⭐';
  }
  return <div>{star}</div>;
};
export default Ratingstar;
