import MyProfile from 'Components/Mypage/MyProfile';
import Deliveryaddress from 'Components/Mypage/DeliveryManagement';
import Address from 'Components/PaymentPage/Address';
import AccordionTitle from 'Components/Common/AccordionTitle';
import SaveAddress from 'Components/PaymentPage/SaveAddress';

const AccordionGroup: React.FC = () => {
  return (
    <div>
      <AccordionTitle
        Open={true}
        ATvalue="내 정보 관리"
        Component={MyProfile}
      />
      <AccordionTitle
        Open={false}
        ATvalue="배송지추가"
        Component={SaveAddress}
      />
      <AccordionTitle
        Open={false}
        ATvalue="배송지관리"
        Component={Deliveryaddress}
      />
    </div>
  );
};

export default AccordionGroup;

//배송지 관리 추가 상관관계 만들기
//컴포넌트에 대한 시행착오
//세션 다내려줌
