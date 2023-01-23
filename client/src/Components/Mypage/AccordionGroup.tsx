import MyProfile from 'Components/Mypage/MyProfile';
import Deliveryaddress from 'Components/Mypage/Deliveryadress';
import Address from 'Components/PaymentPage/Adress';
import AccordionTitle from 'Components/Common/AccordionTitle';

export default function AccordionGroup() {
  return (
    <div>
      <AccordionTitle ATvalue="내 정보 관리" Component={MyProfile} />
      <AccordionTitle ATvalue="배송지관리" Component={Deliveryaddress} />
      <AccordionTitle ATvalue="배송지추가" Component={Address} />
    </div>
  );
}
