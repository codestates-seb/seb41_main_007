import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TabPanel from 'Components/Mypage/TabPanel';
import AccordionGroup from 'Components/Mypage/AccordionGroup';
import MainImage from 'Components/PaymentPage/MainImage';
import DeliveryResult from 'Components/Mypage/DeliveryResult';
import MembershipWithdrawal from 'Components/Mypage/MembershipWithdrawal';
import Modal from '@mui/material/Modal';

const ShortContainer = styled.div`
  width: 750px;
  margin: 0 auto;
  margin-top: 80px;
`;
export const style = {
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

const MyPage: React.FC<{ session: any }> = ({ session }) => {
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setValue(0);
  };

  useEffect(() => {
    setOpen(true);
  }, [open]);
  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <MainImage></MainImage>

      <ShortContainer>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="내 프로필" />
              <Tab label="주문 조회" />
              <Tab label="회원 탈퇴" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AccordionGroup />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 500, height: 270 }}>
                <div className="text-center mt-16 font-semibold text-xl">
                  <div className="">장바구니를 이용하여</div>
                  <div className="">상품을 주문해주세요.</div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setOpen(!open)}
                    className="border w-16 h-8 mt-16 bg-gray-100"
                  >
                    확인
                  </button>
                </div>
              </Box>
            </Modal>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MembershipWithdrawal session={session} />
          </TabPanel>
        </Box>
      </ShortContainer>
    </div>
  );
};
//네비게이션 오류 -> href
export default MyPage;
//스플릿 로직이 오류 불러일으킴
