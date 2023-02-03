import { FC, useState } from 'react';
import styled from 'styled-components';
import Basket from './Basket';
import { useAppSelector, useAppDispatch } from 'Redux/app/hook';
import { selectprice, Pricestate, countDelete } from 'Redux/reducer/priceSlice';
import useScrollTop from 'CustomHook/useScrollTop';
import { useNumberComma } from 'Utils/commonFunction';
import BuyButton from 'Components/Common/BuyButton';
import BestProductSlider from 'Components/BestProductSlider';
import { useNavigate } from 'react-router-dom';
import { useSession } from 'CustomHook/useSession';
import { TYPE_CartData, TYPE_LocalOption } from 'Types/common/product';
import { useQueryClient } from 'react-query';
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
  display: flex;

  flex-direction: column;
  align-items: flex-end;
`;

const TotalPrice = styled.div`
  font-weight: bold;
  font-size: var(--large);
`;

const PointPrice = styled.span`
  color: var(--priceColor);
`;

const Smallfont = styled.span`
  font-size: var(--small);
`;

const ButtonContainer = styled.div`
  display: flex;
  text-align: center;
  padding: 60px 0;
  justify-content: center;
`;

const ControlContainer = styled.div`
  margin: 0 -200px 0 -170px;
`;

const BasketList: FC = () => {
  const [checkItems, setCheckItems] = useState<number[]>([]);
  const resultarr: Pricestate[] = useAppSelector(selectprice);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const jsondata: string | null = localStorage.getItem('baskets');
  const baskets = JSON.parse(jsondata || '[]');
  const jsondataCounter: string | null = localStorage.getItem('basketsCounter');
  const basketsCounter = JSON.parse(jsondataCounter || '[]') || [];
  const { session, loading } = useSession();
  useScrollTop();
  if (loading) return <></>;

  let result: number = resultarr.reduce((acc, cur) => {
    if (cur?.price && cur?.count) {
      acc = acc + cur.price * cur.count;
      return acc;
    } else {
      return acc;
    }
  }, 0);
  const resultCount: number = resultarr.reduce((acc, cur) => {
    if (cur?.count) {
      acc = acc + cur.count;
      return acc;
    }
    return acc;
  }, 0);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked?: boolean, id?: number) => {
    if (checked && id) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems([...checkItems, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray: number[] = [];
      baskets.forEach((el: any) =>
        idArray.push(el.productOptionResponseDtos.productOptionId),
      );
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  const deleteAllCheck = () => {
    // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
    if (checkItems.length === baskets.length) {
      setCheckItems([]);
      localStorage.removeItem('baskets');
      localStorage.removeItem('basketsCounter');
    }
    const deleteSave = baskets.filter((el: any) => {
      return !checkItems.includes(el.productOptionResponseDtos.productOptionId);
    });
    const deleteSaveCounter = basketsCounter.filter((el: any) => {
      if (checkItems.includes(el.productOptionId)) {
        if (session) {
          fetch(
            `${process.env.REACT_APP_BACKEND_URL}/carts/${el.productOptionId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session}`,
              },
              method: 'DELETE',
            },
          ).then((response) => {
            queryClient.invalidateQueries('/carts');
            // console.log(response);
          });
        }
        return false;
      }
      return true;
    });

    checkItems.forEach((el) => {
      dispatch(countDelete({ id: el }));
    });

    localStorage.setItem('basketsCounter', JSON.stringify(deleteSaveCounter));
    localStorage.setItem('baskets', JSON.stringify(deleteSave));
    setCheckItems([]);
    // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
  };

  const LoginOrGo = () => {
    if (session) {
      const basketOptionId = basketsCounter.map((basket: TYPE_LocalOption) => {
        return basket.productOptionId;
      });

      fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
        .then((res: Response) => {
          return res.json();
        })
        .then((Carts: TYPE_CartData[]) => {
          queryClient.invalidateQueries('/carts');

          Carts.forEach((cartsData) => {
            const indexOption = basketOptionId.indexOf(
              cartsData.productOptionId,
            );

            if (indexOption === -1) {
              fetch(
                `${process.env.REACT_APP_BACKEND_URL}/carts/${cartsData.productOptionId}`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session}`,
                  },
                  method: 'DELETE',
                },
              ).then((response) => {
                queryClient.invalidateQueries('/carts');
              });
            } else {
              const quantityValue =
                basketsCounter[indexOption].count - cartsData.quantity;

              if (quantityValue !== 0) {
                const suggest = {
                  productOptionId: cartsData.productOptionId,
                  quantity: quantityValue,
                };

                fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
                  body: JSON.stringify(suggest),
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session}`,
                  },
                  method: 'PATCH',
                }).then((response) => {
                  queryClient.invalidateQueries('/carts');
                  // console.log(response);
                });
              }
            }
          });

          navigate('/payment');
        });
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <BasketForm>
        <Baskethead>
          <BasketLefthead>장바구니</BasketLefthead>
          <BasketRighthead onClick={deleteAllCheck}>선택삭제</BasketRighthead>
        </Baskethead>
        <table>
          <thead>
            <tr>
              <Tableheader1>
                <THinput
                  type="checkbox"
                  value="basic"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={
                    checkItems.length === baskets.length && baskets.length !== 0
                      ? true
                      : false
                  }
                ></THinput>
              </Tableheader1>
              <Tableheader2>상품정보</Tableheader2>
              <Tableheader3>수량</Tableheader3>
              <Tableheader4>주문금액</Tableheader4>
              <Tableheader5></Tableheader5>
            </tr>
          </thead>
          <Basket
            handleSingleCheck={handleSingleCheck}
            checkItems={checkItems}
          />
        </table>
        <TableBottom>
          <TotalPrice>
            <span>주문 개수 </span>
            <PointPrice>{resultCount} </PointPrice>
            <Smallfont>개</Smallfont>
          </TotalPrice>
          <TotalPrice>
            <span>예상 주문금액 </span>
            <PointPrice>{useNumberComma(result)} </PointPrice>
            <Smallfont>원</Smallfont>
          </TotalPrice>
        </TableBottom>
      </BasketForm>
      <ControlContainer>
        <BestProductSlider></BestProductSlider>
      </ControlContainer>
      <ButtonContainer>
        <BuyButton
          onClick={() => navigate('/')}
          background={'var( --white-02)'}
          margin={'0 12px 0 12px'}
        >
          계속 쇼핑하기
        </BuyButton>
        <BuyButton
          onClick={() => LoginOrGo()}
          background="var(--green-40)"
          margin={'0 12px 0 12px'}
        >
          주문하기
        </BuyButton>
      </ButtonContainer>
    </>
  );
};

export default BasketList;

//새로고침 했을때 총값 업데이트 되기 쿼리 데이터로 처리하기
//총값 계산 업데이트 안되는 문제 해결
// 페이지 이동시 리덕스값이 사라짐
//새로고침시 리덕스 초기화 되는 문제
// 코드를 너무 복잡하게짬.. sementic 아이디 통일 못함
//비로그인시 메인으로 보내는게 편함
// 로딩시간만큼 내리는데 시간이 들어서 생략
//백엔드와 db관리하는데에 있어서 오류가 있었따.
//id기반으로 ㅁ나들었기에
//로컬스토리지 클리어시 토큰 삭제
//넘어가는 화면이 빨라서 데이터 못받아와서 느려짐
// 로딩화면 추가할예정
//foreach 안돌아가는 상황이있었음
//API밀릴경우 버그 잡음
