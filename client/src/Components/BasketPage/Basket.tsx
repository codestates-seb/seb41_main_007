import { FC } from 'react';
import styled from 'styled-components';
import { useNumberComma } from 'Utils/commonFunction';
import CounterButton2 from './CounterButton2';

const Tablebody1 = styled.th`
  background: white;
  width: 67px;
  height: 161px;
  border-top: 1px solid var(--gray-05);
  border-bottom: 1px solid var(--gray-05);
  vertical-align: top;
  padding: 20px 0;
`;

const THinput = styled.input`
  width: 18px;
  height: 20px;
`;

const Tablebody2 = styled.td`
  background: white;
  width: 793px;
  height: 161px;
  border-top: 1px solid var(--gray-05);
  border-bottom: 1px solid var(--gray-05);
  padding: 20px 0;
  font-size: var(--small);
  font-weight: bold;
  box-sizing: border-box;
  vertical-align: middle;
`;

const TableA = styled.a`
  text-align: left;
  position: relative;
  display: flex;
`;

const TableimgDiv = styled.div<{ url: string }>`
  width: 120px;
  height: 120px;

  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const TableProduct = styled.div`
  padding-left: 30px;
`;

const TableTitle = styled.div`
  font-size: var(--medium);
`;

const TableContent = styled.div`
  font-size: var(--small);
  color: var(--a-gray-40);
  padding: 0 0 8px 0;
`;

const TablePrice = styled.div`
  font-size: var(--medium);
  color: var(--priceColor);
`;

const Tablebody3 = styled.td`
  background: white;
  width: 160px;
  height: 161px;
  border-top: 1px solid var(--gray-05);
  border-bottom: 1px solid var(--gray-05);
  padding: 20px 0;
  font-size: var(--small);
  color: var(--a-gray-40);
  font-weight: bold;
  text-align: center;
`;

const Tablebody4 = styled.td`
  background: white;
  width: 110px;
  height: 161px;
  border-top: 1px solid var(--gray-05);
  border-bottom: 1px solid var(--gray-05);
  padding: 20px 0;
  font-size: var(--medium);
  color: var(--priceColor);
  font-weight: 600;
  text-align: center;
`;
const Tablebody5 = styled.td`
  background: white;
  width: 50px;
  height: 161px;
  border-top: 1px solid var(--gray-05);
  border-bottom: 1px solid var(--gray-05);
  padding: 20px 0;
  text-align: center;
  padding: 20px 0;
  vertical-align: middle;
`;

const Xbutton = styled.button`
  width: 40px;
  height: 40px;
  background: none;
`;
//1번 로컬 스토리지에서 바당옴
//2번 로컬스토리에서 지움
const Basket: FC = () => {
  const jsondata: string | null = localStorage.getItem('baskets');

  const baskets = JSON.parse(jsondata || '[]');
  console.log(baskets);

  if (baskets.length === 0) return <></>;
  return (
    <tbody>
      {baskets.map((el: any) => (
        <tr key={el.productId}>
          <Tablebody1>
            <THinput type="checkbox" value="basic"></THinput>
          </Tablebody1>
          <Tablebody2>
            <TableA>
              <TableimgDiv url={el.photo}></TableimgDiv>
              <TableProduct>
                <TableTitle>{el.name}</TableTitle>
                <TableContent>{el.description}</TableContent>
                <TablePrice>
                  {useNumberComma(el.price)}
                  <span>원</span>
                </TablePrice>
              </TableProduct>
            </TableA>
          </Tablebody2>
          <Tablebody3>
            <CounterButton2 />
          </Tablebody3>
          <Tablebody4>
            {useNumberComma(el.price)}
            <span>원</span>
          </Tablebody4>

          <Tablebody5>
            <Xbutton>
              <img
                src="https://www.zipbanchan.co.kr/shop/remain/pc/imgs/icon/x.svg"
                alt="xxx"
              />
            </Xbutton>
          </Tablebody5>
        </tr>
      ))}
    </tbody>
  );
};

export default Basket;
