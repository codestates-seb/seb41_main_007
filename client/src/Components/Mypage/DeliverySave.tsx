import styled from 'styled-components';
import TinyTitle from 'Components/Common/TinyTitle';
import RadiusButton from 'Components/Common/RadiusButton';
import { useState } from 'react';
import Address from 'Components/PaymentPage/Adress';
import useBooleanInput from 'CustomHook/useBooleaninput';
import { TYPE_Product } from 'Types/common/product';

//1번 로컬 스토리지에서 바당옴
//2번 로컬스토리에서 지움

const Deliverydl = styled.dl`
  margin-top: 30px;
  margin-bottom: 30px;
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

const Deliverydiv = styled.div`
  font-size: var(--slarge);
  font-weight: bold;
  margin-top: 22px;
  margin-bottom: 30px;
`;

const Deliverydd = styled.dd`
  margin-top: 10px;
  padding: 0 0 30px;
  font-size: 16px;
  line-height: 26px;
  position: relative;
  border-bottom: 1px solid var(--gray-02);
`;
const Deliveryp = styled.p`
  max-width: 450px;
  text-overflow: ellipsis;
  white-space: nomal;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
`;

interface dataprops {
  data: UserProfile;
}
export interface UserProfile extends TYPE_Product {
  addressname: string;
  address: string;
  phonenumber: string;
}

// {
//   productId: 1,
//   addressname: '우리집',
//   name: '황낙준',
//   address: '(331-726) 충남 천안시 서북구',

//   phonenumber: '010-6693-2258',
// },
// data : UserProfile
// UserProfile {}
// interface UserProfile extends TYPE_PRODUCTS

const DeliverySave: React.FC<dataprops> = ({ data }) => {
  const [control, oncontrolCilck] = useBooleanInput(true);
  const [dataput, setdataput] = useState<UserProfile>(data);

  const onSave = (name: string, value: string) => {
    console.log(name, value);
    setdataput({ ...dataput, [name]: value });
  };

  return (
    <div>
      {control ? (
        <Deliverydl>
          <Deliverydt>
            <Deliverydiv>{dataput.addressname}</Deliverydiv>
            <DeliverydtLeft>
              <RadiusButton onClick={oncontrolCilck}>수정</RadiusButton>
            </DeliverydtLeft>
          </Deliverydt>
          <Deliverydd>
            <Deliveryp>{dataput.name}</Deliveryp>
            <Deliveryp>{dataput.address}</Deliveryp>
            <Deliveryp>{dataput.phonenumber}</Deliveryp>
          </Deliverydd>
        </Deliverydl>
      ) : (
        <div>
          <Address
            oncontrolCilck={oncontrolCilck}
            onSave={onSave}
            data={dataput}
          ></Address>
        </div>
      )}
    </div>
  );
};

export default DeliverySave;

//any 할당하면 타입을 따지지않음?
//컴퓨터를 속임
//change 박스 넘어가면 초기화 되는 문제 유즈 콜백 문제
