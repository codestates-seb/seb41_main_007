import DeliverySave from './DeliverySave';

import useBooleanInput from 'CustomHook/useBooleaninput';
//1번 로컬 스토리지에서 바당옴
//2번 로컬스토리에서 지움

const DeliveryAdress = () => {
  const [control, oncontrolCilck] = useBooleanInput(true);

  const Delivery = [
    {
      productId: 1,
      addresname: '우리집',
      name: '황낙준',
      addres: '(331-726) 충남 천안시 서북구',

      phonenumber: '010-6693-2258',
    },
    {
      productId: 2,
      addresname: '선물 보낼 곳',
      name: '서형민',
      addres: '(331-726) 인천 광역시 서북구',

      phonenumber: '010-6693-2258',
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
