import Editor from '../../Components/Editor/Editor';
import { Descendant } from 'Types/slate';

import styles from './Styles/index.module.css';
import classNames from 'classnames/bind';
import { useState, useCallback, useEffect } from 'react';

import { produce } from 'immer';
import { Node } from 'slate';

import { Plus, Checked } from './svg';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import Empty from 'Components/Common/Empty';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';

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
  const [description, setDescription] = useState<string>('');
  const [option, setOption] = useState<any[]>([]);
  const [optionPrice, setOptionPrice] = useState<any>(0);
  const [optionName, setOptionName] = useState<any>('');
  const [categoryNum, setCategoryNum] = useState<number>(9999);
  const [file, setFile] = useState<any>();

  const { mutate } = useCustomMutation('/products', ['post', title], 'POST');

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
      photo:
        'https://www.thegear.kr/news/photo/old/imgdata/thegear_co_kr/201901/2019012141158917.jpg',
      description: description,
      body: JSON.stringify(value),
      shippingCountry: 'KOREA',
      shippingMethod: 'PARCEL_SERVICE',
      shippingPrice: 3000,
      productCategoryPostDtos: [
        {
          categoryId: categoryNum,
        },
      ],
      productOptionPostDtos: option,
    };
    mutate(submitValue);
  }

  function handlerTilteChange(value: string) {
    setTitle(value);
  }

  const checkError = useCallback(() => {
    if (price || optionPrice) {
      if (price > 1000000 || optionPrice > 1000000) {
        setPrice(Math.floor(price / 10));
        setOptionPrice(Math.floor(optionPrice / 10));
      }
    }
    const type = value.map((n: any) => n.type);
    const emptyTitle = title.replace(
      /[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\u3164\uFEFF]/g,
      '',
    );
    handlerError('categorySelector', categoryNum === 9999);
    handlerError('emptyTitle', !emptyTitle);
    handlerError('tooLongDesc', description.length > 100);
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
  }, [
    title,
    description,
    value,
    handlerError,
    categoryNum,
    price,
    optionPrice,
  ]);

  useEffect(() => {
    checkError();
  }, [checkError]);

  const optionHandler = (e: any) => {
    if (optionPrice === 0 && optionName.length === 0) {
      return console.info('안되요');
    }
    const options = {
      id: Date.now(),
      productOptionName: optionName,
      price: optionPrice,
      stock: 10,
    };
    setOption([...option, options]);
    setOptionPrice(0);
    setOptionName('');
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/file/upload`, {
        method: 'POST',
        cache: 'no-cache',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const optionsDelHandler = (id: number) => {
    setOption(option.filter((el: any) => el.id !== id));
  };

  if (isLoading) return <Empty />;

  return (
    <div className={styles.container}>
      <div className={styles.main_container}>
        <h2 className={styles.heading}>새로운 상품글 작성</h2>
        <div className={styles.line} />
        <div className={styles.contentContainer}>
          <h2 className={styles.heading}>상품 정보 등록하기</h2>
          <div className={styles.content}>
            상품가격:
            <input
              type="number"
              value={price as number}
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
        <div className={styles.line} />
        <div className={styles.contentContainer}>
          <h2 className={styles.heading}>상품 이미지 등록하기 </h2>
          <div className={styles.content}>
            이미지:
            <input
              type="file"
              accept="image/svg, image/jpeg, image/png"
              onChange={fileHandler}
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
              value={optionPrice as number}
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
          <ul style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {option.length !== 0 &&
              option.map((el: any) => {
                return (
                  <li key={el.id} className={styles.OptionListContent}>
                    <div>이름:{el.productOptionName}</div>
                    <div>가격:{el.price}</div>
                    <button
                      className={styles.OptionListContentDel}
                      onClick={() => optionsDelHandler(el.id)}
                    >
                      삭제
                    </button>
                  </li>
                );
              })}
          </ul>
          <button
            className={styles.submit}
            style={{ marginTop: '10px' }}
            onClick={optionHandler}
          >
            옵션 만들기
          </button>
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
            value={description}
            placeholder="상품 간단한 설명을 적어주세요"
            onChange={(e) => setDescription(e.target.value)}
          />
          {description.length > 100 && (
            <div
              className={cx('title_length', {
                title_length_error: description.length > 100,
              })}
            >
              {description.length} / 100
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
