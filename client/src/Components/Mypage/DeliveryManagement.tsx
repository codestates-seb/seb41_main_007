import DeliverySave from './DeliverySave';
import { TYPE_getAddress } from 'Types/common/product';
import ComponentModal from 'Components/Common/ComponentModal';
import Empty from 'Components/Common/Empty';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

interface Props {
  session: any;
}

const Deliveryaddress: React.FC<Props> = ({ session }) => {
  const { data, isLoading, error } = useCustomQuery(
    `/addresses`,
    `/addresses`,
    session,
  );

  if (isLoading) return <Empty />;
  if (error) return <></>;

  if (!(data.length > 0)) {
    return (
      <div>
        <ComponentModal isButton={true}>
          <div>
            배송지추가를 이용하여<br></br>배송지를 등록해주세요.
          </div>
        </ComponentModal>
      </div>
    );
  }

  return (
    <div className="h-auto ">
      {data.map((dataEl: TYPE_getAddress) => (
        <div key={dataEl.addressId}>
          <DeliverySave data={dataEl} session={session}></DeliverySave>
        </div>
      ))}
    </div>
  );
};

export default Deliveryaddress;
