import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from 'Redux/reducer/modalSlice';

import { TYPE_CartData, TYPE_UrlProp } from 'Types/common/product';

const CheckAll = styled.div`
  border-bottom: 1px dotted var(--black-02);
  margin-bottom: 12px;
  padding-bottom: 12px;
`;

const CheckBox: React.FC<{
  data: TYPE_CartData[];
  onClickhandler: () => void;
  kakaoUrl: TYPE_UrlProp;
}> = ({ data, onClickhandler, kakaoUrl }) => {
  console.log(kakaoUrl, '한번 확인해봐');
  console.log(data);
  console.log(kakaoUrl.next_redirect_pc_url, '지금 보는것것');
  const [checkList, setCheckList] = useState<string[]>([]);
  const dispatch = useDispatch();

  const modalOpenHandler = (event: any) => {
    console.log('안녕');

    dispatch(openModal());
  };

  const handleCheck = (e: any) => {
    e.target.checked
      ? setCheckList([...checkList, e.target.name])
      : setCheckList(checkList.filter((el: any) => el !== e.target.name));
  };

  const checkAll = (e: any) => {
    e.target.checked ? setCheckList(['terms', 'privacy']) : setCheckList([]);
  };

  return (
    <>
      <CheckAll>
        <input
          type="checkbox"
          name="chackAll"
          onChange={checkAll}
          checked={checkList.length === 2 ? true : false}
        />
        &nbsp;&nbsp;아래 내용에 모두 동의합니다.
      </CheckAll>
      <div>
        <input
          type="checkbox"
          name="terms"
          onChange={handleCheck}
          checked={checkList.includes('terms') ? true : false}
        />
        <span className="agree">
          &nbsp;&nbsp;[필수] 주문하실 상품 및 결제, 주문정보 확인하였으며,
          <br /> 이에 동의합니다.
        </span>
      </div>
      <div className="mt-1">
        <input
          type="checkbox"
          name="privacy"
          onChange={handleCheck}
          checked={checkList.includes('privacy') ? true : false}
        />
        &nbsp;&nbsp;[필수] 개인정보 수집 이용 동의
      </div>
      {checkList.length === 2 ? (
        <button
          onClick={onClickhandler}
          className="bg-green-700 w-full h-14 text-white text-justify-center font-semibold mt-3"
        >
          결제하기
        </button>
      ) : (
        <button
          onClick={modalOpenHandler}
          className="bg-green-800 w-full h-14 text-white text-justify-center font-semibold mt-3"
        >
          결제하기
        </button>
      )}
    </>
  );
};
export default CheckBox;
