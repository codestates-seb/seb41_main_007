import { FC, useState } from 'react';
import {
  useCustomFormMutation,
  useCustomMutation,
} from 'CustomHook/useCustomMutaiton';
import { EditComment } from 'Components/Editor/EditComment';
import { Descendant } from 'Types/slate';
import styles from './Styles/ReviewReEdit.module.css';
import Rating from './Rating';

interface Props {
  item: any;
  session: string | null;
  setEditmode: (param: boolean) => void;
}

const ReviewReEdit: FC<Props> = ({ session, item, setEditmode }) => {
  const queryKey = ['reviews', item];
  const [userImage, setUserImage] = useState<any>();

  const [reviewContentData, setReviewContentData] = useState<Descendant[]>(
    JSON.parse(item.reviewContent),
  );

  const [starClicked, setStarClicked] = useState<any>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const { mutate } = useCustomMutation(
    '/reviews',
    queryKey,
    'POST',
    session,
    true,
  );
  const { mutateAsync } = useCustomFormMutation('/file/upload', 'POST');

  const handleStarClick = (index: number) => {
    let clickStates = [...starClicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setStarClicked(clickStates);
  };

  const handleChangeFile = (e: any) => {
    if (e.target.files[0]) {
      mutateAsync(e.target.files[0])
        .then(({ imageUrls }) => {
          setUserImage(imageUrls);
        })
        .catch((e) => {
          console.info(e);
          setUserImage('');
        });
    }
  };

  const handlerSubmit = () => {
    let score = starClicked.filter(Boolean).length;
    const submitValue = {
      reviewId: Date.now(),
      reviewTitle: reviewTitle,
      reviewContent: JSON.stringify(reviewContentData),
      rating: score,
      reviewImage: userImage,
    };
    // const cache = queryClient.getQueryData(queryKey) as any;
    // if (cache) {
    //   console.log(cache);
    //   //중복제거
    //   // const newArr = Array.from(new Set(cache.pages.map(JSON.stringify))).map(
    //   //   JSON.parse as any,
    //   // );
    //   const cacheAdd = {
    //     result: [submitValue],
    //     nextPage: true,
    //     lastPage: false,
    //   };
    //   queryClient.setQueryData(queryKey, {
    //     pages: [cacheAdd, ...cache.pages],
    //     pageParams: { ...cache.pageParams },
    //   });
    // }
    // mutate(submitValue);
  };

  return (
    <>
      <div className={styles.comment_container}>
        <div className={styles.Image_Container}>
          <div className={styles.content}>
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
            <label className={styles.Label_Button} htmlFor="imageFile">
              이미지 선택
            </label>
            <input
              id="imageFile"
              type="file"
              accept="image/svg, image/jpeg, image/png"
              onChange={handleChangeFile}
              className={styles.ReviewImage}
            />
          </div>
        </div>
        <div className={styles.Review_Container}>
          <div className={styles.content}>
            <Rating handleStarClick={handleStarClick} clicked={starClicked} />
          </div>
          <div className={styles.content}>
            <input
              type="text"
              placeholder="리뷰제목을 입력해주세요"
              value={reviewTitle}
              className={styles.Input_Contents}
              style={{ width: '100%' }}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </div>
          <div className={styles.Comment_Input}>
            <EditComment
              value={JSON.parse(item.reviewContent)}
              commentId={item.reviewId}
              setCancel={() => setEditmode(false)}
              setData={(value: Descendant[]) => setReviewContentData(value)}
            />
          </div>
          <button
            className={styles.Comment_Input_Button}
            onClick={handlerSubmit}
          >
            등록
          </button>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
};

export default ReviewReEdit;
