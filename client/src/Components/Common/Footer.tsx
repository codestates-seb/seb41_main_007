import styled from 'styled-components';
import Select from './Select';
import { useState } from 'react';
import { banktype } from 'Types/common/product';
const Container = styled.div`
  width: 100%;
  z-index: 10;
  position: relative;
  height: 450px;
  background-color: #f4f4f4;
  border: 1px solid #e7e7e7;
  padding: 27px 0 150px 0;
  margin: 75px auto 0 auto;
  .selectbottom {
    margin-top: 30px;
  }
  margin-top: 75px;
  @media (max-width: 1260px) {
    min-width: 320px;
  }
  @media (max-width: 700px) {
    height: 800px;
  }
`;
const Main = styled.div`
  background-color: #ebebeb;
  height: 340px;
  display: flex;
  width: 1220px;
  padding: 25px 50px 50px 50px;
  margin: 0px auto;

  @media (max-width: 1260px) {
    min-width: 700px;
    width: 80%;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    height: 700px;
    width: auto;
    min-width: 320px;
    max-width: 470px;
  }
`;
const Client = styled.div`
  min-width: 310px;
  border-right: 1px solid #040404;
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
  @media (max-width: 700px) {
    margin: 0;
    padding-left: 0;
    padding-right: 0;
    width: 50%;
    min-width: 300px;
    width: auto;
    border-right: 0;
  }
`;
const Banking = styled.div`
  border-right: 1px solid #e1e1e1;
  padding-left: 40px;
  padding-right: 40px;
  min-width: 460px;
  margin: 0 auto;
  .banking__title {
    margin-top: 30px;
    border-bottom: 1px solid black;
  }

  @media (max-width: 1260px) {
    margin: 0 auto;
    border: 0;
    padding-right: 0px;
    width: 50%;
    min-width: 300px;
  }
  @media (max-width: 900px) {
  }
  @media (max-width: 700px) {
    border-top: 1px solid #ccc;
    margin: 50px; 0 0 0;
    padding-top:20px;
    padding-left: 0;
    padding-right: 0;
    width: 50%;
    min-width: 300px;
    width: auto;
  }
`;
const Change = styled.div`
  min-width: 360px;
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
  @media (max-width: 1260px) {
    display: none;
  }
`;

const Footer = () => {
  const people = {
    id: 1,
    name: 'NH농협',
    avatar:
      'data:image/png;base64,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',

    Bankaccount: '301-5868-4589-95',
    Bankname: '이유정(Farmpi)',
  };

  const [Bankdata, setBankdata] = useState<banktype>(people);

  return (
    <>
      <Container>
        <Main>
          <Client>
            <div className="selectbottom">
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
            </div>
            <button className="hover:bg-gray-500">
              상담문의/주문문의 게시판
            </button>
          </Client>
          <Banking>
            <div className="text-sm pb-1 banking__title">입금계좌 안내</div>
            <div className="text-sm mt-3 banking__name">
              <div className="flex">
                <img
                  src={Bankdata.avatar}
                  alt=""
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                />
                &nbsp;{Bankdata.name}&nbsp;/&nbsp;예금주:&nbsp;
                {Bankdata.Bankname}
              </div>
            </div>
            <div className="text-2xl">{Bankdata.Bankaccount}</div>
            <div className="flex-auto mt-3">
              <div className="mt-14 text-sm pb-1">입금은행</div>
              <div className="select">
                <Select setBankdata={setBankdata} />
              </div>
            </div>
          </Banking>
          <Change>
            <div className="change_container">
              <div className="selectbottom text-sm pb-1 change__title">
                교환/반품/배송안내
              </div>
              <div className="text-sm change__address">
                <div className="mt-4">교환 및 반품주소 -</div>
                <div className="font-semibold mb-2">
                  경상북도 경산시 진량읍 버티미길 1
                </div>
                <div className=" text-slate-500">
                  교환 및 반품을 하기위해 먼저 콜센터로 접수를 꼭 하시고 지정된
                  택배로 발송해주시기 바랍니다.
                </div>
              </div>
            </div>
            <button className=" hover:bg-gray-600">
              <a
                href="https://www.cjlogistics.com/ko/tool/parcel/tracking"
                target="_blank"
                rel="noreferrer"
              >
                배송조회 하기(CJ 대한통운 1588-1255)
              </a>
            </button>
          </Change>
        </Main>
      </Container>
    </>
  );
};
export default Footer;

//뺄지 물어볼것
