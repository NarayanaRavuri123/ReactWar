import "./sendNote.css";
import React from "react";
import moment from "moment";
import { format } from "react-string-format";
import { useHistory, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Popup } from "../../core/popup/popup.component";
import { SendNoteValidator } from "./sendNote.validator";
import { DD_CONTACT_REASON } from "../../util/staticText";
import { getDeepClone } from "../../util/ObjectFunctions";
import { getdropDownContent } from "../../util/dropDownService";
import { ISendNote, ISendNoteProps } from "./sendNote.interface";
import { LoadingSpinner } from "../../core/loader/LoadingSpinner";
import { AskQuestion } from "./askQuestion/askQuestion.component";
import { defaultAskQuestionData } from "./askQuestion/askQuestion.model";
import { ValidationStatus } from "../../core/interfaces/input.interface";
import TransferPatient from "./transferPatient/transferPatient.component";
import ChangeAddress from "./changePatientAddress/changeAddress.component";
import { Navigator } from "../helpAndSupport/Navigator/navigator.component";
import { retrievePatientDetails } from "../../util/pickUpOrDischargeService";
import { getCodeFromText, getTextFromCode } from "../../util/utilityFunctions";
import { PatientAddress } from "./changePatientAddress/changeAddress.interface";
import { defaultAddressData } from "./changePatientAddress/changeAddress.model";
import { SendNoteSuccess } from "./popUps/successPopUp/sendNoteSuccess.component";
import { CustomDropDown } from "../../core/customDropdown/customDropdown.component";
import { FooterButtonGroup } from "./footerButtonGroup/footerButtonGroup.component";
import { InputWithLabel } from "../../core/inputWithLabel/inputWithLabel.component";
import { defaultTransferPatientData } from "./transferPatient/transferPatient.model";
import { PatientDetails } from "../pickUpAndDischargeRequest/pickUpRequest/patientDetails/patientDetails.component";
import { getPatientAddresses } from "../../util/3meService";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { send3MNote } from "../../util/3meService";
import { patientMockData } from "../../mockData/patientFound";
import { SendNoteFailure } from "./popUps/failurePopUp/sendNoteFailure.component";
import { SendNoteCancel } from "./popUps/cancelPopUp/sendNoteCancelPopUp.component";
import {
  SendNoteContext,
  SendNoteContextType,
} from "../../context/SendNoteContext";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../context/OrderDetailsContext";

