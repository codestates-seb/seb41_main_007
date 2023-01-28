import { FC, useEffect, useRef, useState } from 'react';
import styles from './Styles/TinyMobileHeader.module.css';
import { Link } from 'react-router-dom';

import Menu from './Menu';
import Input from './Input';
import ArrowBackIcon from './Icon/ArrowBackIcon';

const TinyMobileHeader: FC = () => {
  const Ref = useRef<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClickOutside(event: any) {
    if (Ref.current && !Ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const openHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.Tiny_MobileHeader_Container} ref={Ref}>
      <div className={styles.Tiny_MobileHeader_Contents_Container}>
        <button
          style={{ display: isOpen ? 'none' : 'block' }}
          className={styles.Tiny_MobileHeader_Input_SearchIcon}
          onClick={openHandler}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path d="m19.475 20.15-6.25-6.25q-.75.625-1.725.975-.975.35-1.95.35-2.425 0-4.087-1.663Q3.8 11.9 3.8 9.5q0-2.4 1.663-4.063 1.662-1.662 4.062-1.662 2.4 0 4.075 1.662Q15.275 7.1 15.275 9.5q0 1.05-.375 2.025-.375.975-.975 1.65L20.2 19.45ZM9.55 14.225q1.975 0 3.35-1.362Q14.275 11.5 14.275 9.5T12.9 6.137q-1.375-1.362-3.35-1.362-2 0-3.375 1.362Q4.8 7.5 4.8 9.5t1.375 3.363q1.375 1.362 3.375 1.362Z" />
          </svg>
        </button>
        <button
          onClick={openHandler}
          style={{
            display: isOpen ? 'block' : 'none',
            marginLeft: '20px',
            padding: '9px',
            backgroundColor: 'var(--green-30)',
          }}
        >
          <ArrowBackIcon />
        </button>
        <div style={{ display: isOpen ? 'block' : 'none' }}>
          <Input />
        </div>
        <div
          className={styles.Tiny_Mobile_Header_Logo_Container}
          style={{ display: isOpen ? 'none' : 'block' }}
        >
          <Link to="/">
            <img width={150} height={80} src={'/image/FarmPi.svg'} alt="LOGO" />
          </Link>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default TinyMobileHeader;
