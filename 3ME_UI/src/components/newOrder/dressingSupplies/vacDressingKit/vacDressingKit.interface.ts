export interface ProductSizeInformation {
  id: number;
  name: string;
  productCode: string;
  sku: string;
  packageType: string | null;
  packageQty: number | null;
}

export interface ProductInformation {
  productID: number;
  productName: string;
  productCode: string;
  sku: string;
  productType: number;
  productSequence: number;
  sizes: ProductSizeInformation[];
  hasMultipleSize: boolean | null;
}

export interface VacDressingKitModel {
  items: ProductInformation[];
}