export const SendNote = ({
  testData,
  Validator = new SendNoteValidator(),
}: ISendNoteProps) => {
  const history = useHistory();
  const location: any = useLocation();
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState<boolean>(false);
  const [openCancelPopUp, setOpenCancelPopUp] = useState<boolean>(false);
  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);
  const [openFailurePopUp, setOpenFailurePopUp] = useState<boolean>(false);
  const [validator] = useState<SendNoteValidator>(Validator!);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const sendNoteObj = useContext<SendNoteContextType | null>(SendNoteContext);

  const contactReasons = sendNoteObj!.contactReasons;
  const setContactReasons = sendNoteObj!.setContactReasons;
  const contactReasonsText = sendNoteObj!.contactReasonsText;
  const setContactReasonsText = sendNoteObj!.setContactReasonsText;

  const patient = sendNoteObj!.patient;
  const setPatient = sendNoteObj!.setPatient;

  const data = sendNoteObj!.data;
  const setData = sendNoteObj!.setData;

  const addressData = sendNoteObj!.changeAddressData;
  const setAddressData = sendNoteObj!.setChangeAddressData;
  const patientCurrentAddress = sendNoteObj!.patientCurrentAddress;
  const setPatientCurrentAddress = sendNoteObj!.setPatientCurrentAddress;
  const patientPermanentAddress = sendNoteObj!.patientPermanentAddress;
  const setPatientPermanentAddress = sendNoteObj!.setPatientPermanentAddress;

  const transferPatientData = sendNoteObj!.transferPatientData;
  const setTransferPatientData = sendNoteObj!.setTransferPatientData;

  const askQuestionData = sendNoteObj!.askQuestionData;
  const setAskQuestionData = sendNoteObj!.setAskQuestionData;

  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );

  const getDataForSendNote = async () => {
    setLoading(true);
    await Promise.all([loadPatientProductInfo(), fetchDropDownContent()]);
    setLoading(false);
  };

  const loadPatientProductInfo = async () => {
    const selectedPatient = location.state?.selectedPatient;
    const roNumber = selectedPatient!.roNumber.toString();
    const dob = selectedPatient!.dob;
    let reqParams = {
      RentalOrderNumber: roNumber,
      DOB: moment(dob).format("yyyy-MM-DD"),
    };
    try {
      const response = await retrievePatientDetails(reqParams);
      if (!response || response.error) {
        setError(true);
        return false;
      } else {
        setPatient((dt: any) => ({
          ...dt,
          productName: response.productName,
          placementDate: response.placemetDate,
          productSerialNumber: response.productSerialNumber,
        }));
        return true;
      }
    } catch (error) {
      console.log("error", error);
      setError(true);
      return false;
    }
  };

  const fetchDropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_CONTACT_REASON);
      const response = await getdropDownContent(ddContent);
      if (response.items.length > 0) {
        const reasonsObject = response.items.filter(
          (item: { name: string }) => item.name === DD_CONTACT_REASON
        );
        const reasonsData = reasonsObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setContactReasons(reasonsData);
        setContactReasonsText(reasonsData.map((x: { text: string }) => x.text));
        return true;
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const retrievePatientAddresses = async () => {
    if (!patientCurrentAddress && !patientPermanentAddress) {
      setOpenLoaderPopUp(true);
      try {
        const roNumber = patient!.roNumber.toString();
        const dob = patient!.dob;
        const reqParams = {
          RentalOrderNumber: roNumber,
          DOB: dob,
        };
        const response = await getPatientAddresses(reqParams);
        if (response.succeeded) {
          const addresses = response.item;
          setPatientCurrentAddress(addresses.currentAddress);
          setPatientPermanentAddress(addresses.permanentAddress);
        }
        setOpenLoaderPopUp(false);
      } catch (error) {
        console.log("error", error);
        setOpenLoaderPopUp(false);
      }
    }
  };

  const callSendNoteAPI = async (params: any) => {
    setOpenLoaderPopUp(true);
    const sendNoteResult = await send3MNote(params);
    setOpenLoaderPopUp(false);
    if (sendNoteResult && sendNoteResult.succeeded) {
      setOpenSuccessPopUp(true);
    } else {
      setOpenFailurePopUp(true);
    }
  };

  const validateAndSetData = (e: any) => {
    let value = getCodeFromText(contactReasons, e.target.value);
    if (value === data.contactResason.value) {
      return;
    } else if (value === "1") {
      retrievePatientAddresses();
    }
    switch (data.contactResason.value) {
      case "1":
        setAddressData(getDeepClone(defaultAddressData));
        break;
      case "2":
        setTransferPatientData(getDeepClone(defaultTransferPatientData));
        break;
      case "3":
        setAskQuestionData(getDeepClone(defaultAskQuestionData));
        break;
      default:
        break;
    }
    const isValid = validator.validate(value, e.target.name);
    setData((dt: ISendNote) => ({
      ...dt,
      [e.target.name]: {
        value: value,
        valid: isValid!.status,
        required: true,
      },
    }));
  };

  const changeAddress = async () => {
    const roNumber = patient!.roNumber.toString();
    const loggedInUserSiteUseID = AuthObj?.registeredFaciltyAddress?.siteUseId!;
    const patientNewAddress = {
      addressLine1: addressData.address1.value,
      addressLine2: addressData.address2.value,
      city: addressData.city.value,
      state: addressData.state.value,
      zipCode: addressData.zip.value,
    };
    const sendNoteRequest = {
      siteUseID: loggedInUserSiteUseID,
      RO: roNumber,
      ContactReason: 0,
      AddressToChange: addressData.addressType.value,
      PatientNewAddress: patientNewAddress,
      ClinicianPhone: addressData.phone.value,
      Comments: addressData.comment.value,
    };
    callSendNoteAPI(sendNoteRequest);
  };

  const transferPatient = async () => {
    const roNumber = patient!.roNumber.toString();
    const loggedInUserSiteUseID = AuthObj?.registeredFaciltyAddress?.siteUseId!;
    let lastVisitDateString =
      transferPatientData.lastVisitDate.value !== ""
        ? moment(transferPatientData.lastVisitDate.value).format("YYYY-MM-DD")
        : null;
    let sendNoteRequest = {
      siteUseID: loggedInUserSiteUseID,
      RO: roNumber,
      ContactReason: 1,
      LastVisitDateForPatient: lastVisitDateString,
      NewFacilityName: transferPatientData.facilityName.value,
      CaregiverOrPhysicianNowResponsible:
        transferPatientData.careGiverName.value,
      FacilityPhoneNumber: transferPatientData.phone.value,
      Comments: transferPatientData.comment.value,
    };
    callSendNoteAPI(sendNoteRequest);
  };

  const askQuestion = async () => {
    const roNumber = patient!.roNumber.toString();
    const loggedInUserSiteUseID = AuthObj?.registeredFaciltyAddress?.siteUseId!;
    let sendNoteRequest = {
      siteUseID: loggedInUserSiteUseID,
      RO: roNumber,
      ContactReason: 2,
      Question: askQuestionData.question.value,
    };
    callSendNoteAPI(sendNoteRequest);
  };

  const cancelSendNote = () => {
    history.goBack();
  };

  const submitSendNote = () => {
    let isValid;
    switch (data.contactResason.value) {
      case "1":
        isValid = validator.validateAll(addressData, setAddressData);
        if (isValid) {
          changeAddress();
        }
        break;
      case "2":
        isValid = validator.validateAll(
          transferPatientData,
          setTransferPatientData
        );
        if (isValid) {
          transferPatient();
        }
        break;
      case "3":
        isValid = validator.validateAll(askQuestionData, setAskQuestionData);
        if (isValid) {
          askQuestion();
        }
        break;
      default:
        break;
    }
  };

  const openOrderOverview = () => {
    const selectedPatient = location.state?.selectedPatient;
    orderOverViewObj?.resetSeletedSupplyOrderData();
    orderOverViewObj?.resetWoundData();
    if (selectedPatient) {
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: selectedPatient,
        },
      });
    }
  };

  useEffect(() => {
    if (testData) {
      setData(testData);
      setPatient(patientMockData);
    }
    if (!patient) {
      const selectedPatient = location.state?.selectedPatient;
      if (selectedPatient) {
        setPatient(selectedPatient);
        if (!selectedPatient.productName) {
          getDataForSendNote();
        }
      } else {
        history.push("/home");
      }
    }
  }, []);

  return (
    <div className="send-note-component">
      {loading && (
        <div className="send-note-loader">
          <LoadingSpinner />
        </div>
      )}
      {!loading && (
        <Navigator
          array={[
            {
              route: "/home",
              pageName: "My Patients",
            },
          ]}
          className="send-note-route-section"
          title="Send 3M a Note"
        />
      )}
      {error && !loading && (
        <div className="send-note-error-msg" data-testid="send-note-error-msg">
          Oops something went wrong !
        </div>
      )}
      {!error && !loading && (
        <>
          <div className="short-form">
            <div className="header">
              <h4 className="title" data-testid="title">
                Send 3M a Note
              </h4>
              <h5 className="description" data-testid="description">
                Please select your contact reason and enter information and
                comments below. You will receive an email confirmation that your
                comments have been sent. Requests and comments are processed
                Monday through Friday (except for Holidays) from 7 a.m. to 7
                p.m. If this is an urgent matter, please contact the National
                Contact Center at 1-800-275-4524.
              </h5>
              {patient && (
                <PatientDetails
                  patient={patient!}
                  openOrderOverview={openOrderOverview}
                />
              )}
              <div
                className="send-note-contact-reason-div"
                data-testid="send-note-contact-reason-div"
              >
                <InputWithLabel
                  error={data.contactResason.valid === ValidationStatus.INVALID}
                  isRequired={data.contactResason.required}
                  label="Contact Reason"
                  labelClassName="send-note-contact-reason"
                  testId="send-note-contact-reason"
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={contactReasonsText}
                    name="contactResason"
                    placeHolder="Select Reason"
                    selectpropsClassName={
                      data.contactResason.value
                        ? "send-note-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      data.contactResason.value
                        ? "send-note-input"
                        : "placeHolder"
                    }
                    testId="contactResason-dropdown"
                    value={
                      data.contactResason.value
                        ? getTextFromCode(
                            contactReasons,
                            data.contactResason.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </div>
            </div>
          </div>
          {data.contactResason.value === "1" && (
            <div
              className="change-address-div"
              data-testid="change-address-div"
            >
              <ChangeAddress
                currentAddress={patientCurrentAddress}
                data={addressData}
                permanentAddress={patientPermanentAddress}
                setData={setAddressData}
              />
            </div>
          )}
          {data.contactResason.value === "2" && (
            <div
              className="transfer-patient-div"
              data-testid="transfer-patient-div"
            >
              <TransferPatient
                data={transferPatientData}
                setData={setTransferPatientData}
              />
            </div>
          )}
          {data.contactResason.value === "3" && (
            <div className="ask-question-div" data-testid="ask-question-div">
              <AskQuestion
                data={askQuestionData}
                setData={setAskQuestionData}
              />
            </div>
          )}
        </>
      )}
      <div>
        <FooterButtonGroup
          firstButtonTitle="Cancel"
          firstButtonAction={() => {
            if (error) {
              cancelSendNote();
            } else {
              setOpenCancelPopUp(true);
            }
          }}
          secondButtonTitle="Send Note"
          secondButtonDisabled={
            data.contactResason.valid !== ValidationStatus.VALID
          }
          secondButtonAction={submitSendNote}
        />
      </div>
      <Popup
        openFlag={openCancelPopUp}
        closeHandler={() => setOpenCancelPopUp(false)}
        dialogParentClass={"send-note-cancel-pop-up"}
        data-testid="cancel-pop-up"
      >
        <SendNoteCancel
          backButtonAction={cancelSendNote}
          closeButtonAction={() => setOpenCancelPopUp(false)}
        />
      </Popup>
      <Popup
        openFlag={openLoaderPopUp}
        closeHandler={() => setOpenLoaderPopUp(false)}
        dialogParentClass={"send-note-loader-pop-up"}
        data-testid="loader-pop-up"
        hideCloseButton={true}
      >
        <div className="send-note-loader">
          <LoadingSpinner />
        </div>
      </Popup>
      <Popup
        openFlag={openSuccessPopUp}
        closeHandler={() => setOpenSuccessPopUp(false)}
        dialogParentClass={"send-note-success-pop-up"}
        data-testid="success-pop-up"
        hideCloseButton={true}
      >
        <div>
          <SendNoteSuccess
            backButtonAction={() => {
              history.push("/home");
            }}
          />
        </div>
      </Popup>
      <Popup
        openFlag={openFailurePopUp}
        closeHandler={() => setOpenFailurePopUp(false)}
        dialogParentClass={"send-note-failure-pop-up"}
        data-testid="failure-pop-up"
      >
        <div>
          <SendNoteFailure
            message="Your request to send 3M a note has failed. Please try again or contact
        3M for assistance with this order 1-800-275-4524."
            backButtonAction={() => {
              history.push("/home");
            }}
          />
        </div>
      </Popup>
    </div>
  );
};
