import { FC } from 'react';
import styled from 'styled-components';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styles from './Styles/Story.module.css';

const Story: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div className={styles.Story_BigContainer}>
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
        <button
          className={styles.Story_Button}
          onClick={() => {
            navigate(
              '/products/all?sort=likeCount&order=ascending&page=1&size=20',
            );
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};
export default Story;
