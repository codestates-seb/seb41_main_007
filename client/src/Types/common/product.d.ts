export interface TYPE_Product {
  productId: number;
  name: string;
  price: number;
  photo: string;
  alt?: string;
}

export interface TYPE_PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}