import "./addFacilityToUser.css";
import {
  IFacilityToUser,
  IFacilityToUserProps,
} from "./addFacilityToUser.interface";
import { Checkbox } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";
import { ReactComponent as CheckedIcon } from "../../../../../assets/checkedcheckbox.svg";
import { ReactComponent as UncheckIcon } from "../../../../../assets/uncheckedcheckbox.svg";
import { ReactComponent as DisabledCheckedIcon } from "../../../../../assets/disabled-checked-checkbox.svg";

export const AddFacilityToUser = ({
  addBtnAction,
  cancelBtnAction,
  deselectAllBtnAction,
  facilities,
  handleChange,
  isAddBtnEnabled,
  showSelectAllBtn,
  selectAllBtnAction,
}: IFacilityToUserProps) => {
  return (
    <div className="add-facility-to-user-component">
      <p className="title" data-testid="add-facility-haeder">
        Add Facility
      </p>
      <Grid className="body">
        <>
          {facilities &&
            facilities.length > 0 &&
            facilities.map((facility: IFacilityToUser, index: number) => {
              return (
                <div
                  className={`facility-container${
                    index % 2 === 1 ? " gray" : ""
                  }`}
                  data-testid={facility.number?.toString()}
                >
                  <Grid className="facility-address" item xs={9}>
                    <div className="facility-address-div">
                      <Checkbox
                        checkedIcon={
                          facility.isOriginalSelected ? (
                            <DisabledCheckedIcon />
                          ) : (
                            <CheckedIcon />
                          )
                        }
                        checked={facility.isSelected}
                        classes={{ root: "selected-facility-checkbox" }}
                        data-testid={facility.number}
                        defaultChecked={false}
                        disabled={facility.isOriginalSelected}
                        icon={<UncheckIcon />}
                        onClick={(e) => handleChange(e, facility, index)}
                        value={facility.isSelected}
                      />
                      <div className="facility-address-details">
                        <p className="facility-name">
                          {makeCapitalEachWordInString(facility.facilityName)}
                        </p>
                        <p className="facility-address-value">{`${makeCapitalEachWordInString(
                          facility.address1
                        )}, ${
                          facility.address2
                            ? makeCapitalEachWordInString(facility.address2)
                            : ""
                        }`}</p>
                        <p className="facility-address-value">{`${makeCapitalEachWordInString(
                          facility.city
                        )}, ${facility.state} ${facility.zipCode}`}</p>
                      </div>
                    </div>
                  </Grid>
                  <Grid className="facility-siteUseId" item xs={3}>
                    <div className="facility-siteUseId-div">
                      <p className="facility-siteUseId-title">Facility ID: </p>
                      <p className="facility-siteUseId-value">
                        {facility.siteUseId}
                      </p>
                    </div>
                  </Grid>
                </div>
              );
            })}
        </>
        {showSelectAllBtn && (
          <Grid className="add-facility-select-deselect-div" item xs={6}>
            <Button className="select-all" onClick={selectAllBtnAction}>
              Select all
            </Button>
            <Button className="deselect-all" onClick={deselectAllBtnAction}>
              Deselect all
            </Button>
          </Grid>
        )}
      </Grid>
      <div className="add-facility-buttons">
        <Button
          className="cancelBtn"
          onClick={cancelBtnAction}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          className={`addBtn ${
            isAddBtnEnabled && showSelectAllBtn ? "enabled" : "disbaled"
          }`}
          disabled={!(isAddBtnEnabled && showSelectAllBtn)}
          onClick={addBtnAction}
          variant="contained"
        >
          Add Selected Facilities
        </Button>
      </div>
    </div>
  );
};
