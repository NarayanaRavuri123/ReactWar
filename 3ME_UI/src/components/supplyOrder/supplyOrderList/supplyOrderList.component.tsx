import "./supplyOrderList.css";
import { TextField } from "@mui/material";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../context/MyPatientContext";
import { getFaciityPatients } from "../../../util/3meService";
import { Validator } from "../../../util/order.validations";
import { Popup } from "../../../core/popup/popup.component";
import React, { useState, useEffect, useContext } from "react";
import {
  sendAnalyticsData,
  useSortableTable,
  IAnalyticsData,
} from "../../../util/utilityFunctions";
import SupplyOrderListTable from "./supplyOrderListTable.component";
import { ReactComponent as SearchIconSvg } from "../../../assets/blackSearchIcon.svg";
import { AddPatientButton } from "../../myPatients/addPatientButton/addPatientButton.component";
import { AddPatientContext } from "../../myPatients/addPatientContainer/addPatientContainer.context";
import { AddPatientContainer } from "../../myPatients/addPatientContainer/addPatientContainer.component";
import { SupplyOrderContextType } from "../../../context/SupplyOrderContext";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../context/RolesPermissionContext";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { IPatient } from "../../myPatients/patient.interface";

const columns = [
  { label: "", accessor: "orderID", sortable: false },
  { label: "Name", accessor: "lastName", sortable: true },
  { label: "Date of Birth", accessor: "dob", sortable: true },
  { label: "RO #", accessor: "roNumber", sortable: true },
];

type Props = { supplyOrderContextObj: SupplyOrderContextType | null };

export const SupplyOrderList = ({ supplyOrderContextObj }: Props) => {
  supplyOrderContextObj?.setSupplyOrderPageTitle("Supply Order");
  supplyOrderContextObj?.setSupplyOrderProgress(10);
  const [patientSearchKeyWords, setPatientSearchKeyWords] =
    useState<string>("");
  const [sortedData, setSortedData, handleSorting] = useSortableTable(
    [],
    columns
  );
  const [error, setError] = useState(false);
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const [open, setOpen] = useState(false);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);

  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const [patientList, setPatientList] = React.useState<Array<IPatient>>();

  const handleAddPatient = () => {
    let data: IAnalyticsData = {
      page_type: "react",
      view_name: "supplyOrderComponent",
      event_type: "click",
      event_name: "addPatient_SupplyOrder",
      tealium_event: "Order_Supplies_Button",
      mmmex_userrecordid: AuthObj?.userProfile?.userID!,
      mmmex_facilityid: AuthObj?.registeredFaciltyAddress?.siteUseId!,
      mmmex_pagename: "Supply Order Select Patient",
      mmmex_roleid: permissionObj?.mappedRolesPermissionData?.roleName!,
    };
    sendAnalyticsData(data);
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
        AuthObj?.registeredFaciltyAddress?.siteUseId ??
          AuthObj?.userProfile?.facilities[0].siteUseId,
        AuthObj?.registeredFaciltyAddress?.careGiverId,
        AuthObj?.userProfile?.userName,
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
    if (
      MyPatientObj?.reloadMyPatient &&
      AuthObj?.userProfile?.userName?.length! > 0 &&
      AuthObj?.userProfile?.facilities[0].siteUseId?.length! > 0
    ) {
      loadPatientData("");
    }
  }, [
    MyPatientObj?.reloadMyPatient,
    AuthObj?.registeredFaciltyAddress?.siteUseId,
    AuthObj?.userProfile?.facilities[0].siteUseId,
    AuthObj?.registeredFaciltyAddress?.careGiverId,
    AuthObj?.userProfile?.userName,
  ]);

  return (
    <>
      <div className="supplyOrder-container">
        <div className="supplyOrder-List">
          <div className="select-patient" data-testid="select-patient">
            Select Patient
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              autoComplete="off"
              data-testid="filter-patients"
              autoFocus={true}
              className="filter-so-list"
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
            <AddPatientButton
              isBtnVisible={true}
              onClickHandler={handleAddPatient}
              isBtnDisabled={
                permissionObj?.mappedRolesPermissionData.IsSupportRole
              }
            />
          </div>
          <SupplyOrderListTable
            columns={columns}
            error={error}
            handleSorting={handleSorting}
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
