import React from "react";
import SelectCloseIcon from "../../../../assets/selectclose.svg";
import GreenCheck from "../../../../assets/greenCheck.svg";
import RedCheck from "../../../../assets/redCheck.svg";

type Props = {
  data: any;
  onDelete: (file: File, key: any) => void;
};
const UploadPrescriptionList = ({data, onDelete}: Props) => {
  return (
    <div>
      <>
        {data &&
          data.length > 0 &&
          data.map((file: any, index: any) => {
            return (
              <div key={index} className="fileDetailCard">
                <div className="filename">{file.documentName}</div>
                <div className={`fileStatus${!file.succeeded ? `error` : ``}`}>
                  <img
                    style={{verticalAlign: "text-bottom", marginRight: "5px"}}
                    src={file.succeeded ? GreenCheck : RedCheck}
                    alt={GreenCheck}
                  />
                  {file.succeeded ? "Updated Successfully" : file.errorMessage}
                </div>
                <div
                  className="fileClose"
                  onClick={() => onDelete(file, index)}
                >
                  <img src={SelectCloseIcon} alt={SelectCloseIcon} />
                </div>
              </div>
            );
          })}
      </>
    </div>
  );
};

export default UploadPrescriptionList;
