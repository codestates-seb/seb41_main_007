import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TabPanel from 'Components/Mypage/TabPanel';
import AccordionGroup from 'Components/Mypage/AccordionGroup';
import MainImage from 'Components/PaymentPage/MainImage';
import ComponentModal from 'Components/Common/ComponentModal';
import MembershipWithdrawal from 'Components/Mypage/MembershipWithdrawal';
import CustomTitle from 'Components/Header/CustomTitle';

const ShortContainer = styled.div`
  width: 750px;
  margin: 0 auto;
  margin-top: 80px;
`;

const MyPage: React.FC<{ session: any }> = ({ session }) => {
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();

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
      <CustomTitle title={'회원정보 | FarmPi'} />
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
            <ComponentModal isButton={true}>
              <div>
                장바구니를 이용하여<br></br>상품을 주문해주세요.
              </div>
            </ComponentModal>
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
