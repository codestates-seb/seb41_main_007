import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal } from 'Redux/reducer/modalSlice';
import axios from 'axios';

const CheckAll = styled.div`
  border-bottom: 1px dotted var(--black-02);
  margin-bottom: 12px;
  padding-bottom: 12px;
`;

const CheckBox: React.FC = () => {
  const [checkList, setCheckList] = useState<string[]>([]);
  const dispatch = useDispatch();

  const [seturl, setUrl] = useState<string>('');
  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/payment/ready?order_id=2`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.tid);
        console.log(response.data.next_redirect_pc_url);
        setUrl(response.data.next_redirect_pc_url);
        console.log(seturl);
      })
      .catch((e) => {
        console.info(e);
      });
  }, []);

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
        아래 내용에 모두 동의합니다.
      </CheckAll>
      <div>
        <input
          type="checkbox"
          name="terms"
          onChange={handleCheck}
          checked={checkList.includes('terms') ? true : false}
        />
        <span className="agree">
          [필수] 주문하실 상품 및 결제, 주문정보 확인하였으며,
          <br /> 이에 동의합니다.
        </span>
      </div>
      <div>
        <input
          type="checkbox"
          name="privacy"
          onChange={handleCheck}
          checked={checkList.includes('privacy') ? true : false}
        />
        [필수] 개인정보 수집 이용 동의
      </div>
      {checkList.length === 2 ? (
        <a href={seturl} target="_blank" rel="noreferrer">
          <button className="bg-green-700 w-full h-14 text-white text-justify-center font-semibold">
            결제하기
          </button>
        </a>
      ) : (
        <button
          onClick={modalOpenHandler}
          className="bg-green-800 w-full h-14 text-white text-justify-center font-semibold"
        >
          결제하기
        </button>
      )}
    </>
  );
};
export default CheckBox;
