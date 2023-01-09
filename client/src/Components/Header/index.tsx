import { FC } from 'react';
import Logo from './Logo';
import Button from './Button';
import Input from './Input';
import './Styles/index.css';

const Header: FC = () => {
  return (
    <header>
      <div className="Header_Container">
        <div className="Header_Contents_Container">
          <div className="Header_Logo_Container">
            <Logo width={200} height={200} />
          </div>
          <div className="Header_Input_Container">
            <Input />
          </div>
          <div className="Header_Button_Container">
            <Button />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
