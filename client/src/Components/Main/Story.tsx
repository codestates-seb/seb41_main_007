import { FC } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Styles/Story.module.css';
import ComponentModal from 'Components/Common/ComponentModal';
import useBooleanInput from 'CustomHook/useBooleaninput';

const Story: FC = () => {
  const [isControl, onisControl, setisControl] = useBooleanInput(true);

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
            onisControl();
          }}
        >
          {isControl ? (
            <></>
          ) : (
            <ComponentModal isButton={true} setValue={setisControl}>
              <div>
                방문해주셔서 감사합니다! <br></br>전 상품 10% 할인을
                진행중입니다💸<br></br>
              </div>
            </ComponentModal>
          )}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};
export default Story;
