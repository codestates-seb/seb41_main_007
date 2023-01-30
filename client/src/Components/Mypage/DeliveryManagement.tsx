import DeliverySave from './DeliverySave';
import { TYPE_getAddress } from 'Types/common/product';
import { useAppSelector } from 'Redux/app/hook';
import { getDataP } from 'Redux/reducer/getDataSlice';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Empty from 'Components/Common/Empty';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

interface Props {
  session: any;
  setcontrol: Dispatch<SetStateAction<boolean>>;
}

const Deliveryaddress: React.FC<Props> = ({ session, setcontrol }) => {
  const [Address_Data, setAddress_Data] = useState<TYPE_getAddress[]>([]);
  const resultarr: TYPE_getAddress[] = useAppSelector(getDataP);

  const { data, isLoading, error } = useCustomQuery(
    `/addresses`,
    `/addresses`,
    session,
  );
  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     setcontrol(true);
  //   }
  // }, []);
  if (isLoading) return <Empty />;
  if (error) return <></>;
  // if (data.length > 0) {
  //   setcontrol(true);
  // }
  console.log(data);

  // if (isLoading) return <Empty />;

  if (!(data.length > 0)) {
    return <div>주소를 추가해주세요</div>;
  }

  return (
    <div className="h-auto">
      {data.map((dataEl: TYPE_getAddress) => (
        <div key={dataEl.addressId}>
          <DeliverySave data={dataEl} session={session}></DeliverySave>
        </div>
      ))}
    </div>
  );
};

export default Deliveryaddress;
