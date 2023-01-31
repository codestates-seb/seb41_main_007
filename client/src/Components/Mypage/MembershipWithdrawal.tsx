import styled from 'styled-components';

import BuyButton from 'Components/Common/BuyButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
const MWcontainer = styled.div``;

//삭제기능 토큰 확인 기능추가
const DeliveryResult: React.FC<{ session: any }> = ({ session }) => {
  const { mutate } = useCustomMutation(
    `/members`,
    `/members`,
    'DELETE',
    session,
    false,
  );
  const refresh_Token = localStorage.getItem('refresh_token');
  const [open, setOpen] = useState(false);
  const [guest, setguest] = useState(false);

  const handleYes = () => {
    if (!refresh_Token) {
      mutate({});
      localStorage.removeItem('access_token');
      window.location.href = '/';
      //홈으로가기
    } else {
      setguest(true);
    }
  };

  const handleNo = () => {
    setOpen(!open);
  };
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

  return (
    <MWcontainer>
      <div>
        페이지에 방문해주셔서 감사합니다. 오늘 이후에도 좋은 날이 가득하시길
        바라며, 좋은 추억으로 남겨주셨으면 감사하겠습니다. -FAMPI 운영진-
      </div>
      <BuyButton
        onClick={handleNo}
        background="var(--greenlogo);"
        color="var(--bg-white-05)"
      >
        회원 탈퇴
      </BuyButton>
      <Modal
        open={open}
        onClose={handleNo}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500, height: 270 }}>
          {guest ? (
            <div>
              <div className="text-center mt-16 font-semibold text-xl">
                <div className="">게스트는 탈퇴 할 수 없습니다🧑</div>
                <div className="">즐거운 시간 보내시길 바랍니다!</div>
              </div>
              <div className="flex justify-center"></div>
            </div>
          ) : (
            <div>
              <div className="text-center mt-16 font-semibold text-xl">
                <div className="">FAMPI와 함께해주셔서 감사합니다 🧑</div>
                <div className="">회원탈퇴를 하시겠습니까?</div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleYes}
                  className="border w-16 h-8 mt-12 bg-gray-100"
                >
                  예
                </button>
                <button
                  onClick={handleNo}
                  className="ml-12 border w-16 h-8 mt-12 bg-gray-100"
                >
                  아니오
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </MWcontainer>
  );
};

export default DeliveryResult;
