import { FC } from 'react';
import styled from 'styled-components';
import BasketList from 'Components/BasketPage/BasketList';
import { BGcontainer } from 'Components/Common/BGcontainer';

import useScrollTop from 'CustomHook/useScrollTop';
import CustomTitle from 'Components/Header/CustomTitle';
const Cart = styled.div`
  margin-top: 120px;
`;
const BasketForm = styled.div`
  width: 1180px;
  padding: 70px 0;
  margin: -50px auto 0 auto;
`;
const BasketTitle = styled.h2`
  font-size: var(--xxlarge);
  font-weight: bold;
  padding-bottom: 40px;
  text-align: center;
`;

const basketsPage: FC = () => {
  useScrollTop();
  return (
    <BGcontainer>
      <CustomTitle title={'장바구니 | FarmPi'} />
      <Cart>
        <BasketForm>
          <BasketTitle>장바구니</BasketTitle>
          <BasketList />
        </BasketForm>
      </Cart>
    </BGcontainer>
  );
};

export default basketsPage;
