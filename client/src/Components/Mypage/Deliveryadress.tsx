import DeliverySave from './DeliverySave';

import useBooleanInput from 'CustomHook/useBooleaninput';
//1번 로컬 스토리지에서 바당옴
//2번 로컬스토리에서 지움

const DeliveryAdress = () => {
  const [control, oncontrolCilck] = useBooleanInput(true);

  const Delivery = [
    {
      productId: 1,
      adressname: '우리집',
      name: '황낙준',
      adress: '(06035) 서울 강남구 가로수길 5 (지하철 1호선)',

      phonenumber: '010-6693-2258',
    },
    {
      productId: 2,
      adressname: '선물보낼곳',
      name: '서형민',
      adress: '(30257) 서울 강남구 가로수길 5 (지하철 1호선)',

      phonenumber: '010-6673-2258',
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

export default DeliveryAdress;
