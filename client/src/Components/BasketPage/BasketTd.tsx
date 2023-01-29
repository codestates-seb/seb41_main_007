import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNumberComma } from 'Utils/commonFunction';
import CounterButton2 from './CounterButton2';
import { useAppDispatch } from 'Redux/app/hook';
import { countset, countput, countDelete } from 'Redux/reducer/priceSlice';
import { Link } from 'react-router-dom';
import { TYPE_LocalOption } from 'Types/common/product';

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

  border-bottom: 1px solid var(--gray-05);
  padding: 20px 0;
  font-size: var(--small);
  font-weight: bold;
  box-sizing: border-box;
  vertical-align: middle;
`;

const TB2Container = styled.div`
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
  font-size: var(--large);
  font-weight: bold;
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

//1번 전체 금액을 스캔
//2번 합산
//3번 카운터가 수정되면 다시 그값을 초기화 시키고 다시 받아옴
//3번의 2번은 더한만큼 뺴줌
//변화량을 더하거나 뺴줌 유즈이펙트로 처음에만 렌더링되ㅏㄹ때 값넣어줌

interface checkBoxtype {
  el: any;
  handleSingleCheck: (checked: boolean, id: number) => void;
  checkItems: number[];
  // countNumber: number;
  OptionData: TYPE_LocalOption;
}

const BasketTd: FC<checkBoxtype> = ({
  el,
  handleSingleCheck,
  checkItems,
  // countNumber,
  OptionData,
}): JSX.Element => {
  const jsondata: string | null = localStorage.getItem('baskets');
  const baskets = JSON.parse(jsondata || '[]') || [];
  const jsondataCounter: string | null = localStorage.getItem('basketsCounter');
  const basketsCounter = JSON.parse(jsondataCounter || '[]') || [];
  const [number, setnumber] = useState<number>(OptionData.count);
  console.log(OptionData);
  console.log(OptionData.count);
  // const [deleteb, setdeleteb] = useState<any[] | []>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(el.price + OptionData.optionprice);
    console.log('안녕');
    dispatch(
      countset({
        id: el.productId,
        price: el.price + OptionData.optionprice,
        count: OptionData.count,
      }),
    );
  }, []);

  useEffect(() => {
    basketsCounter.forEach((data: any) => {
      console.log(number);
      if (data.id === el.productId) data.count = number;
    });
    console.log(basketsCounter);
    console.log('이지');
    localStorage.setItem('basketsCounter', JSON.stringify(basketsCounter));
    dispatch(countput({ id: el.productId, count: number }));
  }, [number]);

  const deleteBasket = (data: any) => {
    handleSingleCheck(false, data.productId);

    const save = baskets.filter((el: any) => {
      return el.productId !== data.productId;
    });
    const saveCounter = basketsCounter.filter((el: any) => {
      return el.id !== data.productId;
    });

    dispatch(countDelete({ id: el.productId }));
    localStorage.setItem('basketsCounter', JSON.stringify(saveCounter));
    localStorage.setItem('baskets', JSON.stringify(save));
    // setnumber(0); 스택오버플로우에 올리기
  };

  return (
    <>
      <Tablebody1>
        <THinput
          type="checkbox"
          defaultValue="basic"
          onChange={(e) => handleSingleCheck(e.target.checked, el.productId)}
          // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
          checked={checkItems.includes(el.productId) ? true : false}
        ></THinput>
      </Tablebody1>

      <Tablebody2>
        <Link key={el.productId} to={`/product/${el.productId}`}>
          <TB2Container>
            <TableimgDiv url={el.photo}></TableimgDiv>
            <TableProduct>
              <TableTitle>{`${el.name}`}</TableTitle>
              <TableContent>{el.description}</TableContent>
              <div>
                {' '}
                {`${useNumberComma(el.price)}원 + ${useNumberComma(
                  OptionData.optionprice,
                )}원(Option ${OptionData.optionname})`}
              </div>
              <TablePrice>
                <div></div>={useNumberComma(el.price + OptionData.optionprice)}
                <span>원</span>
              </TablePrice>
            </TableProduct>
          </TB2Container>
        </Link>
      </Tablebody2>

      <Tablebody3>
        <CounterButton2 setnumber={setnumber} countNumber={OptionData.count} />
      </Tablebody3>
      <Tablebody4>
        {useNumberComma((el.price + OptionData.optionprice) * number)}
        <span>원</span>
      </Tablebody4>

      <Tablebody5>
        <Xbutton onClick={() => deleteBasket(el)}>
          <img
            src="https://www.zipbanchan.co.kr/shop/remain/pc/imgs/icon/x.svg"
            alt="xxx"
          />
        </Xbutton>
      </Tablebody5>
    </>
  );
};

export default BasketTd;

//성능 생각해서 더 우선시 되는걸 if 앞에 넣음
//카운트버튼숫자 후버 업데이트 오류났었음
