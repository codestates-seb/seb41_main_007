import Editor from '../../Components/Editor/Editor';
import { Descendant } from 'Types/slate';

import styles from './Styles/index.module.css';
import classNames from 'classnames/bind';
import { useState, useCallback, useEffect } from 'react';

import produce from 'immer';
import { Node } from 'slate';

import { Plus, Checked } from './svg';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

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
  failToSend: false,
  categorySelector: false,
};
interface ERROR {
  emptyTitle: boolean;
  emptyText: boolean;
  tooLongTitle: boolean;
  imageLimit: boolean;
  failToSend: boolean;
  categorySelector: boolean;
}

const cx = classNames.bind(styles);
export default function Page() {
  const { data, isLoading } = useCustomQuery('/categories', 'categories');
  const [value, setValue] = useState<Descendant[]>(INITIALVALUE);
  const [error, setError] = useState<ERROR>(INITIAL_ERROR);
  const [title, setTitle] = useState<string>('');
  const [categoryNum, setCategoryNum] = useState<number>(9999);

  const handlerError = useCallback(
    (
      type:
        | 'emptyTitle'
        | 'emptyText'
        | 'tooLongTitle'
        | 'imageLimit'
        | 'failToSend'
        | 'categorySelector',
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
    console.log(value);
    console.log(categoryNum);
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
    handlerError('categorySelector', categoryNum === 9999);
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
      type.includes('youtube');
    handlerError('emptyText', !emptyText);
  }, [title, value, handlerError, categoryNum]);

  useEffect(() => {
    checkError();
  }, [checkError]);

  if (isLoading) return <></>;
  return (
    <div className={styles.container}>
      <div className={styles.main_container}>
        <h2 className={styles.heading}>새로운글 작성</h2>
        <div className={styles.line} />
        <div className={styles.header}>
          <div className={styles.button_container}>
            {data.map((category: any) => {
              return (
                <button
                  onClick={() => {
                    setCategoryNum(category.categoryId);
                  }}
                  className={cx('tag_button', {
                    tag_button_checked: categoryNum === category.categoryId,
                  })}
                  key={category.categoryId}
                >
                  {categoryNum === category.categoryId ? (
                    <>
                      <Checked />
                      <span style={{ marginLeft: 12 }}>{category.name}</span>
                    </>
                  ) : (
                    <>
                      <Plus />
                      <span style={{ marginLeft: 12 }}>{category.name}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles.title}>
          <input
            className={styles.title_input}
            value={title}
            placeholder="제목"
            onChange={(e) => handlerTilteChange(e.target.value)}
          />
          {title.length > 50 && (
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
        {(error.emptyText ||
          error.emptyTitle ||
          error.imageLimit ||
          error.tooLongTitle ||
          error.categorySelector) && <ErrorMessage error={error} />}
        <div className={styles.submit_wrapper}>
          <button
            disabled={
              error.emptyText ||
              error.emptyTitle ||
              error.imageLimit ||
              error.tooLongTitle ||
              error.categorySelector
            }
            className={cx('submit', {
              submit_disabled:
                error.emptyText ||
                error.emptyTitle ||
                error.imageLimit ||
                error.tooLongTitle ||
                error.categorySelector,
            })}
            onClick={handlerSubmit}
          >
            작성
          </button>
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ error }: { error: ERROR }) {
  return (
    <div className={styles.error_container}>
      <div className={styles.error_title}>
        상품 등록을 하기전에 확인하여 주세요.
      </div>
      <div className={styles.error_text_container}>
        {error.emptyTitle && (
          <div className={styles.error_text}>제목이 비어있습니다</div>
        )}
        {error.emptyText && (
          <div className={styles.error_text}>본문이 비어있습니다</div>
        )}
        {error.tooLongTitle && (
          <div className={styles.error_text}>
            제목은 50자를 넘지 말아주세요.
          </div>
        )}
        {error.failToSend && (
          <div className={styles.error_text}>글 작성 실패</div>
        )}
        {error.categorySelector && (
          <div className={styles.error_text}>카테고리를 선택하여 주세요 </div>
        )}
      </div>
    </div>
  );
}
