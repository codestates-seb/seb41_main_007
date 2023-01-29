import CustomTitle from 'Components/Header/CustomTitle';
import { FC } from 'react';
import styles from './Styles/NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
  return (
    <>
      <CustomTitle
        title="페이지를 찾을수없습니다. | FarmPi"
        description={'페이지를 찾을수없습니다.'}
      />
      <div className={styles.NotFound_Container}>
        <img
          src="/image/404-error.png"
          alt="404Photo"
          className={styles.NotFound_Image}
        ></img>
        <div className={styles.NotFound_Description}>
          <div className={styles.NotFound_Title}>404 Not Found!</div>
          <div className={styles.NotFound_Buttons}>
            <Link className={styles.NotFound_Home_Button} to="/">
              홈으로
            </Link>
            <button
              className={styles.NotFound_Home_Button}
              onClick={() => window.history.back()}
            >
              이전 페이지로
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
