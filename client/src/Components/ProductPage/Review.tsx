import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Node } from 'slate';
import { produce } from 'immer';

import { Descendant } from 'Types/slate';

import Rating from './Rating';
import CommentEditor from '../Editor/Comment';
import { useSession } from 'CustomHook/useSession';
import { useCustomMutation } from 'CustomHook/useCustomMutaiton';

import ReviewList from './ReviewList';

import styles from './Styles/Review.module.css';
import { tokenDecode } from 'Utils/commonFunction';
import { TYPE_Token } from 'Types/common/token';
import ImageForm from 'Components/Common/ImageForm';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
interface Props {
  productId: string;
  session: string | null;
}

const INITIAL_ERROR = {
  emptyTitle: false,
  emptyText: false,
  failToSend: false,
};
interface ERROR {
  emptyTitle: boolean;
  emptyText: boolean;
  failToSend: boolean;
}

const ReviewEdit: FC<Props> = ({ productId, session }) => {
  const queryClient = useQueryClient();
  const queryKey = ['reviews', productId];
  const [error, setError] = useState<ERROR>(INITIAL_ERROR);
  const [userImage, setUserImage] = useState<any>('');
  const [starClicked, setStarClicked] = useState<any>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const childRef = useRef<{ reset: () => void }>(null);
  const { mutateAsync } = useCustomMutation(
    '/reviews',
    queryKey,
    'POST',
    session,
    true,
  );

  const handlerError = useCallback(
    (type: 'emptyTitle' | 'emptyText' | 'failToSend', boolean: boolean) => {
      setError(
        produce((draft) => {
          draft[type] = boolean;
        }),
      );
    },
    [],
  );

  if (!session)
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          리뷰를 작성하실려면 로그인이 필요합니다.
        </div>
        <div className={styles.line}></div>
      </>
    );

  const handleStarClick = (index: number) => {
    let clickStates = [...starClicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setStarClicked(clickStates);
  };

  const handlerSubmit = async () => {
    let score = starClicked.filter(Boolean).length;
    const { sub } = tokenDecode(session) as TYPE_Token;
    const submitValue = {
      reviewId: Date.now(),
      productId: parseInt(productId),
      reviewTitle: reviewTitle,
      reviewContent: JSON.stringify(value),
      rating: score,
      reviewImage: userImage,
      memberId: parseInt(sub),
      reviewCreatedAt: Date.now(),
    };
    const res = await mutateAsync(submitValue);
    const cache = queryClient.getQueryData(queryKey) as any;
    if (res && cache) {
      const cacheAdd = {
        result: [res],
        nextPage: true,
        lastPage: false,
      };
      queryClient.setQueryData(queryKey, {
        pages: [cacheAdd, ...cache.pages],
        pageParams: { ...cache.pageParams },
      });
      setStarClicked([false, false, false, false, false]);
      setReviewTitle('');
      setUserImage('');
      childRef.current?.reset();
    } else {
      toast.error('리뷰 등록 실패');
      handlerError('failToSend', true);
    }
  };

  const checkError = useCallback(() => {
    const emptyTitle = reviewTitle.replace(
      /[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\u3164\uFEFF]/g,
      '',
    );
    const emptyText = !!value
      .map((n: any) => Node.string(n))
      .join('')
      .replace(
        /[\u0020\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\u3164\uFEFF]/g,
        '',
      );
    handlerError('failToSend', false);
    handlerError('emptyTitle', !emptyTitle);
    handlerError('emptyText', !emptyText);
  }, [reviewTitle, value, handlerError]);

  useEffect(() => {
    checkError();
  }, [checkError]);

  return (
    <>
      <div className={styles.Main_Review_Container}>
        <ImageForm userImage={userImage} setUserImage={setUserImage} />
        <div className={styles.Review_Container}>
          <div className={styles.Content}>
            <Rating handleStarClick={handleStarClick} clicked={starClicked} />
          </div>
          <div className={styles.Content}>
            <input
              type="text"
              placeholder="리뷰제목을 입력해주세요"
              value={reviewTitle}
              className={styles.Input_Contents}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
            <ErrorContainer>
              {error.emptyTitle && (
                <ErrorMessage error={error.emptyTitle} type={'emptyTitle'} />
              )}
            </ErrorContainer>
          </div>
          <div className={styles.Comment_Input}>
            <CommentEditor
              value={value}
              setValue={(value: any) => setValue(value)}
              ref={childRef}
            />
          </div>
          <ErrorContainer>
            {error.emptyText && (
              <ErrorMessage error={error.emptyText} type={'emptyText'} />
            )}
          </ErrorContainer>
          <button
            onClick={handlerSubmit}
            disabled={error.emptyText || error.emptyTitle || error.failToSend}
            className={cx('Comment_Input_Button', {
              Comment_Input_Button_Disabled:
                error.emptyText || error.emptyTitle || error.failToSend,
            })}
          >
            등록
          </button>
          <ErrorContainer>
            {error.failToSend && (
              <ErrorMessage error={error.failToSend} type={'failToSend'} />
            )}
          </ErrorContainer>
        </div>
      </div>
      <div className={styles.line}></div>
    </>
  );
};

const Review: FC = () => {
  const { productid } = useParams();
  const { loading, session } = useSession();
  if (loading) return <></>;
  if (!productid) return <></>;

  return (
    <div>
      <ReviewEdit productId={productid} session={session} />
      <ReviewList productId={productid} session={session} />
    </div>
  );
};

const ErrorMessage = ({ error, type }: { error: boolean; type: string }) => {
  return (
    <>
      {type === 'emptyTitle' && error && (
        <div className={styles.Error_Text}>제목이 비어있습니다</div>
      )}
      {type === 'emptyText' && error && (
        <div className={styles.Error_Text}>본문이 비어있습니다</div>
      )}
      {type === 'failToSend' && error && (
        <div className={styles.Error_Text}>리뷰 작성 실패</div>
      )}
    </>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 5px;
  height: 14px;
`;
export default Review;
