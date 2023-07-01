import "./productImages.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { IProductImages } from "./productImages.interface";

export const ProductImages = ({ productsData }: IProductImages) => {
  const [mainImage, setMainImage] = useState<any>([]);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const shuffleImages = (idx: number, prodDesctionTitle: any) => {
    setMainImage(
      allImages.filter((x: any) => x.productSectionTitle === prodDesctionTitle)
    );
    setThumbnailImages(
      allImages.filter((x: any) => x.productSectionTitle !== prodDesctionTitle)
    );
  };

  useEffect(() => {
    const onlyImages = productsData
      .filter((x: any) => x.productSectionType === "image")
      .sort((a: any, b: any) => a.productSectionOrder - b.productSectionOrder);
    setAllImages(onlyImages);
    setMainImage(onlyImages.filter((x: any, idx: number) => idx === 0));
    setThumbnailImages(onlyImages.filter((x: any, idx: number) => idx !== 0));
  }, [productsData]);

  return (
    <div data-testid="product-images-component">
      {mainImage.length > 0 && (
        <Box className="product-images">
          <Box className="product-main-image" data-testid="product-image">
            <img
              alt="treatment"
              className="product-image"
              src={mainImage && mainImage[0].productSectionBody}
            />
          </Box>
          {thumbnailImages.length > 0 && (
            <Box
              className="product-thumbnail-image"
              data-testid="product-thumbnail-images"
            >
              {thumbnailImages
                .sort(
                  (a: any, b: any) =>
                    a.productSectionOrder - b.productSectionOrder
                )
                .map(
                  (prop: any, idx: number) =>
                    idx < 4 && (
                      <img
                        aria-hidden="true"
                        alt="treatment"
                        className="thumbnail-image"
                        data-testid={`product-thumbnail-image-${idx + 1}`}
                        onClick={() => {
                          shuffleImages(idx, prop.productSectionTitle);
                        }}
                        src={prop.productSectionBody}
                      />
                    )
                )}
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};
