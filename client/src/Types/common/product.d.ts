export interface TYPE_Product {
  productId: number;
  name: string;
  price: number;
  photo: string;
  alt?: string;
  isNew: boolean;
  rating: number;
  isBest: boolean;
}

export interface TYPE_PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface TYPE_Member {
  memberId: number;
  name: string;
  birth: string | null;
  email: string | null;
  gender: string | null;
  phoneNumber: string | null;
}
export interface TYPE_Review {
  productId: number;
  reviewId: number;
  member: TYPE_Member;
  reviewTitle: string;
  reviewContent: string;
  reviewCreatedAt: string;
  rating: number;
  reviewImage: string;
  eviewLastModifiedAt: string;
}

export interface OnHandleModal {
  isOpenModal: boolean;
  onClickToggleModal: () => void;
}

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

export interface TYPE_People {
  address: TYPE_getAddress[];
  birth: string;
  email: string;
  gender: string;
  memberId: number;
  name: string;
  phoneNumber: string;
}

export interface TYPE_UserAddress {
  addressName: string;
  name: string;
  detailAddress: string;
  phoneNumber: string;
}

export interface TYPE_KakaoApi {
  productOptionId: number;
  quantity: number;
}
export interface TYPE_getAddress {
  addressId: number;
  addressName: string;
  name: string;
  detailAddress: string;
  phoneNumber: string;
}

export interface TYPE_UrlProp {
  next_redirect_pc_url: string;
  created_at: string;
  next_redirect_mobile_url: string;
  tid: string;
}

export interface TYPE_Total {
  productOptionPrice: number;
  quantity: number;
}

export interface banktype {
  id: number;
  name: string;
  avatar: string;
  Bankaccount: string;
  Bankname: string;
}

export interface TYPE_ReviewAll {
  createdAt: string;
  memberName: string;
  productId: number;
  rating: number;
  reviewContent: string;
  reviewId: number;
  reviewImage: string;
  reviewTitle: string;
}
