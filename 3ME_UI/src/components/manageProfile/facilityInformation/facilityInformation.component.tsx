import "./facilityInformation.css";
import { Typography } from "@mui/material";
import {
  ProfileFormContext,
  ProfileFormContextType,
} from "../../../context/ProfileFormContext";
import cross from "../../../assets/cross.svg";
import pluscircle from "../../../assets/pluscircle.svg";
import { ImgAddFacility } from "../manageProfile.style";
import { useContext, useEffect, useState } from "react";
import { Popup } from "../../../core/popup/popup.component";
import { Validator } from "../../../util/order.validations";
import { FacilityMode, IFacility } from "./facility.interface";
import { FacilityInfoDetail } from "./facilityInfoDetail.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { IFacilityInformationInterface } from "./facilityInformation.interface";
import { CustomDialog } from "../../../core/customDialog/customDialog.component";
import { AddFacilityContext } from "./addFacilityContainer/addFacilityContainer.context";
import { AddFacilityContainer } from "./addFacilityContainer/addFacilityContainer.component";

export const FacilityInformation = ({
  isRegistrationFlow = false,
  showtrash = false,
  facilityList = null,
}: IFacilityInformationInterface) => {
  const [faclitySelected, setFaclitySelected] = useState<IFacility | null>(
    null
  );
  const formObj = useContext<ProfileFormContextType | null>(ProfileFormContext);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // for test cases only
    if (facilityList !== null) {
      formObj?.setRegisteredFacility(facilityList);
    }
  }, [facilityList]);

  const openConfirmationBox = (rec: IFacility) => {
    setFaclitySelected(rec);
    setOpenConfirmation(true);
  };

  const handleClose = () => {
    setFaclitySelected(null);
    setOpenConfirmation(false);
  };

  const handleAddFacilityClick = () => {
    setOpen(true);
  };

  const compareValues = (x: string, y: string): boolean => {
    if (x !== undefined && x !== null && y !== undefined && y !== null) {
      return x.toLowerCase().trim() === y.toLowerCase().trim();
    } else {
      return false;
    }
  };

  const compareNumberValues = (x: number, y: number): boolean => {
    if (x !== undefined && x !== null && y !== undefined && y !== null) {
      return x === y;
    } else {
      return false;
    }
  };

  const addNewFacility = (newFacility: IFacility) => {
    const facilities = [...formObj?.registeredFacility];
    if (newFacility.facilityMode === FacilityMode.LINKED) {
      const index = facilities.findIndex(
        (rec) =>
          rec.addressId === newFacility?.addressId &&
          rec.accountId === newFacility?.accountId
      );
      if (index > -1) facilities.splice(index, 1);
    } else if (newFacility.facilityMode === FacilityMode.MANUAL) {
      const index = facilities.findIndex(
        (rec) =>
          compareValues(rec?.accountName, newFacility?.accountName) &&
          compareValues(rec?.address2, newFacility?.address2) &&
          compareValues(rec?.address1, newFacility?.address1) &&
          compareValues(rec?.city, newFacility?.city) &&
          compareValues(rec?.state, newFacility?.state) &&
          compareNumberValues(rec?.zip, newFacility?.zip) &&
          compareValues(rec?.typeCode, newFacility?.typeCode)
      );
      if (index > -1) facilities.splice(index, 1);
    }
    const updatedFacilityList = [newFacility, ...facilities];
    formObj?.setRegisteredFacility(updatedFacilityList);
    isRegistrationFlow
      ? formObj?.setTrashIconVisibility(true)
      : formObj?.setTrashIconVisibility(updatedFacilityList.length > 1);
    setOpen(false);
  };

  const removeAccessToFaclity = () => {
    setOpenConfirmation(false);
    const facilities = [...formObj?.registeredFacility];
    if (
      faclitySelected &&
      faclitySelected?.accountId !== null &&
      faclitySelected?.accountId !== ""
    ) {
      const index = facilities.findIndex(
        (rec) =>
          rec.addressId === faclitySelected?.addressId &&
          rec.accountId === faclitySelected?.accountId
      );
      facilities.splice(index, 1);
    } else {
      if (
        faclitySelected !== null &&
        (faclitySelected?.accountId === null ||
          faclitySelected?.accountId === "")
      ) {
        const index = facilities.findIndex(
          (rec) =>
            compareValues(rec?.accountName, faclitySelected?.accountName) &&
            compareValues(rec?.address2, faclitySelected?.address2) &&
            compareValues(rec?.address1, faclitySelected?.address1) &&
            compareValues(rec?.city, faclitySelected?.city) &&
            compareValues(rec?.state, faclitySelected?.state) &&
            compareNumberValues(rec?.zip, faclitySelected?.zip) &&
            compareValues(rec?.typeCode, faclitySelected?.typeCode)
        );
        facilities.splice(index, 1);
      }
    }

    formObj?.setRegisteredFacility(facilities);
    setFaclitySelected(null);
    isRegistrationFlow
      ? formObj?.setTrashIconVisibility(true)
      : formObj?.setTrashIconVisibility(facilities.length > 1);
  };

  const debounce = (fn: Function, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const removeFaclityDebounce = debounce(() => removeAccessToFaclity());

  return (
    <div className="all-facilities" data-testid="all-facilities">
      {formObj?.registeredFacility.length === 0 && (
        <h5
          className={
            formObj?.profileDetails.facilityRegistered?.valid ===
            ValidationStatus.INVALID
              ? "search-description-error"
              : "search-description"
          }
        >
          Use the search below to find your facility{" "}
          <span className="search-description-astrick">*</span>
        </h5>
      )}
      {formObj?.registeredFacility.map((rec: IFacility, index: number) => {
        return (
          <FacilityInfoDetail
            showTrash={showtrash}
            index={index}
            facilityInfo={rec}
            openConfirmationBox={openConfirmationBox}
            key={index}
          />
        );
      })}
      <div className="addfacility" onClick={handleAddFacilityClick}>
        <ImgAddFacility src={pluscircle} />
        <div className="addfacilitybuttontext">Add Facility</div>
      </div>
      <CustomDialog
        handleClose={handleClose}
        openConfirmation={openConfirmation}
        title={`Are you sure you want to remove ${faclitySelected?.accountName} ?`}
        closeIcon={cross}
        dailogPaper="dailogPaper"
        dailogClass="dailogClass"
        comfirmationTitle="comfirmationTitle"
        dialogCloseIcon="dialogCloseIcon"
        dialogTitleRoot="dialogTitleRoot"
        dialogTitle="dialogTitle"
        dialogContentRoot="dialogContentRoot"
        dialogContent="dialogContent"
      >
        <Typography
          classes={{ root: "confirmationTextRoot" }}
          className="confirmationText"
        >
          By taking this action, your facility access to{" "}
          {faclitySelected?.accountName} will be revoked, and all patients and
          permissions provided to you by this facility will be removed.
        </Typography>
        <div className="confirmBack" onClick={handleClose}>
          Back
        </div>
        <div className="confirmRemove" onClick={removeFaclityDebounce}>
          Remove access to this facility
        </div>
      </CustomDialog>
      <AddFacilityContext.Provider
        value={{
          closePopup: () => setOpen(false),
          facilitySearchValidator: new Validator(),
          addFacilityToList: addNewFacility,
        }}
      >
        <Popup
          dialogParentClass="add-facility-popup"
          openFlag={open}
          closeHandler={() => setOpen(false)}
        >
          <AddFacilityContainer />
        </Popup>
      </AddFacilityContext.Provider>
    </div>
  );
};
