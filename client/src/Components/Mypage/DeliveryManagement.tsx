import DeliverySave from './DeliverySave';
import { TYPE_getAddress } from 'Types/common/product';
import { useAppSelector } from 'Redux/app/hook';
import { getDataP } from 'Redux/reducer/getDataSlice';
import { useState, useEffect } from 'react';
import Empty from 'Components/Common/Empty';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

const Deliveryaddress: React.FC<{ session: any }> = ({ session }) => {
  const [Address_Data, setAddress_Data] = useState<TYPE_getAddress[]>([]);
  const resultarr: TYPE_getAddress[] = useAppSelector(getDataP);

  const { data, isLoading, error } = useCustomQuery(
    `/addresses`,
    `/addresses`,
    session,
  );
  useEffect(() => {
    console.log('하이');
    setAddress_Data([...Address_Data, ...resultarr]);
  }, [resultarr]);
  if (isLoading) return <Empty />;
  if (error) return <></>;
  console.log(data);

  // if (isLoading) return <Empty />;

  if (!(Address_Data.length > 0)) {
    return <div>주소를 추가해주세요</div>;
  }

  return (
    <div className="h-full bg-amber-500">
      {Address_Data &&
        Address_Data.map((data: TYPE_getAddress) => (
          <div key={data.addressId}>
            <DeliverySave data={data}></DeliverySave>
          </div>
        ))}
    </div>
  );
};

export default Deliveryaddress;
