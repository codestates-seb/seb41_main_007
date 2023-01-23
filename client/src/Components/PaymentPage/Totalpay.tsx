import styled from 'styled-components';
const TotalContainer = styled.div`
  margin-top: 220px;
  margin-left: 40px;
  border-top: 2px solid black;
  position: sticky;
  top: 15%;
  .container {
    width: 360px;
    height: 360px;
  }
  .title {
    border-bottom: 1px solid var(--gray-20);
  }
`;
const Pay = styled.div`
  border-bottom: 1px solid var(--gray-20);
`;
const Agree = styled.div``;
const Totalpay: React.FC = () => {
  return (
    <>
      <div>
        <TotalContainer>
          <div className="container">
            <div className="title flex justify-between py-4">
              <span className="font-semibold">주문상품 정보 / 총 2개 </span>
              <span className="font-semibold text-sm text-gray-500">
                상세보기
              </span>
            </div>
            <Pay>
              <div className=" flex justify-between mt-6">
                <span className="text-sm text-gray-500">주문금액</span>
                <span className="font-semibold text-lg">109,200원</span>
              </div>
              <div className=" flex justify-between">
                <span className="text-sm text-gray-500">(+)배송비</span>
                <span className="font-semibold text-lg">무료</span>
              </div>
              <div className=" flex justify-between">
                <span className=" text-sm text-gray-500">(-)상품할인</span>
                <span className="font-semibold text-lg">11,400원</span>
              </div>
              <div className=" flex justify-between py-4">
                <span className="">총 결제 금액</span>
                <span className="font-semibold text-xl text-red-700">
                  97,800원
                </span>
              </div>
            </Pay>
            <Agree>
              <div className="text-sm text-gray-500 my-5">
                [필수] 주문하실 상품 및 결제, 주문정보 확인하였으며,
                <br /> 이에 동의합니다.
              </div>
              <button className="bg-green-800 w-full h-14 text-white text-justify-center font-semibold">
                결제하기
              </button>
            </Agree>
          </div>
        </TotalContainer>
      </div>
    </>
  );
};
export default Totalpay;
