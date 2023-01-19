import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import styled from 'styled-components';

interface useItemProps {
  url: string;
}

const Item = ({ url }: useItemProps) => {
  return (
    <>
      <Size>
        <Paper>
          <img src={url} alt="carousel"></img>
          {/* <Button>more info...</Button> */}
        </Paper>
      </Size>
    </>
  );
};
export const Size = styled.div`
  img {
    height: 500px;
    width: 100%;
  }
`;
export const Carousell = (props: any) => {
  const items = [
    {
      url: `https://cdn.pixabay.com/photo/2012/06/08/06/19/clouds-49520_960_720.jpg`,
    },
    {
      url: `https://cdn.pixabay.com/photo/2020/04/26/16/56/tractor-5096163_960_720.jpg`,
    },
    {
      url: `https://cdn.pixabay.com/photo/2018/08/21/17/26/korea-3621711_960_720.jpg`,
    },
  ];
  return (
    <div className="mx-80 px-32">
      <Carousel>
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </Carousel>
    </div>
  );
};
