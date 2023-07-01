import "./productProperties.css";
import parse from "html-react-parser";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PlaceOrder } from "./placeOrder/placeOrder.component";
import { Popup } from "../../../../core/popup/popup.component";
import { IProductProperties } from "./productProperties.interface";
import { ProductImages } from "../productImages/productImages.component";
import { MobileDisplayContext } from "../../../../context/MobileDisplayContext";
import { getRelatedProductParameters } from "../../../../util/productsManagerService";

export const ProductProperties = ({
  prodProps,
  selectedProduct,
}: IProductProperties) => {
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const [relatedParameters, setRelatedParameters] = useState([]);
  const [relatedExudateLevel, setRelatedExudateLevel] = useState([]);
  const [openPlaceOrder, setOpenPlaceOrder] = useState<boolean>(false);
  const getRelatedProductParametersAttr = async (body: any) => {
    const responses = await getRelatedProductParameters(body);
    return responses;
  };

  useEffect(() => {
    if (selectedProduct) {
      const WoundCareGoalBody = {
        productID: selectedProduct.id.toString(),
        attributeCode: "PWCGO",
      };
      getRelatedProductParametersAttr(WoundCareGoalBody).then((result) => {
        setRelatedParameters(
          result.item.relatedProductParameter[0].parameterDesc
        );
      });
      const ExudateLevelBody = {
        productID: selectedProduct.id.toString(),
        attributeCode: "EXA",
      };
      getRelatedProductParametersAttr(ExudateLevelBody).then((result) => {
        setRelatedExudateLevel(
          result.item.relatedProductParameter[0].parameterDesc
        );
      });
    }
  }, [selectedProduct.id]);

  const buttonAction = (prop: any) => {
    switch (prop.productSectionTitle) {
      case "Place an Order":
        setOpenPlaceOrder(true);
        break;
      default:
        break;
    }
  };

  const displaySections = (prop: any) => (
    <>
      {prop.productTitleDisplay === "True" && (
        <div
          className="section-title-div-display-title"
          data-testid="section-title-div-display-title"
        >
          {parse(prop.productSectionTitle)}
        </div>
      )}
      {prop.productSectionType === "button" ? (
        <div className="section-button-div" data-testid="section-button-div">
          <a
            className="ancher-tag"
            href={selectedProduct!.productUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              variant="contained"
              classes={{
                root: "section-button",
              }}
              color="primary"
              data-testid="section-button"
            >
              <div
                className="section-button-body"
                data-testid="section-button-body"
              >
                {prop.productSectionBody}
              </div>
            </Button>
          </a>
        </div>
      ) : (
        <>
          {prop.productSectionBody !== "" && (
            <Box className="section-title-div" data-testid="section-title-body">
              <Typography
                classes={{
                  root: `${
                    prop.productSectionType !== ""
                      ? prop.productSectionType
                      : "section-title-div-display-title"
                  }`,
                }}
                data-testid="product-section-title"
              >
                {parse(prop.productSectionBody)}
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );

  const displayButtons = (prop: any) => (
    <Button
      variant="contained"
      classes={{
        root: "allow-button",
      }}
      color="primary"
      onClick={() => buttonAction(prop)}
      data-testid={prop.productSectionTitle}
    >
      {prop.productSectionTitle}
    </Button>
  );

  return (
    <Box
      className="product-properties-component"
      data-testid="product-properties-component"
    >
      {prodProps
        .sort((a: any, b: any) => a.productSectionOrder - b.productSectionOrder)
        .filter(
          (x: any) =>
            x.productSectionType === "tagline" ||
            x.productSectionType === "header"
        )
        .map((prop: any) => displaySections(prop))}
      <Box className="product-properties-column">
        <Box className="left-column" data-testid="left-column">
          <>
            {prodProps
              .filter(
                (x: any) =>
                  x.productSectionType !== "tagline" &&
                  x.productSectionType !== "header" &&
                  x.productSectionType !== "image" &&
                  x.productSectionType !== "Allow Order" &&
                  x.productSectionType !== "Allow Sample"
              )
              .sort(
                (a: any, b: any) =>
                  a.productSectionOrder - b.productSectionOrder
              )
              .map((prop: any) => displaySections(prop))}
          </>
        </Box>
        <Box className="right-column" data-testid="right-column">
          {prodProps.length > 0 && (
            <Box>
              <ProductImages productsData={prodProps} />
            </Box>
          )}
          <div className="button-div" data-testid="button-div">
            {prodProps
              .filter(
                (x: any) =>
                  x.productSectionType === "Allow Order" ||
                  x.productSectionType === "Allow Sample"
              )
              .sort(
                (a: any, b: any) =>
                  a.productSectionOrder - b.productSectionOrder
              )
              .map((prop: any) => displayButtons(prop))}
          </div>
          {(relatedExudateLevel.length > 0 || relatedParameters.length > 0) && (
            <Box
              className="related-product-main-container"
              data-testid="related-product-main-container"
            >
              {relatedParameters.length > 0 && (
                <Box
                  className="related-parameters-container"
                  data-testid="related-parameters-container"
                >
                  <Box>
                    <Typography
                      classes={{
                        root: "related-parameters-title",
                      }}
                      data-testid="related-parameters-title"
                    >
                      Primary wound care goal
                    </Typography>
                  </Box>
                  {relatedParameters.map((item: any, index: number) => (
                    <Box className="related-parameters-item-container">
                      <span className="related-parameters-item-check-icon">
                        <CheckIcon data-testid="related-parameters-item-check-icon" />
                      </span>
                      <Box>
                        <Typography
                          classes={{
                            root: "related-parameters-title-item",
                          }}
                          data-testid={`related-parameters-title-item-${
                            index + 1
                          }`}
                        >
                          {parse(item)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
              {relatedExudateLevel.length > 0 && (
                <Box
                  className="related-exudate-level-container"
                  data-testid="related-exudate-level-container"
                >
                  <Box>
                    <Typography
                      classes={{
                        root: "related-exudate-level-title",
                      }}
                      data-testid="related-exudate-level-title"
                    >
                      Wound exudate level
                    </Typography>
                  </Box>
                  {relatedExudateLevel.map((item: any, index: number) => (
                    <Box
                      className="related-exudate-level-item-container"
                      data-testid="related-exudate-level-item-container"
                    >
                      <span className="related-exudate-level-item-check-icon">
                        <CheckIcon data-testid="related-exudate-level-item-check-icon" />
                      </span>
                      <Box>
                        <Typography
                          classes={{
                            root: "related-exudate-level-title-item",
                          }}
                          data-testid={`related-exudate-level-item-title-${
                            index + 1
                          }`}
                        >
                          {parse(item)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
      {openPlaceOrder && (
        <Popup
          closeHandler={() => setOpenPlaceOrder(false)}
          dialogParentClass="place-order-pop-up"
          openFlag={openPlaceOrder}
        >
          <PlaceOrder product={selectedProduct} />
        </Popup>
      )}
    </Box>
  );
};
