export interface TYPE_Product {
  productId: number;
  name: string;
  price: number;
  photo: string;
  alt?: string;
  isNew: boolean;
  isBest: boolean;
}

export interface TYPE_PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface OnHandleModal {
  isOpenModal: boolean;
  onClickToggleModal: () => void;
}
// productOptionId: number;
// productOptionName: string;
// price: number;
// stock: number;

export interface TYPE_ProductOption {
  productOptionId: number;
  productOptionName: string;
  price: number;
  stock: number;
}

export interface TYPE_LocalOption {
  id: number;
  price: number;
  optionprice: number;
  optionname: string;
  count: number;
  productOptionId: number;
}

export interface counttype {
  id: number;
  price: number;
  count: number;
  optionprice: number;
  optionname: string;
  productOptionId: number;
}

export interface TYPE_CartData {
  cartId: number;
  createdAt: string;
  modifiedAt: string;
  photo: string;
  productId: number;
  productName: string;
  productOptionId: number;
  productOptionName: string;
  productOptionPrice: number;
  productPrice: number;
  quantity: number;
  shippingCountry: string;
  shippingMethod: string;
  shippingPrice: number;
  stock: number;
}
