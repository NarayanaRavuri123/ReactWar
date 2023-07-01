export interface IProductsAndSolutionDetails {
  isLoading?: boolean;
  isTesting?: boolean;
  productsData?: IProductContent[];
  carouselData?: ICorouselImage[];
}

export interface IProductContent {
  allowOrder: string;
  allowSample: string;
  code: string;
  id: number;
  imageUrl: string;
  name: string;
  productType: string;
  productUrl: string;
  sku: string;
}

export interface ICorouselImage {
  order: number;
  text: string;
  buttonText: string;
  imageLink: string;
}
