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
