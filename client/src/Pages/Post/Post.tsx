import { useState, useCallback, useEffect } from 'react';
import { produce } from 'immer';
import { Node } from 'slate';

import Editor from '../../Components/Editor/Editor';
import Empty from 'Components/Common/Empty';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import ImageForm from 'Components/Common/ImageForm';
import { Plus, Checked } from './svg';

import styles from './Styles/Post.module.css';
import classNames from 'classnames/bind';

import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { Descendant } from 'Types/slate';

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
  isDesc: false,
  imageLimit: false,
  failToSend: false,
  categorySelector: false,
  optionCreate: false,
  existImage: false,
};
interface ERROR {
  emptyTitle: boolean;
  emptyText: boolean;
  tooLongDesc: boolean;
  isDesc: boolean;
  imageLimit: boolean;
  failToSend: boolean;
  categorySelector: boolean;
  optionCreate: boolean;
  existImage: boolean;
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
  const [imageFile, setImageFile] = useState<any>('');
  const token = localStorage.getItem('access_token');
  if (!token) return <></>;
  const { mutate } = useCustomMutation(
    '/products',
    ['post', title],
    'POST',
    token,
  );

  const handlerError = useCallback(
    (
      type:
        | 'emptyTitle'
        | 'emptyText'
        | 'tooLongDesc'
        | 'imageLimit'
        | 'failToSend'
        | 'categorySelector'
        | 'isDesc'
        | 'optionCreate'
        | 'existImage',
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

  const handlerSubmit = () => {
    const submitValue = {
      name: title,
      price: price,
      brand: brand,
      photo: imageFile,
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
  };

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
    const emptyDesc = description.replace(
      /[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\u3164\uFEFF]/g,
      '',
    );
    handlerError('isDesc', !emptyDesc);
    handlerError('existImage', imageFile.length === 0);
    handlerError('optionCreate', option.length === 0);
    handlerError('categorySelector', categoryNum === 9999);
    handlerError('emptyTitle', !emptyTitle);
    handlerError('tooLongDesc', description.length > 20);
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
    option,
    imageFile,
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

  const optionsDelHandler = (id: number) => {
    setOption(option.filter((el: any) => el.id !== id));
  };

  if (isLoading) return <Empty />;

  return (
    <div className={styles.Container}>
      <div className={styles.main_container}>
        <h2 className={styles.heading}>새로운 상품글 작성</h2>
        <div className={styles.line} />
        <div className={styles.Contents_Container}>
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
        <div className={styles.Contents_Container}>
          <h2 className={styles.heading}>상품 이미지 등록하기 </h2>
          <ImageForm userImage={imageFile} setUserImage={setImageFile} />
        </div>
        <div className={styles.Contents_Container}>
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
            maxLength={10}
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
          {description.length > 20 && (
            <div
              className={cx('title_length', {
                title_length_error: description.length > 20,
              })}
            >
              {description.length} / 20
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
          error.optionCreate ||
          error.existImage ||
          error.categorySelector) && <ErrorMessage error={error} />}
        <div className={styles.submit_wrapper}>
          <button
            disabled={
              error.emptyText ||
              error.emptyTitle ||
              error.imageLimit ||
              error.tooLongDesc ||
              error.optionCreate ||
              error.existImage ||
              error.categorySelector
            }
            className={cx('submit', {
              submit_disabled:
                error.emptyText ||
                error.emptyTitle ||
                error.imageLimit ||
                error.tooLongDesc ||
                error.optionCreate ||
                error.existImage ||
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
            간단한 설명은 20자를 넘지 말아주세요.
          </div>
        )}
        {error.optionCreate && (
          <div className={styles.error_text}>옵션 상품을 만들어주세요</div>
        )}
        {error.failToSend && (
          <div className={styles.error_text}>글 작성 실패</div>
        )}
        {error.existImage && (
          <div className={styles.error_text}>
            등록 상품에 이미지가 존재하지않습니다.
          </div>
        )}
        {error.isDesc && (
          <div className={styles.error_text}>
            간단한 설명이 등록되어있지않습니다.
          </div>
        )}
        {error.categorySelector && (
          <div className={styles.error_text}>카테고리를 선택하여 주세요 </div>
        )}
      </div>
    </div>
  );
};
