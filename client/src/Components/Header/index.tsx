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
    const localAccessToken = localStorage.getItem('access_token');
    if (localAccessToken) {
      const { exp } = tokenDecode(localAccessToken) as TYPE_Token;
      const tokenExpiration =
        Number(exp) - Math.floor(Date.now() / 1000) > 4000;
      if (!tokenExpiration) {
        const localRefreshToken = localStorage.getItem('refresh_token');
        fetch(`${process.env.REACT_APP_BACKEND_URL}/reissue`, {
          body: JSON.stringify({ refreshToken: localRefreshToken }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localAccessToken}`,
          },
          method: 'POST',
        })
          .then((res) => {
            return res.json();
          })
          .then(({ accessToken, refreshToken }) => {
            if (accessToken && refreshToken) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              localStorage.setItem('access_token', accessToken);
              localStorage.setItem('refresh_token', refreshToken);
            }
          })
          .catch((e) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
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
