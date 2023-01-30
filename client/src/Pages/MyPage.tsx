import { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import useScrollTop from 'CustomHook/useScrollTop';
import { useSession } from 'CustomHook/useSession';
import TabPanel from 'Components/Mypage/TabPanel';
import AccordionGroup from 'Components/Mypage/AccordionGroup';
import MainImage from 'Components/PaymentPage/MainImage';
import DeliveryResult from 'Components/Mypage/DeliveryResult';
import Empty from 'Components/Common/Empty';
import { TYPE_People } from 'Types/common/product';
import { useAppDispatch } from 'Redux/app/hook';
import { saveDataP } from 'Redux/reducer/personDataSlice';

const ShortContainer = styled.div`
  width: 750px;
  margin: 0 auto;
  margin-top: 80px;
`;

const MyPage: React.FC<{ session: any }> = ({ session }) => {
  const [value, setValue] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [isloading, setisLoading] = useState<boolean>(true);

  // const [people, Setpeople] = useState<TYPE_People>({
  //   address: '',
  //   age: 0,
  //   email: '',
  //   gender: '',
  //   memberId: 0,
  //   name: '',
  //   phone: '',
  // });
  useScrollTop();
  useEffect(() => {
    if (session) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/members`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session}`,
        },
      })
        .then((res: Response) => {
          return res.json();
        })
        .then((res) => {
          dispatch(saveDataP(res));
          console.log(res);
          // Setpeople(res);
          setisLoading(false); //무한렌더링 막기용
        })
        .catch((e) => {
          console.log(e);
          setisLoading(false);
        });
      // const suggest = {
      //   name: '김병수',
      //   age: 26,
      //   email: 'qudtn7383@gmail.com',
      //   address: '대구',
      //   gender: 'male',
      //   phone: '010-0111-0000',
      // };
      // fetch(`${process.env.REACT_APP_BACKEND_URL}/members`, {
      //   body: JSON.stringify(suggest),
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${session}`,
      //   },
      //   method: 'PATCH',
      // }).then((response) => console.log(response));
    }
  }, []);

  // if (isloading) return <Empty />;
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
