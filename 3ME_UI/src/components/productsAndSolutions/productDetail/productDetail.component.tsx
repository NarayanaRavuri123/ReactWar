import React from "react";
import "./productDetail.css";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IProductContent } from "../productsAndSolutions.interface";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { getProductDetails } from "../../../util/productsManagerService";
import { MobileDisplayContext } from "../../../context/MobileDisplayContext";
import { Navigator } from "../../helpAndSupport/Navigator/navigator.component";
import { ProductProperties } from "./productProperties/productProperties.component";
import { Popup } from "../../../core/popup/popup.component";
import { SendNoteFailure } from "../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";

export const ProductDetail = () => {
  const history = useHistory();
  const location = useLocation();
  const productData: any = location.state;
  const selectedProduct: IProductContent = productData.product;

  const { isMobileScreen } = useContext(MobileDisplayContext);
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
  const [prodProps, setProdProps] = useState([]);
  const [openErrorPopUp, setOpenErrorPopUp] = useState<boolean>(false);

  const fetchProductDetail = async () => {
    const body = {
      productID: selectedProduct!.id.toString(),
      ClientType: "3ME",
    };
    setShowLoader(true);
    const response = await getProductDetails(body);
    if (!response || response.error) {
      setShowLoader(false);
      // show Error pop up.
      setOpenErrorPopUp(true);
      console.log("Error -- ", response.error);
    } else {
      setShowLoader(false);
      const productDetails = response.item?.productDetails;
      if (productDetails.length > 1) {
        setProdProps(productDetails);
      } else {
        setOpenErrorPopUp(true);
      }
    }
  };

  useEffect(() => {
    if (!selectedProduct) {
      history.push("/home");
    } else {
      fetchProductDetail();
    }
  }, [selectedProduct.id]);

  return (
    <>
      <Box className="product-detail-main-component">
        {showLoader ? (
          <div className="product-detail-loader">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="product-detail-component">
            <Navigator
              array={[
                {
                  route: "/productsAndSolutions",
                  pageName: "Products & Solutions",
                },
              ]}
              className="product-detail-route-section"
              title="Product Detail"
            />
            {prodProps.length > 0 ? (
              <ProductProperties
                prodProps={prodProps}
                selectedProduct={selectedProduct}
              />
            ) : (
              <div className="no-data" data-testid="no-data">
                No data present
              </div>
            )}
          </div>
        )}
      </Box>
      {openErrorPopUp && (
        <Popup
          closeHandler={() => setOpenErrorPopUp(false)}
          dialogParentClass="product-detail-failure-pop-up"
          openFlag={openErrorPopUp}
          hideCloseButton={true}
        >
          <div className="product-detail-failure-pop-up-div">
            <SendNoteFailure
              message="The request to display the product details has failed. Please try again or contact
        3M for assistance with this order 1-800-275-4524."
              backButtonAction={() => {
                history.goBack();
              }}
              rootClass="product-detail-failure-pop-up-component"
            />
          </div>
        </Popup>
      )}
    </>
  );
};
