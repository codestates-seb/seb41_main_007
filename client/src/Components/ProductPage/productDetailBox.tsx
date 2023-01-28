import { FC } from 'react';
import ReadOnly from '../Editor/ReadOnly';
import styled from 'styled-components';

interface Props {
  body: string;
}

const ProductDetailBox: FC<Props> = ({ body }) => {
  return (
    <ProductDetailContainer>
      <ReadOnly data={JSON.parse(body)} />
    </ProductDetailContainer>
  );
};

export default ProductDetailBox;

const ProductDetailContainer = styled.div`
  padding: 20px;
`;
