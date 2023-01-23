import { BGcontainer } from 'Components/Common/BGcontainer';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useScrollTop from 'CustomHook/useScrollTop';
import BasketThree from 'Components/PaymentPage/BasketThree';
import Basketfour from 'Components/PaymentPage/Basketfour';
import TabPanel from 'Components/Mypage/TabPanel';
import AccordionGroup from 'Components/Mypage/AccordionGroup';

const ShortContainer = styled.div`
  width: 750px;
  margin: 0 auto;
`;

const Title = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
`;

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useScrollTop();

  return (
    <BGcontainer>
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
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AccordionGroup />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BasketThree></BasketThree>
            <Basketfour></Basketfour>
          </TabPanel>
        </Box>
      </ShortContainer>
    </BGcontainer>
  );
}
