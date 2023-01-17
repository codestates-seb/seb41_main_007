import { FC } from 'react';
import styles from './Styles/Nav.module.css';
import { Link } from 'react-router-dom';

interface Category {
  categoryId: number;
  name: string;
  sequenceNum: number;
  createdAt: Date;
  modifiedAt: Date;
}

interface Props {
  categoryList: Category[];
}

const Nav: FC<{ category: Category }> = ({ category }) => {
  return <Link to={`/products/${category.categoryId}`}>{category.name}</Link>;
};

const NavList: FC<Props> = ({ categoryList }) => {
  return (
    <ul className={styles.Nav_Contents_Container}>
      {categoryList.map((el: Category) => {
        return (
          <li key={el.categoryId} className={styles.Nav_Content}>
            <Nav category={el} />
          </li>
        );
      })}
    </ul>
  );
};

export default NavList;
