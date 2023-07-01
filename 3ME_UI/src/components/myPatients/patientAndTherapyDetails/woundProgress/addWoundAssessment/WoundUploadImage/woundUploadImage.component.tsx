import "./woundUploadImage.css";
import { useContext, useEffect } from "react";
import {
  WoundAssessmentContextType,
  WoundAssessmentContext,
} from "../../../../../../context/WoundAssessmentContext";
import CustomDropZone from "../../../../../../core/customDropZone/customDropZone.component";

type Props = { isTestingComponent?: boolean };

const WoundUploadImages = ({ isTestingComponent = false }: Props) => {
  const WoundAssessmentObj = useContext<WoundAssessmentContextType | null>(
    WoundAssessmentContext
  );

  const allowedFiles = {
    "image/png": [".jpeg", ".gif", ".jpg", ".png"],
  };

  useEffect(() => {
    if (WoundAssessmentObj?.woundImagesUpload.some((file) => !file.succeeded)) {
      WoundAssessmentObj?.setErrorInImgUploadFiles(true);
    } else {
      WoundAssessmentObj?.setErrorInImgUploadFiles(false);
    }
  }, [
    WoundAssessmentObj?.woundImagesUpload,
    WoundAssessmentObj?.setDeletedWoundImagesDocuments,
  ]);

  useEffect(() => {
    if (
      WoundAssessmentObj?.deletedWoundImagesDocuments &&
      WoundAssessmentObj?.deletedWoundImagesDocuments.length > 0
    ) {
      WoundAssessmentObj?.setIsHandleChangeTriggered(true);
    }
    if (
      WoundAssessmentObj?.woundImagesUpload &&
      WoundAssessmentObj?.woundImagesUpload.filter(
        (x) => !x.documentId && x.succeeded !== false
      ).length > 0
    ) {
      WoundAssessmentObj?.setIsHandleChangeTriggered(true);
    }
  }, [
    WoundAssessmentObj?.woundImagesUpload,
    WoundAssessmentObj?.deletedWoundImagesDocuments,
  ]);

  return (
    <div className="newWoundImg">
      <div data-testid="wounduploadImage" className="uploadImgTxt">
        Provide Additional Information
      </div>
      <div data-testid="wounduploadImageTxt" className="uploadImgtxt">
        Please upload any additional wound photos or documentation
      </div>
      <div className="customdrop">
        <div data-testid="woundimage" className="uploadImg">
          Upload Wound Images
          <div data-testid="wounduploadImgTxt" className="uploadImgDesp">
            Wound images should be in one of the following formats: JPG, GIF,
            JPEG, or PNG. Each file cannot exceed 10 MB (10240 KB) in size.
            <CustomDropZone
              allowedFiles={allowedFiles}
              setData={WoundAssessmentObj?.setwoundImagesUpload}
              data={WoundAssessmentObj?.woundImagesUpload}
              deletedData={WoundAssessmentObj?.deletedWoundImagesDocuments}
              setDeletedData={
                WoundAssessmentObj?.setDeletedWoundImagesDocuments
              }
              dragDropText="Drag and drop images here to upload"
              buttonDropText="Select images to upload"
              dropZoneStyles="dropZoneStyles"
              dragAndDropStyles="dragAndDrop"
              uploadWidgetCard="uploadWidgetCard"
              uploadIconStyle="uploadIconStyle"
              listingType="newOrder"
              maxFileSize={10240000}
              singleFile={false}
              isTestingComponent={isTestingComponent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WoundUploadImages;
