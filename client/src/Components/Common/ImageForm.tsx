import { FC, useRef } from 'react';
import styles from './Styles/ImageForm.module.css';
import { pictureCreate } from 'Utils/api';

interface Props {
  setUserImage: (args: string) => void;
  userImage: any;
}
const ImageForm: FC<Props> = ({ userImage, setUserImage }) => {
  const ref = useRef<any>();
  const handleClick = (e: any) => {
    ref.current.click();
  };

  const handleChangeFile = async (e: any) => {
    if (e.target.files[0]) {
      const res = await pictureCreate('/file/upload', e.target.files[0]);
      if (res) {
        console.log(res.imageUrls);
        setUserImage(res.imageUrls);
        e.target.value = '';
      } else {
        setUserImage('');
        e.target.value = '';
      }
    }
  };

  return (
    <div className={styles.Image_Container}>
      <div className={styles.Content}>
        {userImage ? (
          <img
            width={200}
            height={200}
            src={userImage}
            alt="reviewImage"
            className={styles.Input_User_Image}
          />
        ) : (
          <div className={styles.Empty_Image}> </div>
        )}
        <button onClick={handleClick} className={styles.Label_Button}>
          이미지선택
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/svg, image/jpeg, image/png"
          onChange={handleChangeFile}
          className={styles.ReviewImage}
        />
      </div>
    </div>
  );
};

export default ImageForm;
