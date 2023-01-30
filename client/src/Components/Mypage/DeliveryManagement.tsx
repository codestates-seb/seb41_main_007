import DeliverySave from './DeliverySave';
import { TYPE_UserAddress } from 'Types/common/product';

const Deliveryaddress = () => {
  const Delivery: TYPE_UserAddress[] = [
    {
      name: '받는 사람',
      addressName: '보내는 곳',
      detailAddress: '눌러서 입력해주세요',
      phoneNumber: '-를 제외한 11자리 번호를 입력해주세요',
    },
  ];

  if (!(Delivery.length > 0)) {
    return <div>주소를 추가해주세요</div>;
  }

  return (
    <div className="h-full bg-amber-500">
      {Delivery &&
        Delivery.map((data: any, index) => (
          <div key={index}>
            <DeliverySave data={data}></DeliverySave>
          </div>
        ))}
    </div>
  );
};

export default Deliveryaddress;
