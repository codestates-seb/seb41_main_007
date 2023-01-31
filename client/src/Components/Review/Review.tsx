import styled from 'styled-components';
import Ratingstar from 'Components/Common/Ratingstar';
import styles from './Styles/Review.module.css';

const User = styled.div`
  display: flex;
  margin-top: 20px;
  p {
    display: block;
  }
`;

const Product = styled.div`
  margin-top: 8px;
`;
const products = [
  {
    id: 1,
    title: '집게 배송 빨리 왔습니다!',
    href: '#',
    product: '호박집게 10개 묶음',
    user: '이유정',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc: 'https://cdn.icon-icons.com/icons2/1875/PNG/512/user_120285.png',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    title: '튼튼할 줄 알았는데 살짝 약하네요 ㅠ',
    href: '#',
    product: '토마토 가지걸이',
    user: '황낙준',
    rating: '⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://contents.lotteon.com/itemimage/_v162045/LO/20/24/01/24/97/_2/02/40/12/49/8/LO2024012497_2024012498_1.jpg/dims/resizef/554X554',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    title: '배송 빨라서 너무 좋았습니다 재구매할게요',
    href: '#',
    product: '농업용 파이프',
    user: '서형민',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://shop1.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop1.daumcdn.net%2Fshophow%2Fp%2FB5102781522_5280738974.jpg%3Fut%3D20210521105903',

    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    title: '오~~ 조립식 온실하우스 튼튼하고 좋네요 !!@',
    href: '#',
    product: '대형 조립식 온실하우스',
    user: '김병수',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://shop3.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop3.daumcdn.net%2Fshophow%2Fp%2FC5092691977_530734376.jpg%3Fut%3D20200601230706',

    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    title: '재단비닐,,!!!! 가성비 좋은 것 같습니다!',
    href: '#',
    product: 'PE 재단비닐',
    user: '이현수',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://shop1.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop1.daumcdn.net%2Fshophow%2Fp%2FE5099828767_2551407568.jpg%3Fut%3D20201113150834',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 6,
    title: '감자 수확 파우치 공간 넉넉하네요 !',
    href: '#',
    product: '감자 수확 파우치',
    user: '김시영',
    rating: '⭐⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc: 'https://cdn.icon-icons.com/icons2/1875/PNG/512/user_120285.png',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
];

const Review: React.FC = () => {
  return (
    <div className={styles.Review_Container}>
      <div className={styles.Review_Content}>
        <h2 className={styles.Review_Title}>고객만족후기</h2>
        <div className={styles.Review_Data}>
          {products.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className={styles.Review_Detail_Content}
            >
              <div className={styles.Review_Image_Container}>
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className={styles.Review_Image_Content}
                />
              </div>
              <div>
                <h3 className={styles.Review_Product_Container}>
                  {product.title}
                </h3>
                <div className="">
                  <Product>
                    <p className={styles.Review_Product_Title}>
                      {product.product}
                    </p>
                  </Product>
                  <User>
                    <p className={styles.Review_User}>{product.user}</p>
                    <p className={styles.Review_Rating}>{product.rating}</p>
                    <p className={styles.Review_Date}>{product.date}</p>
                  </User>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Review;
