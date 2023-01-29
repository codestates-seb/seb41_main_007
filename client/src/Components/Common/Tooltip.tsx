import styles from './Styles/Tooltip.module.css';
import classNames from 'classnames/bind';

import { CSSProperties, useState, useEffect } from 'react';

const cx = classNames.bind(styles);
interface IProps {
  delay?: number;
  content: string;
  direction?: 'bottom' | 'top' | 'left' | 'right';
  style?: CSSProperties;
  arrow?: boolean;
  children: JSX.Element;
}

const Tooltip = ({
  delay = 400,
  content,
  direction = 'top',
  style,
  arrow = false,
  children,
}: IProps) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState(false);
  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };
  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };
  useEffect(() => {
    return () => {
      clearInterval(timeout);
    };
  });
  return (
    <div
      style={style}
      className={styles.tooltip_wrapper}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={cx('tooltip_tip', direction, { arrow: arrow })}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
