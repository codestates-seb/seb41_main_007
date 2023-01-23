import styled from 'styled-components';
import Postcode from './Postcode';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RadiusButton from 'Components/Common/RadiusButton';
import type { UserProfile } from 'Components/Mypage/DeliverySave';
import TinyTitle from 'Components/Common/TinyTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormValue {
  name: string;
  addressname: string;
  phonenumber: string;
}

const User = styled.div`
  input {
    border: 1px solid #e5e5e5;
  }
`;
const AddressInput = styled.div``;

interface Props {
  children?: string;
  oncontrolCilck?: () => void;
  data?: UserProfile;
  onSave?: (name: string, value: string) => void;
}

const Address: React.FC<Props> = ({
  oncontrolCilck,
  data,
  onSave,
  children,
}) => {
  const numberoverAlram = () => toast.warning('11자리 이상은 불가합니다.');

  const numberAlram = () =>
    toast.warning('-를 제외하고 숫자만 입력해주세요', {
      position: 'top-right',

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const numberfullAlram = () =>
    toast.warning('11자리를 채워주세요', {
      position: 'top-right',

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const sucessAlram = () =>
    toast.success('저장되었습니다.', {
      position: 'top-right',

      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 12) {
      const { name, value } = e.target;

      onSave?.(name, value);
    } else {
      e.preventDefault();
      numberoverAlram();
    }
  };

  return (
    <>
      <User>
        <form>
          <TinyTitle>배송지명</TinyTitle>
          <input
            type="text"
            placeholder="배송지명"
            className="text-sm mr-2 w-5/12 h-8"
            name="addressname"
            value={data?.addressname}
            onChange={onChangeForm}
            maxLength={5}
          ></input>

          <TinyTitle>받는 분 정보</TinyTitle>
          <div className="mb-5">
            <input
              type="text"
              placeholder="이름"
              className="text-sm mr-2 w-5/12 h-8 "
              maxLength={5}
              onChange={onChangeForm}
              value={data?.name}
              name="name"
            ></input>
            <input
              type="text"
              placeholder="휴대폰 번호"
              className="text-sm w-5/12 h-8 all: unset"
              onChange={onChangeForm}
              value={data?.phonenumber}
              maxLength={13}
              name="phonenumber"
            ></input>
          </div>
        </form>
      </User>
      <div>
        <div className="text-sm font-semibold mb-2">주소</div>
        <div className="bg-gray-50 py-2 text-xs mb-2 flex">
          <div className="text-lg mx-2">
            <FontAwesomeIcon icon={faCircleExclamation} />
          </div>
          <div className="text-sm text-gray-400 mt-1">
            상세주소가 없는 경우는 없음 으로 입력해 주세요.
          </div>
        </div>
        <Postcode onSave={onSave} data={data} />
      </div>
      <ToastContainer limit={4} hideProgressBar autoClose={1000} />

      <RadiusButton
        onClick={() => {
          if (data?.phonenumber && data?.phonenumber.length > 10) {
            sucessAlram();
            oncontrolCilck?.();
          } else if (data?.phonenumber && data?.phonenumber.length < 10)
            numberfullAlram();
          else {
            numberAlram();
          }
        }}
      >
        저장
      </RadiusButton>
    </>
  );
};
export default Address;

//유효성검사 안햇음
//input number 문제
//change 컨트롤
//is loading 문제 해결
//반응협 웹 css 디자인 만지기
