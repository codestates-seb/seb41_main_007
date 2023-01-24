import MyProfile from 'Components/Mypage/MyProfile';
import Deliveryaddress from 'Components/Mypage/Deliveryadress';
import Address from 'Components/PaymentPage/Adress';
import AccordionTitle from 'Components/Common/AccordionTitle';

export default function AccordionGroup() {
  return (
    <div>
      <AccordionTitle
        Open={true}
        ATvalue="내 정보 관리"
        Component={MyProfile}
      />
      <AccordionTitle
        Open={false}
        ATvalue="배송지관리"
        Component={Deliveryaddress}
      />
      <AccordionTitle Open={true} ATvalue="배송지추가" Component={Address} />
    </div>
  );
}
//배송지 관리 추가 상관관계 만들기
