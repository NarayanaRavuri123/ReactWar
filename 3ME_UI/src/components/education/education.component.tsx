import "./education.css";
import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CMS_EDUCATION } from "../../util/staticText";
import { getCMSContent } from "../../util/cmsService";
import { LoadingSpinner } from "../../core/loader/LoadingSpinner";
import { IEducationOption } from "./educationOption/educationOption.inteface";
import { EducationOption } from "./educationOption/educationOption.component";
import { MobileDisplayContext } from "../../context/MobileDisplayContext";

export const Education = () => {
  const history = useHistory();
  const [educationOptions, setEducationOptions] = useState<[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const getEducationsOptions = async () => {
    try {
      window.scrollTo(0, 0);
      const data = await getCMSContent(CMS_EDUCATION);
      if (data.items) {
        let options = data.items
          .filter((item: IEducationOption) => item !== null)
          .sort((a: IEducationOption, b: IEducationOption) =>
            a.resourceOrder > b.resourceOrder ? 1 : -1
          );
        setEducationOptions(options);
        setShowLoader(false);
      }
    } catch (error) {
      console.log("error", error);
      setShowLoader(false);
    }
  };

  const openVideoLibraryAction = () => {
    history.push("/education/videoLibrary");
  };

  useEffect(() => {
    getEducationsOptions();
  }, []);

  return (
    <div className="education-component">
      {showLoader ? (
        <div className="education-loader">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <h2 className="education-title" data-testid="education-title">
            Education
          </h2>
          <Grid
            className="education-grid-container"
            container
            data-testid="education-options"
            spacing={0}
          >
            {Array.isArray(educationOptions) &&
              educationOptions.map(
                (option: IEducationOption, index: number) => (
                  <Grid
                    className="education-grid-item"
                    item
                    xs={
                      index === 2
                        ? isMobileScreen
                          ? 10
                          : 6
                        : isMobileScreen
                        ? 10
                        : 6
                    }
                  >
                    <EducationOption
                      openVideoLibrary={openVideoLibraryAction}
                      option={option}
                    />
                  </Grid>
                )
              )}
          </Grid>
        </>
      )}
    </div>
  );
};
