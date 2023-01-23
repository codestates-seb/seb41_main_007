import DeliverySave from './DeliverySave';

import useBooleanInput from 'CustomHook/useBooleaninput';
//1번 로컬 스토리지에서 바당옴
//2번 로컬스토리에서 지움

const Deliveryaddress = () => {
  const [control, oncontrolCilck] = useBooleanInput(true);

  const Delivery = [
    {
      productId: 1,
      addressname: '우리집',
      name: '황낙준',
      address: '(06035) 서울 강남구 가로수길 5 (지하철 1호선)',

      phonenumber: '01066932258',
    },
    {
      productId: 2,
      addressname: '선물보낼곳',
      name: '서형민',
      address: '(30257) 서울 강남구 가로수길 5 (지하철 1호선)',

      phonenumber: '01066732258',
    },
  ];

  return (
    <div className="h-full">
      {Delivery.map((data: any) => (
        <div key={data.productId}>
          <DeliverySave data={data}></DeliverySave>
        </div>
      ))}
    </div>
  );
};

export default Deliveryaddress;
