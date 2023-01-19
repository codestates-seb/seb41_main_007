import { FC } from 'react';
import styled from 'styled-components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Container = styled.div`
  margin-left: 450px;
  margin-top: 40px;
  display: flex;
  .main {
    width: 1145px;
  }
  .next {
    width: 75px;
    height: 160px;
    font-size: 32px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Story: FC = () => {
  return (
    <>
      <Container>
        <div className="border-4 border-green-700 py-6 flex justify-between pr-80 main">
          <div className="ml-8 ">
            <div className="bg-green-700 text-sm text-white mb-4 w-14 text-center rounded-xl">
              이야기
            </div>
            <div className="text-green-700 text-2xl font-semibold mb-2">
              FarmPi에서 농자재를 구입해야 하는 이유
            </div>
            <div className="text-green-700">
              후회하지 않을 이유를 공개합니다.
            </div>
          </div>
        </div>
        <div className="bg-green-700 next">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Container>
    </>
  );
};
export default Story;
