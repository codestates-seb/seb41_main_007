import { FC } from 'react';
import styles from './Styles/Category.module.css';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
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

const CategoryList: FC<Props> = ({ categoryList }) => {
  return (
    <div className="relative w-72">
      <div className={styles.Category_Container}>
        <div className="fixed w-64">
          <strong className={styles.Category_Title}> 모든 상품</strong>
          <ul>
            {categoryList.map((category: Category) => (
              <li key={category.categoryId} className={styles.Category_Content}>
                <CategoryItem
                  categoryId={category.categoryId}
                  name={category.name}
                  sequenceNum={category.sequenceNum}
                  createdAt={category.createdAt}
                  modifiedAt={category.modifiedAt}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CategoryItem: FC<Category> = ({ categoryId, name }) => {
  return (
    <>
      <Link className={styles.Category_Name} to={`/products/${categoryId}`}>
        {name}
      </Link>
    </>
  );
};

const NavList: FC<Props> = ({ categoryList }) => {
  return (
    <div className={styles.Nav_Container}>
      <ul className={styles.Nav_Contents_Container}>
        {categoryList.map((category: Category) => {
          return (
            <li key={category.categoryId} className={styles.Nav_Content}>
              <CategoryItem
                categoryId={category.categoryId}
                name={category.name}
                sequenceNum={category.sequenceNum}
                createdAt={category.createdAt}
                modifiedAt={category.modifiedAt}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Category: FC = () => {
  const { data, isLoading, error } = useCustomQuery(
    '/categories',
    'categories',
  );
  if (isLoading) return <></>;
  if (error) return <></>;
  return (
    <>
      <CategoryList categoryList={data} />
      <NavList categoryList={data} />
    </>
  );
};
export default Category;
