import { FC } from 'react';
import styled from 'styled-components';

const EmptyComponent = styled.div`
  width: 100%;
  height: 100vh;
`;
const Empty: FC = () => {
  return <EmptyComponent />;
};

export default Empty;
