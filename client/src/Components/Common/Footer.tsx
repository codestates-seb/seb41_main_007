import styled from 'styled-components';
import Select from './Select';
const Container = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f4f4f4;
  border: 1px solid #e7e7e7;
  padding: 27px 180px;
  .select {
    margin-top: 65px;
  }
  margin-top: 75px;
`;
const Main = styled.div`
  background-color: #ebebeb;
  height: 340px;
  display: flex;
  width: 1300px;
  padding: 50px 50px;
`;
const Client = styled.div`
  width: 490px;
  border-right: 1px solid #e1e1e1;
  padding-right: 47px;
  .client__title {
    border-bottom: 1px solid black;
  }
  button {
    background-color: black;
    color: white;
    width: 220px;
    height: 40px;
    margin-top: 30px;
    font-size: 13px;
  }
`;
const Banking = styled.div`
  border-right: 1px solid #e1e1e1;
  padding-left: 40px;
  padding-right: 40px;
  width: 790px;
  .banking__title {
    border-bottom: 1px solid black;
  }
`;
const Change = styled.div`
  padding-left: 40px;
  .change__title {
    border-bottom: 1px solid black;
  }
  button {
    background-color: black;
    color: white;
    width: 300px;
    height: 40px;
    margin-top: 50px;
    font-size: 13px;
  }
`;
const Footer = () => {
  return (
    <>
      <Container>
        <Main>
          <Client>
            <div className="text-sm pb-1 client__title">고객센터 안내</div>
            <div className="text-2xl py-2 client__number">053-853-5487</div>
            <div className="text-xs space-y-1 text-slate-500">
              <div className="">- 이메일 : fo_rdnang@naver.com</div>
              <div className="">- 팩스 : 053-587-4578</div>
              <div className="">- 평일 : 09:00 ~16:00</div>
              <div className="">
                - 상담시간 외 문의는 게시판을 이용해주세요 :)
              </div>
            </div>
            <button className="hover:bg-gray-500">
              상담문의/주문문의 게시판
            </button>
          </Client>
          <Banking>
            <div className="text-sm pb-1 banking__title">입금계좌 안내</div>
            <div className="text-sm mt-3 banking__name">
              {' '}
              NH농협/ 예금주: 팜피(FarmPi)
            </div>
            <div className="text-2xl">301-5868-4589-95</div>
            <div className="select">
              <Select />
            </div>
          </Banking>
          <Change>
            <div className="text-sm pb-1 change__title">교환/반품/배송안내</div>
            <div className="text-sm change__address">
              <div className="mt-4">교환 및 반품주소 -</div>
              <div className="font-semibold mb-2">
                경상북도 경산시 진량읍 버티미길 1
              </div>
              <div className=" text-slate-500">
                교환 및 반품을 하기위해 먼저 콜센터로 접수를 꼭 하시고 지정된
                택배로 발송해주시기 바랍니다.
              </div>
              <button className="hover:bg-gray-600">
                배송조회 하기(CJ 대한통운 1588-1255)
              </button>
            </div>
          </Change>
        </Main>
      </Container>
    </>
  );
};
export default Footer;
