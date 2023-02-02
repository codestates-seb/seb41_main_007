import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import styled from 'styled-components';

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
            <div className="object-none">
              <div className="absolute lg:inset-y-28 lg:left-72 sm:inset-y-28 sm:left-20 inset-y-4 left-20">
                {short}
              </div>
              <h1 className="absolute lg:inset-y-44 lg:left-72 lg:text-5xl sm:inset-y-44 sm:text-4xl sm:left-20  font-semibold inset-y-16 text-3xl left-20">
                {title}
              </h1>
              <p className="absolute lg:inset-y-64 lg:left-72 lg:text-2xl sm:inset-y-64 sm: text-xl sm:left-20 inset-y-32 left-20">
                {content}
              </p>
              <p className="absolute lg:inset-y-72 lg:left-72 lg:text-2xl sm:inset-y-72 sm:left-20 sm:text-xl inset-y-40 text-xl left-20">
                {content2}
              </p>
            </div>
            <div className="">
              <img src={url} alt="carousel" className={place}></img>
            </div>
          </div>
        </Paper>
      </Size>
    </>
  );
};
export const Size = styled.div`
  img {
    @media screen and (max-width: 760px) {
      height: 450px;
      padding-top: 190px;
    }
    @media screen and (min-width: 761px) {
      height: 450px;
    }
    height: 480px;
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
      url: `https://media1.giphy.com/media/QHsMhRci6hfSqerbXy/giphy.gif?cid=ecf05e47wmvdyj0vhzmk2imbnw66zm7wyykoysob6n3jc6ls&rid=giphy.gif&ct=g`,
      title: '농부들을 지지하는 팜피🐣',
      content: '농부들의 마음을 아는 팜피와',
      content2: '농사를 시작해보세요!',
      short: <Short3 />,
      back: 'background3',
      place: 'object-none sm:object-right lg:object-right lg:pr-60',
    },
    {
      url: '/image/carousel1.gif',
      title: '농자재 전문몰 FarmPi🌿',
      content: '신상품부터 베스트상품까지',
      content2: '지금 바로 부담없이 시작해보세요!',
      short: <Short1 />,
      back: 'background1',
      place:
        'object-none sm:object-right lg:object-right lg:pr-56 sm:left-0 pl-20',
    },
    {
      url: '/image/timer.gif',
      title: '지금 할인 중인 상품💸',
      content: '모든 전 상품의 할인 기회를',
      content2: '놓치지 마세요!',
      short: <Short2 />,
      back: 'background2',
      place:
        'object-none sm:object-right lg:object-right lg:pr-56 sm:left-0 pl-20',
    },
  ];
  return (
    <div className="mt-32">
      <Carousel interval={8000} animation={'slide'}>
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </Carousel>
    </div>
  );
};
