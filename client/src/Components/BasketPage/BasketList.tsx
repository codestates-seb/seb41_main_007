import { FC } from 'react';
import styled from 'styled-components';
import Basket from './Basket';

const BasketForm = styled.div`
  width: 1180px;

  margin: 0 auto;
`;

const Baskethead = styled.div`
  position: relative;
  display: flex;
`;
const BasketLefthead = styled.div`
  background: var(--green-60);
  color: var(--bg-white-05);
  padding: 0 46px;
  height: 48px;
  line-height: 48px;
`;
const BasketRighthead = styled.div`
  position: absolute;
  right: 0px;
  bottom: 8px;
  height: 48px;
  line-height: 48px;
  padding: 0 12px;
  border: 1px solid var(--black-20);
  color: var(--gray-40);
  cursor: pointer;
`;

const Tableheader1 = styled.th`
  background: white;
  width: 67px;
  height: 63px;
  border-top: 1px solid var(--green-60);
  border-bottom: 1px solid var(--gray-05);

  padding: 20px 0;
`;

const THinput = styled.input`
  width: 18px;
  height: 20px;
`;

const Tableheader2 = styled.th`
  background: white;
  width: 793px;
  height: 63px;
  border-top: 1px solid var(--green-60);
  border-bottom: 1px solid var(--gray-05);
  padding: 20px 0;
  font-size: var(--small);
  color: var(--a-gray-40);
  font-weight: bold;
`;

const Tableheader3 = styled.th`
  background: white;
  width: 160px;
  height: 63px;
  border-top: 1px solid var(--green-60);
  border-bottom: 1px solid var(--gray-05);
  padding: 20px 40px 20px 0;
  font-size: var(--small);
  color: var(--a-gray-40);
  font-weight: bold;
`;
const Tableheader4 = styled.th`
  background: white;
  width: 110px;
  height: 63px;
  border-top: 1px solid var(--green-60);
  border-bottom: 1px solid var(--gray-05);
  padding: 20px 0;
  font-size: var(--small);
  color: var(--a-gray-40);
  font-weight: bold;
`;
const Tableheader5 = styled.th`
  background: white;
  width: 50px;
  height: 63px;
  border-top: 1px solid var(--green-60);
  border-bottom: 1px solid var(--gray-05);
  padding: 20px 0;
`;
const TableBottom = styled.div`
  border-top: 2px solid #000;
  position: relative;
  padding: 44px 28px 40px 28px;
  border-bottom: 1px solid #f0f0f0;
  height: 134px;
  min-height: 50px;
`;
const TotalPrice = styled.div`
  position: absolute;
  top: 60px;
  right: 28px;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
`;

const ButtonContainer = styled.div`
  text-align: center;
  padding: 60px 0;
`;

const BasketList: FC = () => {
  return (
    <>
      <BasketForm>
        <Baskethead>
          <BasketLefthead>일반반찬세트</BasketLefthead>
          <BasketRighthead>선택삭제</BasketRighthead>
        </Baskethead>
        <table>
          <thead>
            <tr>
              <Tableheader1>
                <THinput type="checkbox" value="basic"></THinput>
              </Tableheader1>
              <Tableheader2>상품정보</Tableheader2>
              <Tableheader3>수량</Tableheader3>
              <Tableheader4>주문금액</Tableheader4>
              <Tableheader5></Tableheader5>
            </tr>
          </thead>
          <Basket></Basket>
        </table>
        <TableBottom>
          <TotalPrice>예상 주문금액</TotalPrice>
        </TableBottom>
      </BasketForm>
      <ButtonContainer>안녕</ButtonContainer>
    </>
  );
};

export default BasketList;
