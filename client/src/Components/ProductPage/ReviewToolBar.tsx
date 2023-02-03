import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import { Dispatch, FC, SetStateAction } from 'react';
import { useQueryClient } from 'react-query';

import styles from './Styles/ReviewToolBar.module.css';

import { TYPE_Review } from 'Types/common/product';
import { TYPE_Token } from 'Types/common/token';
import { tokenDecode } from 'Utils/commonFunction';

interface Props {
  setSelectedId: Dispatch<SetStateAction<number | undefined>>;
  setEditmode: () => void;
  session: string | null;
  reviewId: number;
  memberId: number;
  productId: number;
}

const ReviewToolBar: FC<Props> = ({
  setEditmode,
  session,
  setSelectedId,
  reviewId,
  memberId,
  productId,
}) => {
  const queryClient = useQueryClient();
  if (!session) return <></>;
  const { mutate } = useCustomMutation(
    `/reviews/${reviewId}`,
    ['ReviewsDelete', productId],
    'DELETE',
    session,
    true,
  );
  const queryKey = ['reviews', `${productId}`];
  const { sub } = tokenDecode(session) as TYPE_Token;
  const handlerSubmitDelete = async () => {
    setSelectedId(reviewId);
    const cache = queryClient.getQueryData(queryKey) as any;
    if (cache) {
      for (let i = 0; i < cache.pages.length; i++) {
        cache.pages[i].result = cache.pages[i].result.filter(
          (el: TYPE_Review) => el.reviewId !== reviewId,
        );
      }
    }
    mutate({ reviewId });
  };

  const handlerSubmitEdit = async () => {
    setSelectedId(reviewId);
    setEditmode();
  };

  return (
    <>
      {memberId === parseInt(sub) ? (
        <div>
          <button
            onMouseDown={handlerSubmitEdit}
            className={styles.ToolBarButton}
          >
            <Edit />
            <span>수정</span>
          </button>
          <button
            onMouseDown={handlerSubmitDelete}
            className={styles.ToolBarButton}
          >
            <Delete />
            <span>삭제</span>
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const Delete = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.48719 9.66667V19.2564M14.5898 9.66667V19.1111M11.5385 9.66667V19.2564M5.94445 19.1111C5.94445 20.15 6.79445 21 7.83334 21H15.3889C16.4278 21 17.2778 20.15 17.2778 19.1111V7.77777H5.94445V19.1111ZM18.5 5H15L14 3H9L8.48719 5H4.5H18.5Z"
        stroke="var(--black-10)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Edit = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3136 3.64355C17.4063 3.55077 17.5376 3.5 17.66 3.5C17.799 3.5 17.9181 3.54522 18.0164 3.64355L20.3564 5.98355C20.5512 6.17829 20.5512 6.49171 20.3564 6.68645L18.88 8.16289L15.8371 5.12L17.3136 3.64355ZM3.5 20.5V17.4571L14.06 6.89711L17.1029 9.94L6.54289 20.5H3.5Z"
        stroke="var(--black-10)"
      />
    </svg>
  );
};

export default ReviewToolBar;
