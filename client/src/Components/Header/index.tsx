import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import styles from './Styles/Header.module.css';
import TopColRight from './TopColRight';
import MobileHeader from './MobileHeader';
import TinyMobileHeader from './TinyMobileHeader';
import { tokenDecode } from 'Utils/commonFunction';
import { TYPE_Token } from 'Types/common/token';

const Header: FC = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const { exp } = tokenDecode(accessToken) as TYPE_Token;
      const tokenExpiration = Number(exp) - Math.floor(Date.now() / 1000) > 0;
      if (!tokenExpiration) {
        const refreshToken = localStorage.getItem('refresh_token');
        fetch('/reissue', {
          body: JSON.stringify({ refreshToken: refreshToken }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          method: 'POST',
        })
          .then((res) => res.json())
          .then((data) => {
            console.info(data);
          })
          .catch((e) => {
            console.error('token error' + e);
          });
      }
    }
  });
  return (
    <header>
      <div className={styles.Header_Container}>
        <TinyMobileHeader />
        <MobileHeader />
        <div className={styles.Header_Contents_Container}>
          <Input />
          <div className={styles.Header_Logo_Container}>
            <Link to="/">
              <img
                width={230}
                height={100}
                src={'/image/FarmPi.svg'}
                alt="LOGO"
              />
            </Link>
          </div>
          <TopColRight />
        </div>
      </div>
    </header>
  );
};

export default Header;
