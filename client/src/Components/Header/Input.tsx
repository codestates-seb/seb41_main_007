import { FC } from 'react';

import useInput from '../../CustomHook/useInput';

const Input: FC = () => {
  const [userFormInput, onChangeForm] = useInput('');
  return (
    <div>
      <form
        className="Header_Input_Container"
        action={'/production/search'}
        role="search"
        method="GET"
      >
        <input
          className="Header_Search_Input"
          placeholder="상품검색"
          value={userFormInput}
          onChange={onChangeForm}
        />
        <input type="hidden" name="q" value={userFormInput} />
        <button>
          <svg
            className="Header_Input_SearchIcon"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
          >
            <path d="m19.475 20.15-6.25-6.25q-.75.625-1.725.975-.975.35-1.95.35-2.425 0-4.087-1.663Q3.8 11.9 3.8 9.5q0-2.4 1.663-4.063 1.662-1.662 4.062-1.662 2.4 0 4.075 1.662Q15.275 7.1 15.275 9.5q0 1.05-.375 2.025-.375.975-.975 1.65L20.2 19.45ZM9.55 14.225q1.975 0 3.35-1.362Q14.275 11.5 14.275 9.5T12.9 6.137q-1.375-1.362-3.35-1.362-2 0-3.375 1.362Q4.8 7.5 4.8 9.5t1.375 3.363q1.375 1.362 3.375 1.362Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Input;
