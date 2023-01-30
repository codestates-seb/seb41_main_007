import { Descendant } from 'Types/slate';
import { useRef, useState } from 'react';

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
  commentId,
  setCancel,
  value: existingValue,
  setData,
}: {
  value: Descendant[];
  setCancel: () => void;
  setData: (value: Descendant[]) => void;
  commentId: number;
}) => {
  const [value, setValue] = useState<Descendant[]>(existingValue);
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

  async function handlerSubmit() {
    if (!!text(value)) {
      const newArray = value.map((item: any) => {
        const text = item.children[0].text;
        const match = text.match(
          /(http(s)?:\/\/)[\w-@:%._\+~#="'<>,?\/\[\]\{\}\(\)\~\`!$\^&\*]{2,}/gi,
        );
        if (match) {
          const newText = text.replace(
            /(http(s)?:\/\/)[\w-@:%._\+~#="'<>,?\/\[\]\{\}\(\)\~\`!$\^&\*]{2,}/gi,
            '2E1#$D^&S*$A74&-+1@AKMDJ38^7ASD*&%^QD3s@2E1#$D^&S*$A74&-+1@',
          );
          const newTextArray = newText.split('2E1#$D^&S*$A74&-+1@');
          const newChildren: any = [];
          for (let i = 0; i < newTextArray.length; i++) {
            let j = 0;
            let children: { text: string; link?: boolean } = { text: '' };
            if (newTextArray[i] === 'AKMDJ38^7ASD*&%^QD3s@') {
              newTextArray[i] = match[j];
              children.link = true;
              j++;
            }
            children.text = newTextArray[i];
            newChildren.push(children);
          }
          const newItem = { ...item, children: newChildren };
          return newItem;
        }
        return item;
      });
      const length = newArray.map((n) => Node.string(n)).join('').length;
      const reCommentData = {
        commentId: commentId,
        value: newArray,
        length: length,
      };
      // const { data } = await mutateFunction({
      //   variables: { data: reCommentData },
      // });
      //   if (data.uploadReComment) {
      setData(value);
      setCancel();
      //   }
    }
  }
  return (
    <div className={styles.comment_container}>
      <div className={styles.comment_input_rest}>
        <div className={styles.comment_input}>
          <CommentEditor
            value={value}
            setValue={(value) => setValue(value)}
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
            {/* {loading ? <Loading width={18} /> : <span>修正</span>} */}
          </button>
        </div>
      </div>
    </div>
  );
};