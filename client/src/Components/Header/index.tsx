import { FC } from 'react';
import Logo from './Logo';
import './Styles/index.css';

const Header: FC = () => {
  return (
    <header>
      <div className="Header_Container">
        <div className="Header_Contents_Container">
          <div className="Header_Logo_Container">
            <Logo width={200} height={200} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
