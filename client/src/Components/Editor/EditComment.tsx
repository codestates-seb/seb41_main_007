import { Descendant } from 'Types/slate';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

import styles from './Styles/EditComment.module.css';
import classNames from 'classnames/bind';
import ReadOnlyComment from '../Editor/ReadOnlyComment';

import CommentEditor from './Comment';
import { Node } from 'slate';

const cx = classNames.bind(styles);

export interface EditCommentProps {
  value: Descendant[];
  session: any;
  setCancel: () => void;
  setData: (value: Descendant[]) => void;
  commentId: string;
}

export function SimpleReadOnlyComment({ data }: { data: any }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      {!open ? (
        <>
          <div className={styles.simple_wrapper}>
            <ReadOnlyComment data={data} />
          </div>
          <button onClick={() => setOpen(true)} className={styles.simple_open}>
            더보기
          </button>
        </>
      ) : (
        <>
          <div>
            <ReadOnlyComment data={data} />
          </div>
          <button onClick={() => setOpen(false)} className={styles.simple_open}>
            간단하게보기
          </button>
        </>
      )}
    </div>
  );
}

export const EditComment = ({
  setCancel,
  value,
  handlerSubmit,
  setReviewContentData,
}: {
  value: Descendant[];
  setCancel: () => void;
  handlerSubmit: () => void;
  setReviewContentData: Dispatch<SetStateAction<any[]>>;
}) => {
  // const [value, setValue] = useState<Descendant[]>(existingValue);
  const childRef = useRef<{ reset: () => void }>(null);
  const text = (value: any) => {
    return value
      .map((n: any) => Node.string(n))
      .join('')
      .replace(
        /[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\u3164\uFEFF]/g,
        '',
      );
  };

  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_input_rest}>
        <div className={styles.comment_input}>
          <CommentEditor
            value={value}
            setValue={(value) => setReviewContentData(value)}
            ref={childRef}
          />
        </div>
        <div className={styles.reply_button_container}>
          <button
            className={cx('reply_comment_input_cancel_button')}
            onClick={setCancel}
          >
            취소
          </button>
          <button
            className={cx('reply_comment_input_button', {
              reply_comment_input_button_sucess: !!text(value),
            })}
            onClick={handlerSubmit}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};
