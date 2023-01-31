import DeliverySave from './DeliverySave';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TYPE_getAddress } from 'Types/common/product';
import { useAppSelector } from 'Redux/app/hook';
import { getDataP } from 'Redux/reducer/getDataSlice';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Empty from 'Components/Common/Empty';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

import useBooleanInput from 'CustomHook/useBooleaninput';
interface Props {
  session: any;
  setcontrol: Dispatch<SetStateAction<boolean>>;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Deliveryaddress: React.FC<Props> = ({ session, setcontrol }) => {
  const [Address_Data, setAddress_Data] = useState<TYPE_getAddress[]>([]);
  const resultarr: TYPE_getAddress[] = useAppSelector(getDataP);
  const [isControl, onControl] = useBooleanInput(false);
  const { data, isLoading, error } = useCustomQuery(
    `/addresses`,
    `/addresses`,
    session,
  );
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };
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

  // if (isLoading) return <Empty />;

  if (!(data.length > 0)) {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 500, height: 270 }}>
            <div className="text-center mt-16 font-semibold text-xl">
              <div className="">배송지추가를 이용하여</div>
              <div className="">배송지를 등록해주세요.</div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setOpen(!open)}
                className="border w-16 h-8 mt-16 bg-gray-100"
              >
                닫기
              </button>
            </div>
          </Box>
        </Modal>
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
