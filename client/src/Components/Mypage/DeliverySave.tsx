import styled from 'styled-components';
import { useCallback, useState } from 'react';
import RadiusButton from 'Components/Common/RadiusButton';
import Address from 'Components/PaymentPage/Address';
import useBooleanInput from 'CustomHook/useBooleaninput';
import { TYPE_getAddress } from 'Types/common/product';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';

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

interface Props {
  data: TYPE_getAddress;
  session: any;
}

// private String addressName;

// private String name;

// private String detailAddress;

// @Pattern(regexp = "^010\d{3,4}\d{4}$",
//         message = "휴대폰 번호는 010으로 시작하는 11자리 숫자로 구성되어야 합니다.")
// private String phoneNumber;
const DeliverySave: React.FC<Props> = ({ data, session }) => {
  const [control, oncontrolCilck] = useBooleanInput(data ? true : false);
  const [dataPut, setDataPut] = useState<TYPE_getAddress>(data);
  const deletefetch = () => {
    mutate({});
  };
  const { mutate } = useCustomMutation(
    `/addresses/${data.addressId}`,
    `/addresses`,
    'DELETE',
    session,
  );

  return (
    <div>
      {control ? (
        <Deliverydl>
          <Deliverydt>
            <Deliverydiv>{dataPut.addressName}</Deliverydiv>
            <DeliverydtLeft>
              <RadiusButton onClick={oncontrolCilck}>수정</RadiusButton>
              <RadiusButton onClick={deletefetch}>삭제</RadiusButton>
            </DeliverydtLeft>
          </Deliverydt>
          <Deliverydd>
            <Deliveryp>{dataPut.name}</Deliveryp>
            <Deliveryp>{dataPut.detailAddress}</Deliveryp>
            <Deliveryp>{dataPut.phoneNumber}</Deliveryp>
          </Deliverydd>
        </Deliverydl>
      ) : (
        <div>
          <Address
            oncontrolCilck={oncontrolCilck}
            dataPut={dataPut}
            setDataPut={setDataPut}
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
//데이터 로직 수정이 필요함
