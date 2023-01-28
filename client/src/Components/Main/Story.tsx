import { FC } from 'react';
import styled from 'styled-components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styles from './Styles/Story.module.css';
const Container = styled.div`
  margin: 40px auto 0 auto;
  width: 1220px;
  display: flex;
`;
const Story: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Container>
        <div className={styles.Story_Container}>
          <div className={styles.Story_Main_Container}>
            <div className={styles.Story_Title}>이야기</div>
            <div className={styles.Story_Content_Title}>
              FarmPi에서 농자재를 구입해야 하는 이유
            </div>
            <div className={styles.Story_Content_Content}>
              후회하지 않을 이유를 공개합니다.
            </div>
          </div>
        </div>
        <div className={styles.Story_Button}>
          <button
            onClick={() => {
              navigate('/basket');
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </Container>
    </div>
  );
};
export default Story;
