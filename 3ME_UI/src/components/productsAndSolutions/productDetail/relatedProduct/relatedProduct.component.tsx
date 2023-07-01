import "./relatedProduct.css";
import {
  IRelateProduct,
  IRelateProductProps,
} from "./relatedProduct.interface";
import parse from "html-react-parser";
import { useHistory } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getLinkedProducts } from "../../../../util/productsManagerService";
import { MobileDisplayContext } from "../../../../context/MobileDisplayContext";

export const RelatedProduct = ({
  selectedProductID,
  selectedTreatmentcode,
}: IRelateProductProps) => {
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const history = useHistory();
  const [products, setProducts] = useState<IRelateProduct[]>([]);

  const clickOfProduct = (productID: string, productURL: string) => {
    history.push({
      pathname: "/productsAndSolutions/productDetail",
      state: {
        productId: productID,
        productUrl: productURL,
        treatmentcode: selectedTreatmentcode,
      },
    });
  };

  const createBody = (tCode: string) => {
    const body = {
      appKey: "WTG",
      treatmentCodes: [{ treatmentCode: tCode }],
    };
    return JSON.stringify(body);
  };

  useEffect(() => {
    const body = createBody(selectedTreatmentcode);
    getLinkedProducts(body).then((x) => {
      const sa = x.item.products.filter(
        (y: any) => y.productID !== selectedProductID
      );
      setProducts(sa);
    });
  }, [selectedProductID, selectedTreatmentcode]);

  return (
    <Box
      className="related-product-component"
      data-testid="related-product-component"
    >
      {products && products.length > 0 && (
        <Box className="related-products">
          <Box className="related-products-title-container">
            <Typography
              classes={{
                root: "related-products-title",
              }}
              data-testid="related-products-title"
            >
              Related 3M wound therapy products
            </Typography>
          </Box>
          <Grid className="related-products-grid-container" container>
            {products &&
              products.length > 0 &&
              products.map((prod: IRelateProduct, index: number) => (
                <Grid
                  className="related-products-grid-item"
                  item
                  xs={isMobileScreen ? 12 : 6}
                >
                  <Box
                    key={prod.productCode}
                    className="related-product-image-container"
                  >
                    <img
                      alt="treatment"
                      className="related-product-image"
                      data-testid={`related-product-image-${index + 1}`}
                      src={prod.productThumbnail}
                    />
                  </Box>
                  <Box className="related-product-description-container">
                    <Typography
                      classes={{
                        root: "related-product-description",
                      }}
                      data-testid={`related-products-description-${index + 1}`}
                      onClick={() =>
                        clickOfProduct(prod.productID, prod.productURL)
                      }
                    >
                      {prod.productDesc ? parse(prod.productDesc) : ""}
                    </Typography>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
