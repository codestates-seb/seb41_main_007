import { TYPE_CartData } from 'Types/common/product';
import React from 'react';

interface Props {
  data?: TYPE_CartData;
}
const Basketfour: React.FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <div className="mt-5 relative  h-32 w-12/12">
      <div>
        <img
          className="absolute top-0 left-0 w-28 h-28"
          src="https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg"
          alt="carousel"
        ></img>

        <div className=" pl-36 h-28 w-full table-cell align-middle">
          <div>
            <div>김치</div>
            <div> 오호zlzl</div>
          </div>
          <p className="absolute w-44 top-12 right-0 text-right">
            3개
            <strong className="w-36 inline-block">
              2000
              <span>원</span>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Basketfour;
