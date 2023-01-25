import styled from 'styled-components';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import ProductSlider from 'Components/Common/ProductSlider';

const Container = styled.div`
  div {
    width: 100%;
    height: 360px;
  }
`;

const BestProductSlider: React.FC = (): JSX.Element => {
  const size = 8;
  const page = 1;
  const sort = 'productId';
  const order = 'descending';
  const { data, isLoading, error } = useCustomQuery(
    `/products?sort=${sort}&order=${order}&page=${page}&size=${size}`,
    `Basketproduct?sort=${sort}&order=${order}&page=${page}&size=${size}`,
  );

  if (isLoading) return <></>;
  if (error) return <></>;

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="pb-7 text-4xl font-bold tracking-tight text-gray-900 font-serif">
        베스트 상품
      </h2>
      <Container>
        {data.data && (
          <ProductSlider productList={data.data} isBest={true} isNew={false} />
        )}
      </Container>
    </div>
  );
};

export default BestProductSlider;
