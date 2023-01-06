import { FC } from 'react';
import Logo from './Logo';
import LoginRequiredButton from './LoginRequiredButton';
import LoggedInButton from './LoggedInButton';
import Input from './Input';
import './Styles/index.css';

const Header: FC = () => {
  let isUser = true;
  return (
    <header>
      <div className="Header_Container">
        <div className="Header_Contents_Container">
          <div className="Header_Logo_Container">
            <Logo width={200} height={200} />
          </div>
          <Input />
          {isUser ? <LoggedInButton /> : <LoginRequiredButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
