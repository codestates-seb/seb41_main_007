import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomQuery } from 'CustomHook/useCustomQuery';

import CustomTitle from 'Components/Header/CustomTitle';
import NotFoundPage from './NotFoundPage';
import { BGcontainer } from 'Components/Common/BGcontainer';
import ProductList from 'Components/Common/ProductList';

import Navigation from 'Components/Pagination/Navigation';
import CategoryList from 'Components/Common/CategoryList';
import SortBar from 'Components/Common/SortBar';

const AllProductsPage: FC = () => {
  const navigate = useNavigate();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const page = params.get('page');
  const sort = params.get('sort');
  const order = params.get('order');
  const size = params.get('size');
  const queryKey = [`productsAll`, page, sort, order, size];
  const { isLoading, data, error } = useCustomQuery(
    `/products?sort=${sort}&order=${order}&page=${page}&size=${size}`,
    queryKey,
  );

  if (isLoading)
    return (
      <>
        <BGcontainer>
          <CustomTitle title={`상품 리스트 | FarmPi`} />
          <CategoryList />
        </BGcontainer>
      </>
    );
  if (error) return <NotFoundPage />;

  const handlerSetOffset = (page: number) => {
    window.scrollTo(0, 0);
    return navigate(
      `/products/all?sort=${sort}&order=ascending&page=${page}&size=20`,
    );
  };

  return (
    <BGcontainer>
      <CategoryList />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CustomTitle
          title={`전체상품 | FarmPi`}
          description={` 전체 상품입니다`}
        />
        <SortBar />
        <ProductList products={data.data} />
        <Navigation
          totalPage={data.pageInfo.totalPages}
          currentPage={data.pageInfo.page}
          callbackFunc={handlerSetOffset}
        />
      </div>
    </BGcontainer>
  );
};

export default AllProductsPage;
