// common Function
export const getSupplyOrderSelectedVacProduct = (
  productCode: string,
  vacAllProducts: any
) => {
  let obj;
  vacAllProducts?.items.map((element: any) => {
    if (element.sku === productCode) {
      obj = element;
    } else if (element.sizes) {
      element.sizes.forEach((sa: any) => {
        if (sa.sku === productCode) {
          obj = element;
        }
      });
    }
  });
  return obj;
};
