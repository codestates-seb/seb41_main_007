import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { FC, useEffect } from 'react';

const OauthTest: FC = () => {
  const { mutate } = useCustomMutation('/signup', 'test2', 'POST');
  // const { isLoading, data, error } = useCustomQuery(
  //   '/oauth2/authorization/google',
  //   'test',
  // );
  // if (isLoading) return <>로딩중</>;
  // if (error) return <>error발생</>;
  // console.log(data);

  return (
    <div>
      <button
        onClick={() =>
          (window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`)
        }
      >
        fetch api 전송
      </button>
    </div>
  );
};

export default OauthTest;
