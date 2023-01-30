import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from 'Redux/app/hook';
import { madalState, closeModal } from 'Redux/reducer/modalSlice';
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

export default function NewdModal() {
  const dispatch = useDispatch();
  const isModal = useAppSelector(madalState);

  const [open, setOpen] = React.useState(isModal);
  const handleOpen = () => {
    setOpen(!open);
    dispatch(closeModal());
  };

  const handleClose = () => {
    setOpen(!open);
    dispatch(closeModal());
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500, height: 270 }}>
          <div className="text-center mt-16 font-semibold text-xl">
            <div className="">결제하기 전</div>
            <div className="">필수사항에 동의해야 합니다.</div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => dispatch(closeModal())}
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
