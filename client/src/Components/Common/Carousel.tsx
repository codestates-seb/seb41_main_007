import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import styled from 'styled-components';
import styles from './Styles/Carousel.module.css';

interface useCarousel {
  timer: number;
  animation: string;
  timeout: number;
}
interface useItemProps {
  url: string;
  title: string;
  content: string;
  content2: string;
  short: any;
  back: string;
  place: string;
}

const Item = ({
  url,
  title,
  content,
  content2,
  short,
  back,
  place,
}: useItemProps) => {
  return (
    <>
      <Size>
        <Paper>
          <div className={back}>
            <div className="">
              <div className={styles.Carousel_Short}>{short}</div>
              <h1 className={styles.Carousel_Title}>{title}</h1>
              <p className={styles.Carousel_Content}>{content}</p>
              <p className={styles.Carousel_Content2}>{content2}</p>
            </div>
            <div className={styles.Carousel_Img_Container}>
              <img
                src={url}
                alt="carousel"
                className={styles.Carousel_Img}
              ></img>
            </div>
          </div>
        </Paper>
      </Size>
    </>
  );
};
export const Size = styled.div`
  img {
    height: 100%;
    width: 100%;
  }
  .background1 {
    background-color: #f1ece6;
  }
  .background2 {
    background-color: var(--gray-03);
  }
  .background3 {
    background-color: #f6e8d4;
  }
`;
const Short1 = () => {
  return (
    <div className="flex">
      <div className="bg-cyan-700 text-white w-36 h-9 pt-1 text-lg font-semibold text-center rounded-md mr-2">
        30% 쿠폰까지
      </div>
      <div className="bg-cyan-700 text-white w-16 h-9 pt-1 text-lg font-semibold text-center rounded-md">
        D-8
      </div>
    </div>
  );
};
const Short2 = () => {
  return (
    <>
      <div className="bg-orange-500 text-white w-36 h-9 pt-1 text-lg font-semibold text-center align-bottom rounded-md">
        매일 업데이트
      </div>
    </>
  );
};
const Short3 = () => {
  return (
    <div className="bg-red-600 text-white w-40 h-9 pt-1 text-lg font-semibold text-center rounded-md">
      <div>고민은 이제 그만!</div>
    </div>
  );
};
export const Carousell = (props: any) => {
  const items = [
    {
      url: '/image/carousel1.gif',
      title: '농자재 전문몰 FarmPi🌿',
      content: '신상품부터 베스트상품까지',
      content2: '지금 바로 부담없이 시작해보세요!',
      short: <Short1 />,
      back: 'background1',
      place:
        'object-none sm:object-left md:object-center lg:object-right lg:pr-72',
    },
    {
      url: '/image/timer.gif',
      title: '지금 할인 중인 상품💸',
      content: '모든 전 상품의 할인 기회를',
      content2: '놓치지 마세요!',
      short: <Short2 />,
      back: 'background2',
      place:
        'object-none sm:object-left md:object-center lg:object-right lg:pr-72',
    },
    {
      url: '/image/hand.gif',
      title: '농부들을 지지하는 팜피🐣',
      content: '농부들의 마음을 아는 팜피와',
      content2: '농사를 시작해보세요!',
      short: <Short3 />,
      back: 'background3',
      place:
        'object-none sm:object-left md:object-right xl:object-right xl:pr-64',
    },
  ];
  return (
    <div className="mt-32">
      <Carousel
        interval={900000000}
        animation={'slide'}
        className={styles.Carousel_Container}
      >
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </Carousel>
    </div>
  );
};
