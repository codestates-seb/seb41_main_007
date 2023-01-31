import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Totalpay from 'Components/PaymentPage/Totalpay';
import { useNavigate } from 'react-router';
import { BGcontainer } from 'Components/Common/BGcontainer';
import Modal from 'Components/Common/Modal';
import { useSelector } from 'react-redux';
import SaveAddress from 'Components/PaymentPage/SaveAddress';
import { TYPE_CartData } from 'Types/common/product';
import BasketfourList from 'Components/PaymentPage/BasketfourList';
import NewModal from 'Components/Common/NewModal';
import Empty from 'Components/Common/Empty';
import useScrollTop from 'CustomHook/useScrollTop';
import Deliveryaddress from 'Components/Mypage/DeliveryManagement';
import { useAppSelector } from 'Redux/app/hook';
import { madalState } from 'Redux/reducer/modalSlice';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import Payment from 'Components/PaymentPage/Payment';
const Container = styled.div`
  width: 830px;
`;

const Title = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
`;

const PaymentPage: React.FC<{ session: any }> = ({ session }) => {
  const [order, setOrder] = useState<boolean>(true);
  const [isDelivery, setisDelivery] = useState<boolean>(true);
  const [address, setAddress] = useState<boolean>(false); //배송지

  const [payment, setPayment] = useState<boolean>(true); //결제수단
  const isModal = useAppSelector(madalState);
  // const [data, setdata] = useState<TYPE_CartData[]>([]);
  const [isloading, setisLoading] = useState<boolean>(true);
  // const { loading, session } = useSession();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCustomQuery(
    '/carts',
    '/carts',
    session,
  );
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${session}`,
  //     },
  //   })
  //     .then((res: Response) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setdata(res);
  //       setisLoading(false); //무한렌더링 막기용
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setisLoading(false);
  //     });
  // }, []);
  useScrollTop();
  if (isLoading) return <Empty></Empty>;
  if (error) return <div></div>;

  // if (isloading) return <Empty />;

  return (
    <div>
      {isModal && <NewModal />}
      <BGcontainer>
        <div className="flex">
          <Container>
            <div className="font-semibold py-4 text-2xl mb-3"> 주문서</div>
            <Title>
              <div className=" font-semibold py-4 text-xl">
                주문상품정보 / 총&nbsp;{data.length}개
              </div>
              <button onClick={() => setOrder(!order)}>
                {order ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </button>
            </Title>
            {order && <BasketfourList data={data} />}
            <Title>
              <div className=" font-semibold py-4 text-xl">배송지 추가</div>
              <button onClick={() => setisDelivery(!isDelivery)}>
                {isDelivery ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </button>
            </Title>
            {isDelivery && <SaveAddress session={session} />}
            <Title>
              <div className=" font-semibold py-4 text-xl">배송지 관리</div>
              <button onClick={() => setAddress(!address)}>
                {address ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </button>
            </Title>
            <Title>
              {address && (
                <Deliveryaddress setcontrol={setAddress} session={session} />
              )}
            </Title>
            <Title>
              <div className=" font-semibold py-4 text-xl">결제수단</div>
              <button onClick={() => setPayment(!payment)}>
                {payment ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </button>
            </Title>
            {payment && <Payment />}
          </Container>
          <Totalpay data={data} />
        </div>
      </BGcontainer>
    </div>
  );
};
export default PaymentPage;

//패치오류 났음 세션 문제
//비로그인시 오류화면 뜨는거 안보이게 삭제
//데이터오류남
