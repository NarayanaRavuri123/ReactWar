import { useContext, useState } from "react";
import "./facilitySettingsHeader.css";
import { Button, Grid } from "@mui/material";
import { updateFavouriteFacility } from "../../../../util/userService";
import { IFacilitySettingsHeader } from "./facilitySettingsHeader.interface";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { ReactComponent as FavouriteIcon } from "../../../../assets/Favourite.svg";
import { ReactComponent as AddFavouriteIcon } from "../../../../assets/NotFavourite.svg";
import { FavoriteType } from "../../../../sso/favouriteFacilityDisplay/favoriteFacilityDisplay.component";
import { Popup } from "../../../../core/popup/popup.component";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../../context/RolesPermissionContext";

export const FacilitySettingsHeader = ({
  selectedFacility,
  setSelectedFacility,
  userName,
}: IFacilitySettingsHeader) => {
  const [isFacilityFavourite, setIsFacilityFavourite] = useState(
    selectedFacility.isFavourite
  );

  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);

  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const updateFavFacility = async () => {
    setOpenLoaderPopUp(true);
    const response = await updateFavouriteFacility(
      userName,
      selectedFacility.siteUseId!,
      isFacilityFavourite
        ? FavoriteType.REMOVEFAVORITE
        : FavoriteType.ADDFAVORITE
    );
    if (response) {
      setOpenLoaderPopUp(false);
      selectedFacility.isFavourite = !isFacilityFavourite;
      setSelectedFacility(selectedFacility);
      setIsFacilityFavourite(!isFacilityFavourite);
    }
    setOpenLoaderPopUp(false);
  };

  return (
    <div
      className="facility-settings-header"
      data-testid="facility-settings-header"
    >
      <div className="facility-details">
        <h5 className="faciltiy-name" data-testid="faciltiy-name">
          {`${makeCapitalEachWordInString(selectedFacility.accountName)}`}&nbsp;
        </h5>
        <h5 className="faciltiy-id" data-testid="faciltiy-id">
          #{selectedFacility.accountNumber}
        </h5>
      </div>
      <h5
        className="facility-address-city-state-zip"
        data-testid="facility-address-city-state-zip"
      >
        {`${makeCapitalEachWordInString(selectedFacility.address1)}` +
          "," +
          " " +
          `${
            selectedFacility.address2
              ? makeCapitalEachWordInString(selectedFacility.address2) +
                "," +
                " "
              : ""
          }` +
          `${makeCapitalEachWordInString(selectedFacility.city) + "," + " "}` +
          `${selectedFacility.state}` +
          " " +
          `${selectedFacility.zip}`}
      </h5>
      <Grid
        className="facility-settings-header-grid-container"
        container
        spacing={2}
      >
        <Grid className="facility-settings-header-grid-item" item xs={3.5}>
          <div className="facility-setting-sub-header">
            <h5
              className="facility-setting-sub-header-title"
              data-testid="facility-classification-value"
            >
              Facility Classification
            </h5>
            <h5 className="facility-setting-sub-header-value">
              {makeCapitalEachWordInString(selectedFacility.typeName)}
            </h5>
          </div>
        </Grid>
        <Grid className="facility-settings-header-grid-item" item xs={3.5}>
          <div className="facility-setting-sub-header">
            <h5
              className="facility-setting-sub-header-title"
              data-testid="care setting"
            >
              Care Setting
            </h5>
            <h5
              className="facility-setting-sub-header-value"
              data-test="care setting-value"
            >
              {selectedFacility.careSetting === "EXTENDED"
                ? (selectedFacility.careSetting = "Long-term")
                : selectedFacility.careSetting}
            </h5>
          </div>
        </Grid>
      </Grid>
      <div className="favourite-facility">
        <Button
          classes={{
            root: permissionObj?.mappedRolesPermissionData.IsSupportRole
              ? "favourite-facility-button-disabled"
              : "favourite-facility-button",
          }}
          data-testid="favourite-button"
          onClick={updateFavFacility}
          startIcon={
            isFacilityFavourite ? <FavouriteIcon /> : <AddFavouriteIcon />
          }
          disabled={permissionObj?.mappedRolesPermissionData.IsSupportRole}
        >
          {isFacilityFavourite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </div>
      <Popup
        openFlag={openLoaderPopUp}
        closeHandler={() => setOpenLoaderPopUp(false)}
        dialogParentClass={"update-facility-type-loader-pop-up"}
        data-testid="loader-pop-up"
        hideCloseButton={true}
      >
        <div className="update-facility-type-loader">
          <LoadingSpinner />
        </div>
      </Popup>
    </div>
  );
};
