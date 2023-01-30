import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';

import TabPanel from 'Components/Mypage/TabPanel';
import AccordionGroup from 'Components/Mypage/AccordionGroup';
import MainImage from 'Components/PaymentPage/MainImage';
import DeliveryResult from 'Components/Mypage/DeliveryResult';

const ShortContainer = styled.div`
  width: 750px;
  margin: 0 auto;
  margin-top: 80px;
`;

const MyPage: React.FC<{ session: any }> = ({ session }) => {
  const [value, setValue] = useState<number>(0);

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
            <DeliveryResult></DeliveryResult>
          </TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </Box>
      </ShortContainer>
    </div>
  );
};
//네비게이션 오류 -> href
export default MyPage;
//스플릿 로직이 오류 불러일으킴
