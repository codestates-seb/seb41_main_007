import { FC } from 'react';
import styled from 'styled-components';
import BasketList from 'Components/BasketPage/BasketList';

const Cart = styled.div`
  margin-top: 120px;
`;
const BasketForm = styled.div`
  width: 1180px;
  padding: 70px 0;
  margin: 0 auto;
`;
const BasketTitle = styled.h2`
  font-size: var(--large);
  font-weight: bold;
  padding-bottom: 40px;
`;

const basketsPage: FC = () => {
  return (
    <Cart>
      <BasketForm>
        <BasketTitle>장바구니</BasketTitle>
        <BasketList />
      </BasketForm>
    </Cart>
  );
};

export default basketsPage;