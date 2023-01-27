import Editor from '../../Components/Editor/Editor';
import { Descendant } from 'Types/slate';

import styles from './Styles/index.module.css';
import classNames from 'classnames/bind';
import { useState, useCallback, useEffect } from 'react';

import produce from 'immer';
import { Node } from 'slate';

import { Plus, Checked } from './svg';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { useNumberComma } from 'Utils/commonFunction';
import Empty from 'Components/Common/Empty';

const INITIALVALUE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
const INITIAL_ERROR = {
  emptyTitle: false,
  emptyText: false,
  tooLongDesc: false,
  imageLimit: false,
  failToSend: false,
  categorySelector: false,
};
interface ERROR {
  emptyTitle: boolean;
  emptyText: boolean;
  tooLongDesc: boolean;
  imageLimit: boolean;
  failToSend: boolean;
  categorySelector: boolean;
}

const cx = classNames.bind(styles);
export default function Page() {
  const { data, isLoading } = useCustomQuery('/categories', 'categories');
  const [value, setValue] = useState<Descendant[]>(INITIALVALUE);
  const [error, setError] = useState<ERROR>(INITIAL_ERROR);
  const [price, setPrice] = useState<any>(0);
  const [brand, setBrand] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [option, setOption] = useState([]);
  const [optionPrice, setOptionPrice] = useState<any>(0);
  const [optionName, setOptionName] = useState<any>('');
  const [categoryNum, setCategoryNum] = useState<number>(9999);

  const handlerError = useCallback(
    (
      type:
        | 'emptyTitle'
        | 'emptyText'
        | 'tooLongDesc'
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
    const submitValue = {
      name: title,
      price: price,
      brand: brand,
      description: desc,
      body: value,
      shippingCountry: 'KOREA',
      shippingPrice: 3000,
      productCategoryPostDtos: [
        {
          categoryId: categoryNum,
        },
      ],
    };
    console.log(submitValue);
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
    if (price) {
      if (price > 1000000) {
        setPrice(Math.floor(price / 10));
      }
    }
    const type = value.map((n: any) => n.type);
    const emptyTitle = title.replace(
      /[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\u3164\uFEFF]/g,
      '',
    );
    handlerError('categorySelector', categoryNum === 9999);
    handlerError('emptyTitle', !emptyTitle);
    handlerError('tooLongDesc', desc.length > 100);
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
  }, [desc, value, handlerError, categoryNum, price]);

  useEffect(() => {
    checkError();
  }, [checkError]);

  if (isLoading) return <Empty />;
  return (
    <div className={styles.container}>
      <div className={styles.main_container}>
        <h2 className={styles.heading}>새로운 상품글 작성</h2>
        <div className={styles.line} />
        <div className={styles.contentContainer}>
          <h2 className={styles.heading}> 상품 정보</h2>
          <div className={styles.content}>
            상품가격:
            <input
              type="number"
              value={price}
              placeholder="가격을 입력해주세요"
              className={styles.inputContents}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.content}>
            브랜드:
            <input
              type="text"
              placeholder="브랜드를 입력해주세요"
              value={brand}
              className={styles.inputContents}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.line} />
          <h2 className={styles.heading}> 선택 상품 만들기</h2>
          <div className={styles.content}>
            상품가격:
            <input
              type="number"
              value={optionPrice}
              placeholder="가격을 입력해주세요"
              className={styles.inputContents}
              onChange={(e) => setOptionPrice(e.target.value)}
            />
          </div>
          <div className={styles.content}>
            상품이름:
            <input
              type="text"
              placeholder="상품이름을 입력해주세요"
              value={optionName}
              className={styles.inputContents}
              onChange={(e) => setOptionName(e.target.value)}
            />
          </div>
          <button> 옵션 만들기</button>
        </div>
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
            placeholder="상품명"
            onChange={(e) => handlerTilteChange(e.target.value)}
          />
        </div>

        <div className={styles.title}>
          <input
            className={styles.title_input}
            value={desc}
            placeholder="상품 간단한 설명을 적어주세요"
            onChange={(e) => setDesc(e.target.value)}
          />
          {desc.length > 100 && (
            <div
              className={cx('title_length', {
                title_length_error: desc.length > 100,
              })}
            >
              {desc.length} / 100
            </div>
          )}
        </div>
        <div className={styles.wrapper}>
          <Editor value={value} setValue={(value) => setValue(value)} />
        </div>
        {(error.emptyText ||
          error.emptyTitle ||
          error.imageLimit ||
          error.tooLongDesc ||
          error.categorySelector) && <ErrorMessage error={error} />}
        <div className={styles.submit_wrapper}>
          <button
            disabled={
              error.emptyText ||
              error.emptyTitle ||
              error.imageLimit ||
              error.tooLongDesc ||
              error.categorySelector
            }
            className={cx('submit', {
              submit_disabled:
                error.emptyText ||
                error.emptyTitle ||
                error.imageLimit ||
                error.tooLongDesc ||
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

const ErrorMessage = ({ error }: { error: ERROR }) => {
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
        {error.tooLongDesc && (
          <div className={styles.error_text}>
            간단한 설명은 100자를 넘지 말아주세요.
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
};
