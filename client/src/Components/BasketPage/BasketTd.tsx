import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNumberComma } from 'Utils/commonFunction';
import CounterButton2 from './CounterButton2';
import { useAppDispatch } from 'Redux/app/hook';
import { countset, countput, countDelete } from 'Redux/reducer/priceSlice';
import { Link } from 'react-router-dom';
import { TYPE_LocalOption } from 'Types/common/product';
import { useSession } from 'CustomHook/useSession';

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
  display: flex;
`;
const TableSubTitle = styled.div`
  font-size: var(--medium);
  font-weight: bold;
  display: flex;
  margin-top: 2px;
  padding-top: 1px;
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

//1??? ?????? ????????? ??????
//2??? ??????
//3??? ???????????? ???????????? ?????? ????????? ????????? ????????? ?????? ?????????
//3?????? 2?????? ???????????? ??????
//???????????? ???????????? ?????? ?????????????????? ???????????? ????????????????????? ????????????

interface checkBoxtype {
  el: any;
  handleSingleCheck: (checked: boolean, id: number) => void;
  checkItems: number[];
  // countNumber: number;
  optionData: TYPE_LocalOption;
}

const BasketTd: FC<checkBoxtype> = ({
  el,
  handleSingleCheck,
  checkItems,
  // countNumber,
  optionData,
}): JSX.Element => {
  const jsondata: string | null = localStorage.getItem('baskets');
  const baskets = JSON.parse(jsondata || '[]') || [];
  const jsondataCounter: string | null = localStorage.getItem('basketsCounter');
  const basketsCounter = JSON.parse(jsondataCounter || '[]') || [];
  const [number, setnumber] = useState<number>(optionData.count);
  const { session, loading } = useSession();
  if (loading) return <></>;

  // const [deleteb, setdeleteb] = useState<any[] | []>([]);
  const dispatch = useAppDispatch();
  const optionId: number = el.productOptionResponseDtos.productOptionId;
  useEffect(() => {
    dispatch(
      countset({
        id: optionId,
        price: el.price + optionData.optionprice,
        count: optionData.count,
      }),
    );
  }, []);

  useEffect(() => {
    basketsCounter.forEach((data: any) => {
      if (data.productOptionId === optionId) data.count = number;
    });

    localStorage.setItem('basketsCounter', JSON.stringify(basketsCounter));
    dispatch(
      countput({
        id: el.productOptionResponseDtos.productOptionId,
        count: number,
      }),
    );
  }, [number]);

  const deleteBasket = (data: any) => {
    //?????? ????????? ??????
    handleSingleCheck(false, data.productOptionResponseDtos.productOptionId);

    const save = baskets.filter((el: any) => {
      return (
        el.productOptionResponseDtos.productOptionId !==
        data.productOptionResponseDtos.productOptionId
      );
    });
    const saveCounter = basketsCounter.filter((el: any) => {
      return (
        el.productOptionId !== data.productOptionResponseDtos.productOptionId
      );
    });

    if (session) {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/carts/${optionData.productOptionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`,
          },
          method: 'DELETE',
        },
      );
      // .then((response) => console.log(response));
    }

    dispatch(countDelete({ id: el.productOptionResponseDtos.productOptionId }));
    localStorage.setItem('basketsCounter', JSON.stringify(saveCounter));
    localStorage.setItem('baskets', JSON.stringify(save));
  };

  return (
    <>
      <Tablebody1>
        <THinput
          type="checkbox"
          defaultValue="basic"
          onChange={(e) =>
            handleSingleCheck(
              e.target.checked,
              el.productOptionResponseDtos.productOptionId,
            )
          }
          // ????????? ????????? ????????? ?????? ???????????? ?????? ?????? ?????? ?????????, ?????? ??? ??????
          checked={
            checkItems.includes(el.productOptionResponseDtos.productOptionId)
              ? true
              : false
          }
        ></THinput>
      </Tablebody1>

      <Tablebody2>
        <TB2Container>
          <Link key={el.productId} to={`/product/${el.productId}`}>
            <div className="flex">
              <TableimgDiv url={el.photo}></TableimgDiv>
              <TableProduct>
                <TableTitle>
                  {`${el.name}`}
                  <TableSubTitle>
                    &ensp;{`???????????? ${el.productId}`}
                  </TableSubTitle>
                </TableTitle>
                <TableContent>{el.description}</TableContent>
                <div>
                  {`${useNumberComma(el.price)}??? + ${useNumberComma(
                    optionData.optionprice,
                  )}???(Option ${optionData.optionname})`}
                </div>
                <TablePrice>
                  <div></div>=
                  {useNumberComma(el.price + optionData.optionprice)}
                  <span>???</span>
                </TablePrice>
              </TableProduct>
            </div>
          </Link>
        </TB2Container>
      </Tablebody2>

      <Tablebody3>
        <CounterButton2
          optionId={optionId}
          setnumber={setnumber}
          countNumber={optionData.count}
          session={session}
        />
      </Tablebody3>
      <Tablebody4>
        {useNumberComma((el.price + optionData.optionprice) * number)}
        <span>???</span>
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

//?????? ???????????? ??? ????????? ????????? if ?????? ??????
//????????????????????? ?????? ???????????? ???????????????
//??????????????? ?????????..
//??????????????? ????????? ???????????? ??????
//?????? ????????? ??????
