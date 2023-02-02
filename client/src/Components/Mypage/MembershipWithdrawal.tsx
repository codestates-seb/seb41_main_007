import styled from 'styled-components';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import BuyButton from 'Components/Common/BuyButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MWcontainer = styled.div``;

const StyleToastContainer = styled(ToastContainer)`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
//삭제기능 토큰 확인 기능추가
const MembershipWithdrawal: React.FC<{ session: any }> = ({ session }) => {
  const { mutate } = useCustomMutation(
    `/members`,
    `/members`,
    'DELETE',
    session,
    false,
  );
  const sucessAlram = () =>
    toast.success('회원탈퇴가 완료 되었습니다..', {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const refresh_Token = localStorage.getItem('refresh_token');
  const [open, setOpen] = useState(false);
  const [guest, setguest] = useState(false);
  const [isSucess, setisSucess] = useState(true);

  const handleYes = () => {
    if (
      refresh_Token !==
      'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxMDQyNTI5MjI5MDY3Nzk3Njc4NTMiLCJpYXQiOjE2NzQ4ODY3OTksImV4cCI6MTY3NjM1ODAyOH0.F1H36p1PKfq3m8q7YOe8HtzYtvNdROZicNDE-3xDDRYW_iqJ2FO7-ElUQ1pTtI2B'
    ) {
      mutate({});
      localStorage.removeItem('access_token');

      setisSucess(false);

      //홈으로가기
    } else {
      setguest(true);
    }
  };

  const handleNo = () => {
    setOpen(!open);
    if (!isSucess) {
      window.location.href = '/';
    }
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
    <div className="flex justify-center">
      <MWcontainer>
        <div className="text-center text-xl my-8 text-slate-1000 font-bold">
          회원 탈퇴 안내
          <div className="bg-gray-50 py-2 text-lg mb-2 mt-4 flex w-96">
            <div className="text-sm p-4 mt-1 text-left text-slate-500 font-bold">
              FAMPI에 방문해주셔서 감사합니다. 만족스러운 서비스를 제공하지 못해
              아쉽습니다. FAMPI를 좋은 추억으로 남겨주시면 감사하겠습니다.
              <br></br>
              <br></br>
              <div className="">FAMPI</div>
            </div>
          </div>
        </div>
        <div className="ml-6">
          <BuyButton
            onClick={handleNo}
            background="var(--greenlogo);"
            color="var(--bg-white-05)"
          >
            회원 탈퇴
          </BuyButton>
        </div>
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
            ) : isSucess ? (
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
            ) : (
              <div>
                <div className="text-center mt-20 font-semibold text-xl">
                  <div className="">성공적으로 탈퇴 되었습니다.🧑</div>
                  <div className="">FARMPI와 함께해주셔서 감사합니다!</div>
                </div>
                <div className="flex justify-center"></div>
              </div>
            )}
          </Box>
        </Modal>
        <StyleToastContainer
          limit={4}
          transition={Zoom}
          hideProgressBar
          autoClose={1000}
        />
      </MWcontainer>
    </div>
  );
};

export default MembershipWithdrawal;
