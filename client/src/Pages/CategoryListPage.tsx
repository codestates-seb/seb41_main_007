import { FC } from 'react';
import Empty from 'Components/Common/Empty';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomTitle from 'Components/Header/CustomTitle';
import NotFoundPage from './NotFoundPage';
import { BGcontainer } from 'Components/Common/BGcontainer';
import CategoryList from 'Components/Common/CategoryList';
import ProductList from 'Components/Common/ProductList';
import Navigation from 'Components/Pagination/Navigation';

const ProductListPage: FC = () => {
  let { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const pageQuery = params.get('page');
  const queryKey = `categoryId${categoryId}page${pageQuery}`;
  const { isLoading, data, error } = useCustomQuery(
    pageQuery
      ? `/products?categoryId=${categoryId}&page=${pageQuery}`
      : `/products?categoryId=${categoryId}`,
    queryKey,
  );
  if (isLoading)
    return (
      <>
        <CustomTitle
          title={`${categoryId} 상품 리스트 | FarmPi`}
          description={`카테고리${categoryId}번 상품입니다`}
        />
        <BGcontainer></BGcontainer>
      </>
    );
  if (error || data.data.length === 0) return <NotFoundPage />;

  const { page, totalPages } = data.pageInfo;
  const handlerSetOffset = (page: number) => {
    window.scrollTo(0, 0);
    return navigate(`/products/${categoryId}?page=${page}`);
  };
  return (
    <BGcontainer>
      <CategoryList />
      <ProductList products={data.data} />
      <Navigation
        totalPage={totalPages}
        currentPage={page}
        callbackFunc={handlerSetOffset}
      />
    </BGcontainer>
  );
};

export default ProductListPage;
