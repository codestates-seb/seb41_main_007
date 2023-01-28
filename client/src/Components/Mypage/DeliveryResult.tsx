import styled from 'styled-components';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 500px 100px;
  grid-template-rows: 40px;
`;
const GridBox = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  color: #555555;
  font-size: 100%;
  font-weight: bold;
  display: flex;
  border: 1px solid #efefef;
  justify-content: center;
  align-items: center;
`;
//'localhost:8080/orders/parcels/567257542471'
const DeliveryResult = () => {
  const { data, isLoading, error } = useCustomQuery(
    `/orders/parcels/567257542471`,
    `/orders/parcels/567257542471`,
  );

  if (isLoading) return <></>;
  if (error) return <></>;
  return (
    <GridContainer>
      <GridBox>단계</GridBox>
      <GridBox>처리</GridBox> <GridBox>상품상태</GridBox>
      <GridBox>담당 정소</GridBox>
      {data.map((el: any, index: number) => {
        return (
          <>
            <GridBox key={index}>{el.step}</GridBox>
            <GridBox>{el.dateTime}</GridBox> <GridBox>{el.status}</GridBox>
            <GridBox>{el.branch}</GridBox>
          </>
        );
      })}
    </GridContainer>
  );
};

export default DeliveryResult;
