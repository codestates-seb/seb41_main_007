import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Totalpay from 'Components/PaymentPage/Totalpay';
import { useNavigate } from 'react-router';
import { BGcontainer } from 'Components/Common/BGcontainer';
import SaveAddress from 'Components/PaymentPage/SaveAddress';
import BasketfourList from 'Components/PaymentPage/BasketfourList';
import NewModal from 'Components/Common/NewModal';
import Empty from 'Components/Common/Empty';
import useScrollTop from 'CustomHook/useScrollTop';
import Deliveryaddress from 'Components/Mypage/DeliveryManagement';
import { useAppSelector } from 'Redux/app/hook';
import { madalState } from 'Redux/reducer/modalSlice';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import Payment from 'Components/PaymentPage/Payment';
import CustomTitle from 'Components/Header/CustomTitle';
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
  const [address, setAddress] = useState<boolean>(false);

  const [payment, setPayment] = useState<boolean>(true);
  const isModal = useAppSelector(madalState);

  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useCustomQuery(
    '/carts',
    '/carts',
    session,
  );

  useEffect(() => {
    refetch();
    if (!session) {
      navigate('/login');
    }
  }, []);

  useScrollTop();
  if (isLoading) return <Empty></Empty>;
  if (error) return <div></div>;

  return (
    <div>
      {isModal && <NewModal />}
      <BGcontainer>
        <CustomTitle title={'결제 | FarmPi'} />
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
            <Title>{address && <Deliveryaddress session={session} />}</Title>
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
