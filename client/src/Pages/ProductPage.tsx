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
import CategoryList from 'Components/Common/CategoryList';
import TabPanel from 'Components/Mypage/TabPanel';
import Review from 'Components/ProductPage/Review';

const ProductContainer = styled.div`
  margin: 120px auto 120px 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .select {
    min-width: 875px;
    width: 875px;
    margin-left: 42px;
    height: 50px;
    border-bottom: 1px solid var(--black-09);
  }
`;
const ProductMenuTitle = styled.h2`
  font-size: var(--xlarge);
  font-weight: bold;
  padding: 30px;
  margin-top: -50px;
`;

const TabButton = styled.button<{ isTrue?: boolean }>`
  ${(props) =>
    props.isTrue
      ? 'background: var(--greenlogo); color:white;'
      : 'background: white; color:black;'}
  font-weight: 400;
  width: 150px;
  height: 50px;
  line-height: 48px;
  font-size: var(--small);
  border-bottom: 1px solid var(--black-09);
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
  const [value, setValue] = useState<number>(0);

  useScrollTop();
  let param = useParams(); //공부
  const { data, isLoading, error } = useCustomQuery(
    `/products/${param.productid}`,
    `products${param.productid}`,
  );

  if (isLoading) return <Empty />;
  if (error) return <></>;
  if (data.length === 0) return <Empty />;

  //리턴 url , 로컬스토리지에 담기
  return (
    <BGcontainer>
      <CategoryList />
      <ProductContainer>
        <ProductMenuTitle />
        <ProductMainBox data={data}></ProductMainBox>
        <div className="mt-44">
          <div className="relative select border-solid border-b-2">
            <div className="absolute left-0 top-0">
              <TabButton isTrue={value === 0} onClick={() => setValue(0)}>
                제품 상세
              </TabButton>
              <TabButton isTrue={value === 1} onClick={() => setValue(1)}>
                리뷰 보기
              </TabButton>
            </div>
          </div>
          <TabPanel value={value} index={0}>
            <ProductDetailBox body={data.body} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Review />
          </TabPanel>
        </div>
      </ProductContainer>
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
//styled 컴퍼넌트 마지막  두개넣으려면; 차이
//로컬스토리지에서 카운터관리
//토스트 전역에 뿌려주기
