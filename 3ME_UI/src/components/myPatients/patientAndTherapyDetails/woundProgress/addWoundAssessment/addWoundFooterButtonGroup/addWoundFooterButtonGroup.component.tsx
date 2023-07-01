import React, { useContext, useEffect, useState } from "react";
import { PersistentFooter } from "../../../../../../core/persistentFooter/persistentFooter.Component";
import { Box, Toolbar } from "@mui/material";
import { ExpressButton } from "../../../../../../core/expressButton/expressButton.component";
import "./addWoundFooterButtonGroup.css";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import {
  WoundAssessmentContext,
  WoundAssessmentContextType,
} from "../../../../../../context/WoundAssessmentContext";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { WoundAssessmentPageSection } from "../woundAssessmentPageSection.enum";
import { LoadingSpinner } from "../../../../../../core/loader/LoadingSpinner";
import { Popup } from "../../../../../../core/popup/popup.component";
import NewOrderErrorPopupMessage from "../../../../../newOrder/newOrderFooterGroup/newOrderErrorPopupMessage.component";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../../../../context/RolesPermissionContext";
import { ReusablePopUp } from "../../../../../../core/resuablePopup/reusablePopUp.component";
import { woundAssessmentAnalytics } from "../AddWoundAssessmentContainer/AddWoundAssessmentContainer.component";
import {
  AuthContext,
  AuthContextType,
} from "../../../../../../context/AuthContext";

type Props = {
  saveWoundAssessmentLoader: boolean;
  setSaveWoundAssessmentLoader: Function;
  errorMessage: string;
  errorFlag: boolean;
  callSaveWoundAssessmentOrder: Function;
  setErrorFlag: Function;
  openDeletePop?: any;
  deleteHandler: Function;
  previousHandler?: any;
};

