import { FC } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const ARRAY = [0, 1, 2, 3, 4];

interface Props {
  handleStarClick: (index: number) => void;
  clicked: any;
}
const Rating: FC<Props> = ({ handleStarClick, clicked }) => {
  return (
    <Wrap>
      <RatingText>리뷰 평점</RatingText>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="30"
              onClick={() => handleStarClick(el)}
              className={clicked[el] ? 'yellowStar' : ''}
            />
          );
        })}
      </Stars>
    </Wrap>
  );
};

export default Rating;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
