import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import 'react-toastify/dist/ReactToastify.css';
import Empty from 'Components/Common/Empty';
import useScrollTop from 'CustomHook/useScrollTop';
import { BGcontainer } from 'Components/Common/BGcontainer';
import ProductMainBox from 'Components/ProductPage/ProductMainBox';
import ProductDetailBox from 'Components/ProductPage/productDetailBox';

const ProductContainer = styled.div`
  margin: 120px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ProductMenuTitle = styled.h2`
  font-size: var(--xlarge);
  font-weight: bold;
  padding: 30px;
`;

export interface counterProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

//1번 현재주소를 받아와야함
//2번 ?reurl= 현재주소 넣어줘야함
//3번 읽고 돌아와야함

const ProductPage: React.FC = () => {
  useScrollTop();
  let param = useParams(); //공부
  const { data, isLoading, error } = useCustomQuery(
    `/products/${param.productid}`,
    `products${param.productid}`,
  );

  if (isLoading) return <Empty />;
  if (error) return <></>;
  console.log(data);

  //리턴 url , 로컬스토리지에 담기
  return (
    <BGcontainer>
      <ProductContainer>
        <ProductMenuTitle></ProductMenuTitle>
        <ProductMainBox data={data}></ProductMainBox>
      </ProductContainer>

      <ProductDetailBox />
    </BGcontainer>
  );
};

export default ProductPage;

//버튼 후버기능 제거하기
//카운터 버튼 오류 안보이게 하기
// const notify = () => toast.info("toastify test!");
// // 성공 알람 ( 초록색 창 )
// const success = () => toast.success("Success!");
// // 실패 알람 ( 빨간색 창 )
// const error = () => toast.error("Error!");
// // 경고 알람 ( 노란색 창 )
// const warning = () => toast.warning("Warnning!");
// // 정보 알람
// const info = () => toast.info("Info...");
// toast
// 도트깨짐
