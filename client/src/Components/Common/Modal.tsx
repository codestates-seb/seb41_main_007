import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { modalActions } from 'Redux/reducer/modalSlice';

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const DialogBox = styled.dialog`
  width: 500px;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
  position: relative;
  top: -10%;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalContent: React.FC = () => {
  const dispatch = useDispatch();
  const modalCloseHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(modalActions.closeModal());
  };
  return (
    <>
      <div className="text-center mt-16 font-semibold text-xl">
        <div className="">결제하기 전</div>
        <div className="">필수사항에 동의해야 합니다.</div>

        {/* <img
          url="https://media4.giphy.com/media/I8nG2ewVChKp1P5xdn/giphy.gif?cid=ecf05e47no11no72yrpux3l5vb7n9zdde0vivyzu5b7fs1nr&rid=giphy.gif&ct=g"
          alt="alert"
        /> */}
      </div>
      <button
        className="border w-16 h-8 mt-16 bg-gray-100"
        onClick={modalCloseHandler}
      >
        닫기
      </button>
    </>
  );
};
const Modal = () => {
  return (
    <ModalContainer>
      <DialogBox>
        <ModalContent />
      </DialogBox>
      <Backdrop />
    </ModalContainer>
  );
};

export default Modal;
