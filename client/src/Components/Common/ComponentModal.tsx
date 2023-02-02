import React, {
  useState,
  useEffect,
  ReactElement,
  Dispatch,
  SetStateAction,
} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useBooleanInput from 'CustomHook/useBooleaninput';

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

const ComponentModal: React.FC<{
  isButton?: boolean;
  children?: ReactElement<string>;
  setValue?: Dispatch<SetStateAction<boolean>>;
}> = ({ isButton, children, setValue }) => {
  const [isControl, onisControl, setisControl] = useBooleanInput(true);

  useEffect(() => {
    setisControl(true);
  }, []);
  return (
    <div>
      <Modal
        open={isControl}
        onClose={() => {
          onisControl();
          setValue?.(true);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500, height: 270 }}>
          <div className="text-center mt-16 font-semibold text-xl">
            <div className="">{children}</div>
          </div>
          <div className="flex justify-center">
            {isButton ? (
              <button
                onClick={() => {
                  onisControl();
                  setValue?.(true);
                }}
                className="border w-16 h-8 mt-12 bg-gray-100"
              >
                확인
              </button>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ComponentModal;
