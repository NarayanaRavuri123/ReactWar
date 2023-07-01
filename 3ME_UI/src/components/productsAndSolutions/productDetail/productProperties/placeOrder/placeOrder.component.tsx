import "./placeOrder.css";
import React, { useEffect } from "react";
import {
  AuthContext,
  AuthContextType,
} from "../../../../../context/AuthContext";
import { useContext, useState } from "react";
import {
  makeCapitalEachWordInString,
  useSortableTable,
} from "../../../../../util/utilityFunctions";
import { Grid, TextField } from "@mui/material";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../../../context/MyPatientContext";
import { IPlaceOrder } from "./placeOrder.interface";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../../../context/RolesPermissionContext";
import { PlaceOrderTable } from "./placeOrderTable.component";
import { Validator } from "../../../../../util/order.validations";
import { Popup } from "../../../../../core/popup/popup.component";
import { getFaciityPatients } from "../../../../../util/3meService";
import { IPatient } from "../../../../myPatients/patient.interface";
import { ReactComponent as SearchIconSvg } from "../../../../../assets/blackSearchIcon.svg";
import { AddPatientButton } from "../../../../myPatients/addPatientButton/addPatientButton.component";
import { AddPatientContext } from "../../../../myPatients/addPatientContainer/addPatientContainer.context";
import { AddPatientContainer } from "../../../../myPatients/addPatientContainer/addPatientContainer.component";

export const PlaceOrder = ({ product }: IPlaceOrder) => {
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const [patientSearchKeyWords, setPatientSearchKeyWords] =
    useState<string>("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [patientList, setPatientList] = React.useState<Array<IPatient>>();

  const columns = [
    { label: "", accessor: "orderID", sortable: false },
    { label: "Name", accessor: "lastName", sortable: true },
    { label: "Date of Birth", accessor: "dob", sortable: true },
    { label: "RO #", accessor: "roNumber", sortable: true },
  ];

  const [sortedData, setSortedData, handleSorting] = useSortableTable(
    [],
    columns
  );
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const handleAddPatient = () => {
    setOpen(true);
  };

  const handleSearchPatient = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let searchDataLocal = patientSearchKeyWords;
    const re = /^[a-zA-Z0-9-]+$/;
    let { value } = e.target;
    if (value === "" || re.test(value)) {
      searchDataLocal = value;
    }
    setPatientSearchKeyWords(searchDataLocal);
    if (searchDataLocal.length >= 3) doLocalSearchForPatient(searchDataLocal);
    else if (
      searchDataLocal.length === 0 &&
      patientSearchKeyWords !== searchDataLocal
    )
      doLocalSearchForPatient("");
  };

  const doLocalSearchForPatient = (searchParam: string) => {
    if (searchParam.length > 0 && patientList) {
      const filtedPatient = patientList.filter(
        (patient: IPatient) =>
          patient.lastName.toLowerCase().includes(searchParam.toLowerCase()) ||
          patient.firstName.toLowerCase().includes(searchParam.toLowerCase()) ||
          patient.roNumber.toString().includes(searchParam)
      );
      setSortedData(filtedPatient);
    } else {
      setSortedData(patientList);
    }
  };
  const loadPatientData = async (searchParam: string) => {
    try {
      const dt = await getFaciityPatients(
        authObj?.registeredFaciltyAddress?.siteUseId ??
          authObj?.userProfile?.facilities[0].siteUseId,
        authObj?.registeredFaciltyAddress?.careGiverId,
        authObj?.userProfile?.userName,
        true
      );
      const data = dt.data !== null ? (dt.data as Array<any>) : [];

      if (data!.length >= 0) {
        setPatientList(data);
        setSortedData(data);
        MyPatientObj?.setReloadMyPatient(false);
      }
    } catch (error) {
      console.log("error", error);
      setError(true);
      MyPatientObj?.setReloadMyPatient(false);
    }
  };
  useEffect(() => {
    MyPatientObj?.setReloadMyPatient(true);
  }, []);

  useEffect(() => {
    if (MyPatientObj?.reloadMyPatient) {
      loadPatientData("");
    }
  }, [MyPatientObj?.reloadMyPatient]);
  return (
    <>
      <div className="placeAnOrder-main-component">
        <div className="placeAnOrder-text-section">
          <h5 className="placeAnOrder-header" data-testid="placeAnOrder-header">
            Place an Order
          </h5>
          <div
            className="placeAnOrder-facility-details-section"
            data-testid="facility-address-city-state-zip"
          >
            {authObj && authObj.registeredFaciltyAddress
              ? `${makeCapitalEachWordInString(
                  authObj?.registeredFaciltyAddress?.accountName
                )}, ${makeCapitalEachWordInString(
                  authObj?.registeredFaciltyAddress?.address1
                )}, ${makeCapitalEachWordInString(
                  authObj?.registeredFaciltyAddress?.state
                )}, ${makeCapitalEachWordInString(
                  authObj?.registeredFaciltyAddress?.city
                )}, ${authObj?.registeredFaciltyAddress?.zip}`
              : ""}
          </div>
        </div>
        <div className="placeAnOrder-select-patient">
          <h5
            className="placeAnOrder-select-title"
            data-testid="placeAnOrder-select-title"
          >
            Select Patient
          </h5>
          <Grid className="placeAnOrder-container" container spacing={0}>
            <Grid className="placeAnOrder-grid-item" item xs={8}>
              <TextField
                autoComplete="off"
                data-testid="filter-patients"
                autoFocus={true}
                className="placeAnOrder-search-input"
                inputProps={{ style: { fontSize: 14 } }}
                placeholder="Filter by Name or RO#"
                InputProps={{
                  startAdornment: (
                    <SearchIconSvg style={{ marginRight: "5px" }} />
                  ),
                }}
                value={patientSearchKeyWords}
                onChange={handleSearchPatient}
                variant="outlined"
              />
            </Grid>
            <Grid className="placeAnOrder-grid-item-add-patient" item xs={2}>
              <div className="placeAnOrder-addPatientbutton">
                <AddPatientButton
                  isBtnVisible={true}
                  onClickHandler={handleAddPatient}
                  isBtnDisabled={
                    permissionObj?.mappedRolesPermissionData.IsSupportRole
                  }
                />
              </div>
            </Grid>
          </Grid>
          <PlaceOrderTable
            columns={columns}
            error={error}
            handleSorting={handleSorting}
            product={product}
            sortedData={sortedData}
            spinnerPatientList={MyPatientObj?.reloadMyPatient}
          />
        </div>
      </div>
      <AddPatientContext.Provider
        value={{
          closePopup: () => setOpen(false),
          patientSearchValidator: new Validator(),
          addPatientToList: () => {},
        }}
      >
        <Popup
          dialogParentClass="add-patient-popup"
          openFlag={open}
          closeHandler={() => setOpen(false)}
        >
          <AddPatientContainer />
        </Popup>
      </AddPatientContext.Provider>
    </>
  );
};