const AddWoundFooterButtonGroup = ({
  saveWoundAssessmentLoader,
  setSaveWoundAssessmentLoader,
  errorMessage,
  errorFlag,
  callSaveWoundAssessmentOrder,
  setErrorFlag,
  openDeletePop = null,
  deleteHandler,
  previousHandler = null,
}: Props) => {
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const Validator = new AddWoundAssessmentValidator();
  const [validator] = React.useState<AddWoundAssessmentValidator>(Validator);
  const WoundAssessmentObj = useContext<WoundAssessmentContextType | null>(
    WoundAssessmentContext
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const [deleteOrderOpen, setDeleteOrderOpen] = useState(false);

  const reviewAssessmentClick = () => {
    if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM
    ) {
      let isValid = validator.validateAll(
        WoundAssessmentObj?.addWoundAssessment!,
        WoundAssessmentObj?.setAddWoundAssessment!
      );
      if (isValid === ValidationStatus.VALID) {
        woundAssessmentAnalytics(
          "Review_Wound_Assessment",
          authObj?.userProfile?.userID!,
          authObj?.registeredFaciltyAddress?.siteUseId!,
          permissionObj?.mappedRolesPermissionData.roleName!
        );
        WoundAssessmentObj?.setWoundAssessmentPageSection(
          WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW
        );
      }
    } else if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW
    ) {
      let isValid = validator.validateAllAttestationForm(
        WoundAssessmentObj?.woundAssessAttestation!,
        WoundAssessmentObj?.setWoundAssessAttestation!
      );
      if (
        permissionObj?.mappedRolesPermissionData.IsSalesRole ||
        permissionObj?.mappedRolesPermissionData.IsSalesManagerRole
      ) {
        if (isValid === ValidationStatus.VALID) {
          woundAssessmentAnalytics(
            "Submit_Wound_Assessment",
            authObj?.userProfile?.userID!,
            authObj?.registeredFaciltyAddress?.siteUseId!,
            permissionObj?.mappedRolesPermissionData.roleName!
          );
          setSaveWoundAssessmentLoader(true);
          callSaveWoundAssessmentOrder();
        }
      } else if (
        WoundAssessmentObj?.woundAssessAttestation._3MRepresentativeName
          .valid === ValidationStatus.VALID
      ) {
        woundAssessmentAnalytics(
          "Submit_Wound_Assessment",
          authObj?.userProfile?.userID!,
          authObj?.registeredFaciltyAddress?.siteUseId!,
          permissionObj?.mappedRolesPermissionData.roleName!
        );
        setSaveWoundAssessmentLoader(true);
        callSaveWoundAssessmentOrder();
      }
    }
  };

  const getMainButtonText = () => {
    if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM
    ) {
      return "Review Assessment";
    } else if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW
    ) {
      return "Submit Assessment";
    }
  };

  useEffect(() => {
    if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW
    ) {
      setDisableSubmitButton(true);
      setTimeout(() => {
        setDisableSubmitButton(false);
      }, 1000);
    }
  }, [WoundAssessmentObj?.woundAssessmentPageSection]);

  const saveWoundAssessmentSpinner = () => {
    return (
      <div>
        <div className="saveWoundAssess-header">Saving Wound Assessment</div>
        <div className="saveWoundAssess-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };
  const handlePrevious = () => {
    woundAssessmentAnalytics(
      "Previous",
      authObj?.userProfile?.userID!,
      authObj?.registeredFaciltyAddress?.siteUseId!,
      permissionObj?.mappedRolesPermissionData.roleName!
    );
    if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW
    ) {
      WoundAssessmentObj?.setWoundAssessmentProgress(50);
      WoundAssessmentObj?.setIsBackFromWoundPage(true);
      WoundAssessmentObj?.setWoundAssessmentPageSection(
        WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM
      );
    }
  };

  const handleDelete = () => {
    setDeleteOrderOpen(true);
  };

  const doNotDeleteHandler = () => {
    setDeleteOrderOpen(false);
  };

  return (
    <>
      <PersistentFooter>
        <Toolbar className="addWoundToolBar">
          <Box className="addWoundMaincontainer">
            <Box className="addWoundLeftContainer" flexWrap="wrap">
              <Box className="boxAddWoundStyle" p={1}>
                <ExpressButton
                  clickHandler={openDeletePop ? openDeletePop : handleDelete}
                  parentClass="deleteOrderClass"
                  testId="deleteOrderClass"
                  variant="text"
                  disabled={
                    permissionObj?.mappedRolesPermissionData?.IsSupportRole
                  }
                >
                  Delete
                </ExpressButton>
              </Box>
            </Box>
            {deleteOrderOpen ? (
              <ReusablePopUp
                openFlag={deleteOrderOpen}
                closeHandler={() => setDeleteOrderOpen(false)}
                firstButtonHandler={doNotDeleteHandler}
                secondButtonHandler={deleteHandler}
                firstButtonText="No, Do Not Delete"
                secondButtonText="Yes, Delete Assessment"
                title="Are you sure you want to delete this assessment?"
              />
            ) : null}

            <Box className="addWoundRightContainer" flexWrap="wrap">
              <Box className="boxAddWoundStyle" p={1}>
                {WoundAssessmentObj?.woundAssessmentPageSection ===
                  WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW && (
                  <ExpressButton
                    clickHandler={
                      previousHandler ? previousHandler : handlePrevious
                    }
                    parentClass="PreviosButton"
                    testId="prevOrderTest"
                    variant="outlined"
                    id="width"
                  >
                    Previous
                  </ExpressButton>
                )}
              </Box>
              <Box className="boxAddWoundStyle" p={1}>
                <ExpressButton
                  disabled={
                    WoundAssessmentObj
                      ? WoundAssessmentObj.errorInImgUploadFiles ||
                        WoundAssessmentObj.errorInDocUploadFiles ||
                        disableSubmitButton ||
                        permissionObj?.mappedRolesPermissionData?.IsSupportRole
                      : false
                  }
                  clickHandler={reviewAssessmentClick}
                  parentClass="reviewOrderClass"
                  testId="reviewOrderClass"
                  variant="contained"
                >
                  {getMainButtonText()}
                </ExpressButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </PersistentFooter>
      <Popup
        hideCloseButton={true}
        openFlag={saveWoundAssessmentLoader}
        closeHandler={() => {}}
      >
        {saveWoundAssessmentSpinner()}
      </Popup>
      <NewOrderErrorPopupMessage
        errorMessage={errorMessage}
        errorPopupFlag={errorFlag}
        handleBackButton={() => {
          setErrorFlag(false);
        }}
        handleExitButton={() => {
          setErrorFlag(false);
        }}
        popUpStyles=""
      />
    </>
  );
};

export default AddWoundFooterButtonGroup;
