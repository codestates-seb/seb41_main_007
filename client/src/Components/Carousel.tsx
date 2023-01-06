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
      url: `https://cdn.pixabay.com/photo/2022/08/09/15/20/tractor-7375252_960_720.jpg`,
    },
    {
      url: `https://cdn.pixabay.com/photo/2013/08/28/00/54/field-176602_960_720.jpg`,
    },
    {
      url: `https://cdn.pixabay.com/photo/2013/11/21/17/06/tractor-215159_960_720.jpg`,
    },
  ];
  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </Carousel>
  );
};
