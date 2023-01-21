import styled from 'styled-components';
import TinyTitle from 'Components/Common/TinyTitle';
import RadiusButton from 'Components/Common/RadiusButton';

import Address from 'Components/PaymentPage/Address';
import useBooleanInput from 'CustomHook/useBooleaninput';
//1번 로컬 스토리지에서 바당옴
//2번 로컬스토리에서 지움

const Deliverydl = styled.dl`
  margin-top: 30px;
  position: relative;
`;

const Deliverydt = styled.dt`
  display: flex;
  position: relative;
`;
const DeliverydtLeft = styled.div`
  padding: 24px 0 12px 0;

  position: absolute;
  right: 39%;
  top: 0;
`;
const Deliverydd = styled.dd`
  margin-top: 10px;
  padding: 0 0 30px;
  font-size: 16px;
  line-height: 26px;
  position: relative;
  border-bottom: 1px solid #ebebeb;
`;
const Deliveryp = styled.p``;

interface props {
  data: any;
}

const DeliverySave: React.FC<props> = ({ data }) => {
  const [control, oncontrolCilck] = useBooleanInput(false);

  return (
    <div>
      {control ? (
        <Deliverydl>
          <Deliverydt>
            <TinyTitle>{data.addresname}</TinyTitle>
            <DeliverydtLeft>
              <RadiusButton onClick={oncontrolCilck}>수정</RadiusButton>
            </DeliverydtLeft>
          </Deliverydt>
          <Deliverydd>
            <Deliveryp>{data.name}</Deliveryp>
            <Deliveryp>{data.addres}</Deliveryp>
            <Deliveryp>{data.phonenumber}</Deliveryp>
          </Deliverydd>
        </Deliverydl>
      ) : (
        <div>
          <Address oncontrolCilck={oncontrolCilck}></Address>
        </div>
      )}
    </div>
  );
};

export default DeliverySave;
