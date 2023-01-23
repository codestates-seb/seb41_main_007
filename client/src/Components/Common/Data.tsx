import styled from 'styled-components';
import { useNumberComma } from 'Utils/commonFunction';
const Content = styled.div`
  img {
    width: 280px;
    height: 250px;
    margin-bottom: 5px;
  }
  span {
    display: block;
  }
`;
interface useItemProps {
  photo: string;
  name: string;
  price: number;
}

const Data = ({ photo, name, price }: useItemProps) => {
  return (
    <>
      <Content>
        <img src={photo} alt="carousel"></img>
        <span className="text-red-600 text-xs mt-4">#신제품</span>
        <span className="font-semibold text-sm mt-2">{name}</span>
        <span className="text-gray-400 text-xs mt-1">
          주문시 10% 추가 할인쿠폰 사용 가능
        </span>
        <span className="text-red-700 font-semibold text-sm mt-2">
          {useNumberComma(price)}원
        </span>
      </Content>
    </>
  );
};

export default Data;
