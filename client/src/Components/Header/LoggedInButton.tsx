import { FC } from 'react';
import Menu from './Menu';
import './Styles/DropDown.css';

const LoggedInButton: FC = () => {
  return (
    <div className="Header_AuthDropDown_Container">
      <Menu />
    </div>
  );
};

export default LoggedInButton;
