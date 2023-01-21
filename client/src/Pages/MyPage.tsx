import { BGcontainer } from 'Components/Common/BGcontainer';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccordionTitle from 'Components/Common/AccordionTitle';
import Box from '@mui/material/Box';
import MyProfile from 'Components/Mypage/MyProfile';
import DeliveryAdress from 'Components/Mypage/Deliveryadress';
import styled from 'styled-components';
import useScrollTop from 'CustomHook/useScrollTop';
import Address from 'Components/PaymentPage/Address';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
              <Tab label="내 프로필" {...a11yProps(0)} />
              <Tab label="주문 조회" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AccordionTitle ATvalue="내 정보 관리" Component={MyProfile} />
            <AccordionTitle ATvalue="배송지관리" Component={DeliveryAdress} />
            <AccordionTitle ATvalue="배송지추가" Component={Address} />
          </TabPanel>
          <TabPanel value={value} index={1}></TabPanel>
        </Box>
      </ShortContainer>
    </BGcontainer>
  );
}
