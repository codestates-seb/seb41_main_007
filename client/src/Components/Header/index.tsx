import { FC } from 'react';
import Logo from './Logo';
import LoginRequiredButton from './LoginRequiredButton';
import LoggedInButton from './LoggedInButton';
import Input from './Input';
import './Styles/index.css';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  let isUser = true;
  return (
    <header>
      <div className="Header_Container">
        <div className="Header_Contents_Container">
          <div className="Header_Logo_Container">
            <Link to="/">
              <Logo width={290} height={290} />
            </Link>
          </div>
          <Input />
          {isUser ? <LoggedInButton /> : <LoginRequiredButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
