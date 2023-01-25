import Editor from '../../Components/Editor/Editor';
import { Descendant } from 'Types/slate';

import styles from './Styles/index.module.css';
import classNames from 'classnames/bind';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import produce from 'immer';
import { Node } from 'slate';

import { Plus, Checked } from './svg';

const INITIALVALUE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
const INITIAL_ERROR = {
  emptyTitle: false,
  emptyText: false,
  tooLongTitle: false,
  imageLimit: false,
  audioLimit: false,
  textLimit: false,
  failToSend: false,
};
interface ERROR {
  emptyTitle: boolean;
  emptyText: boolean;
  tooLongTitle: boolean;
  imageLimit: boolean;
  audioLimit: boolean;
  textLimit: boolean;
  failToSend: boolean;
}

const serialize = (value: any) => {
  return value.map((n: any) => Node.string(n)).join('\n');
};

const cx = classNames.bind(styles);
export default function Page() {
  let session = true;
  const [value, setValue] = useState<Descendant[]>(INITIALVALUE);
  const [error, setError] = useState<ERROR>(INITIAL_ERROR);
  const [title, setTitle] = useState<string>('');
  const [spoiler, setSpoiler] = useState<boolean>(false);
  const handlerError = useCallback(
    (
      type:
        | 'emptyTitle'
        | 'emptyText'
        | 'tooLongTitle'
        | 'imageLimit'
        | 'audioLimit'
        | 'textLimit'
        | 'failToSend',
      boolean: boolean,
    ) => {
      setError(
        produce((draft) => {
          draft[type] = boolean;
        }),
      );
    },
    [],
  );

  async function handlerSubmit() {
    if (session) {
      console.log(value);
      // const data = {
      //   value: value,
      //   serializedValue: serialize(value),
      // userId: session.user.id,
      // folderName: session.user.name + Date.now().toString(),
      //   title: title,
      //   tag: { spoiler: spoiler, notice: notice },
      // };
      // const res = await fetch(`${process.env.HOST}/backend/api/upload/post`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // const result = await res.json();
      return value;
    } else {
      return toast.error('ログインが必要です');
    }
  }

  function handlerTilteChange(value: string) {
    setTitle(value);
  }

  const checkError = useCallback(() => {
    const type = value.map((n: any) => n.type);
    const emptyTitle = title.replace(
      /[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\u3164\uFEFF]/g,
      '',
    );
    handlerError('emptyTitle', !emptyTitle);
    handlerError('tooLongTitle', title.length > 50);
    const emptyText =
      !!value
        .map((n: any) => Node.string(n))
        .join('')
        .replace(
          /[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\u3164\uFEFF]/g,
          '',
        ) ||
      type.includes('image') ||
      type.includes('audio') ||
      type.includes('video') ||
      type.includes('youtube');
    handlerError('emptyText', !emptyText);
    const imageLimit = type.filter((n) => n === 'image').length < 6;
    handlerError('imageLimit', !imageLimit);
    const audioLimit = type.filter((n) => n === 'audio').length < 4;
    handlerError('audioLimit', !audioLimit);
    const textLimit =
      new Blob([value.map((n: any) => Node.string(n)).join('\n')]).size <
      50000000;
    handlerError('textLimit', !textLimit);
  }, [title, value, handlerError]);
  useEffect(() => {
    checkError();
  }, [checkError]);
  return (
    <div className={styles.container} style={{ paddingTop: '100px' }}>
      <div className={styles.main_container}>
        <div className="heading">새로운글 작성</div>
        <div className={styles.line} />
        <div className={styles.header}>
          <div className={styles.button_container}>
            <button
              onClick={() => {
                setSpoiler((prev) => (prev = !prev));
              }}
              className={cx('tag_button', { tag_button_checked: spoiler })}
            >
              {spoiler ? (
                <>
                  <Checked />
                  <span style={{ marginLeft: 12 }}>ネタバレ</span>
                </>
              ) : (
                <>
                  <Plus />
                  <span style={{ marginLeft: 12 }}>ネタバレ</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className={styles.title}>
          <input
            className={styles.title_input}
            value={title}
            placeholder="제목"
            onChange={(e) => handlerTilteChange(e.target.value)}
          />
          {title.length > 30 && (
            <div
              className={cx('title_length', {
                title_length_error: title.length > 50,
              })}
            >
              {title.length} / 50
            </div>
          )}
        </div>
        <div className={styles.wrapper}>
          <Editor value={value} setValue={(value) => setValue(value)} />
        </div>
        {(error.audioLimit ||
          error.emptyText ||
          error.emptyTitle ||
          error.imageLimit ||
          error.textLimit ||
          error.tooLongTitle) && <ErrorMessage error={error} />}
        <div className={styles.submit_wrapper}>
          <button
            disabled={
              error.audioLimit ||
              error.emptyText ||
              error.emptyTitle ||
              error.imageLimit ||
              error.textLimit ||
              error.tooLongTitle
            }
            className={cx('submit', {
              submit_disabled:
                error.audioLimit ||
                error.emptyText ||
                error.emptyTitle ||
                error.imageLimit ||
                error.textLimit ||
                error.tooLongTitle,
            })}
            onClick={handlerSubmit}
          >
            작성
          </button>
        </div>
      </div>
      <div>
        <BeforePost />
      </div>
    </div>
  );
}

function BeforePost() {
  return (
    <div className={styles.rule_container}>
      <div className={styles.rule_title}>
        投稿を作成する前に確認してください
      </div>
      <div className={styles.rule_text}>
        みな人間であるということを忘れないでください
      </div>
      <div className={styles.rule_text}>権力を乱用しないでください</div>
      <div className={styles.rule_text}>尊重する言語を使用してください</div>
      <div className={styles.rule_text} style={{ border: 'none' }}>
        憎悪、差別、犯罪を助長する投稿は作ることはできません
      </div>
    </div>
  );
}

function ErrorMessage({ error }: { error: ERROR }) {
  return (
    <div className={styles.error_container}>
      <div className={styles.error_title}>投稿する前に確認してください</div>
      <div className={styles.error_text_container}>
        {error.emptyTitle && (
          <div className={styles.error_text}>タイトルが空いています</div>
        )}
        {error.emptyText && (
          <div className={styles.error_text}>本文が空いています</div>
        )}
        {error.tooLongTitle && (
          <div className={styles.error_text}>
            タイトルは30文字以下で書いてください
          </div>
        )}
        {error.imageLimit && (
          <div className={styles.error_text}>
            投稿には5枚を超える写真を含めることはできません
          </div>
        )}
        {error.audioLimit && (
          <div className={styles.error_text}>
            <div className={styles.error_in_text}>
              投稿には3個を超えるオーディオを含めることはできません
            </div>
          </div>
        )}
        {error.textLimit && (
          <div className={styles.error_text}>本文のテキストが多すぎます</div>
        )}
        {error.failToSend && (
          <div className={styles.error_text}>
            後でもう一度やり直してください
          </div>
        )}
      </div>
    </div>
  );
}
