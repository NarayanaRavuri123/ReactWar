import React, { useContext, useEffect } from "react";
import ".././submitPrescription.css";
import { Button, Grid, InputBase } from "@mui/material";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { NewOrderValidator } from "../../newOrder.validator";
import { SearchPrescriberModal } from "../../prescriberInformation/searchPrescriber.enum";
import redimportant from "../../../../assets/redimportant.svg";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { INewOrder } from "../../newOrder.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { ReactComponent as CrossIcon } from "../../../../assets/cross.svg";
import "./ePrescription.css";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";

interface IEPrescription {
  data: INewOrder;
  Validator?: NewOrderValidator;
  setData: Function;
}

export const EPrescription = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
}: IEPrescription) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  useEffect(() => {
    setData({
      ...data,
      updatedPrescriberEmail: {
        value:
          NewOrderObj?.prescriberAddedData?.email === undefined
            ? ""
            : NewOrderObj?.prescriberAddedData?.email,
        valid: ValidationStatus.VALID,
      },
    });
  }, [NewOrderObj?.prescriberAddedData?.email]);

  const handleEditEmailOnclick = () => {
    NewOrderObj?.setIsPrescriberUpdateEmail(true);
    const email = data?.updatedPrescriberEmail.value;

    const isValid = validator.validate(email, "updatedPrescriberEmail");
    setData({
      ...data,
      updatedPrescriberEmail: {
        value: email,
        valid: isValid?.status,
      },
    });
  };

  const handleUpdateEmail = () => {
    NewOrderObj?.setIsPrescriberUpdateEmail(false);
    NewOrderObj?.setPrescriberAddedData({
      ...NewOrderObj?.prescriberAddedData!,
      email: data?.updatedPrescriberEmail.value,
    });
  };

  const handlePrescriberSearchType = (section: SearchPrescriberModal) => {
    NewOrderObj?.setprescribeSearchAddPopUpSection(section);
  };

  const validateAndSetData = (e: any) => {
    const { value } = e.target;

    const isValid = validator.validate(value, e.target.name);

    setData({
      ...data,
      updatedPrescriberEmail: {
        value: value,
        valid: isValid?.status,
      },
    });
  };
  const handleCancelClick = () => {
    NewOrderObj?.setIsPrescriberUpdateEmail(false);
    setData({
      ...data,
      updatedPrescriberEmail: {
        value:
          NewOrderObj?.prescriberAddedData?.email === undefined
            ? ""
            : NewOrderObj?.prescriberAddedData?.email,
        valid: ValidationStatus.VALID,
      },
    });
  };

  return (
    <>
      {NewOrderObj?.isPrescriberAddedOpenInfo && (
        <>
          <div
            className={
              NewOrderObj?.prescriberList?.eScript === "No"
                ? "prescriberDivErrorinfo"
                : "prescriberNoErrorinfo"
            }
          >
            <Grid container>
              <Grid item xs={12}>
                {NewOrderObj?.isPrescriberAddedOpenInfo &&
                  NewOrderObj?.prescriberList?.eScript == "No" && (
                    <>
                      <div className="prescriberErrorDesc2">
                        <div className="imgalert">
                          <img
                            src={redimportant}
                            alt={redimportant}
                            height={25}
                            width={25}
                          ></img>
                        </div>
                        <div
                          className="prescriberErrorDesc2Label"
                          data-testid="prescriberErrorDesc2LabelTest"
                        >
                          This prescriber does not accept E-Prescription
                          requests. Select another prescriber or choose a
                          different method.
                        </div>
                      </div>
                    </>
                  )}
              </Grid>
            </Grid>
            <Grid
              className={
                NewOrderObj?.prescriberList?.eScript == "No"
                  ? "prescriberNoErrorinfo"
                  : "prescriberInfo"
              }
            >
              <Grid item xs={4} className="prescriberNameGrid">
                <div
                  className={
                    NewOrderObj?.showPrescriberUpdateEmail
                      ? "prescriberUpdateInfoDiv"
                      : "prescriberInfoDiv"
                  }
                >
                  <div
                    className="prescriberInfoLabel"
                    data-testid="prescriberInfoLabelSelectedTest"
                  >
                    Prescriber Name
                  </div>
                  <div className="prescriberInfoDesc">
                    {makeCapitalEachWordInString(
                      NewOrderObj?.prescriberAddedData?.firstName ?? ""
                    ) +
                      " " +
                      makeCapitalEachWordInString(
                        NewOrderObj?.prescriberAddedData?.lastName ?? ""
                      )}
                  </div>
                </div>
              </Grid>

              {NewOrderObj?.prescriberList?.eScript !== "No" ? (
                NewOrderObj?.showPrescriberUpdateEmail ? (
                  <Grid item xs={6}>
                    <InputWithLabel
                      label="Prescriber Email Address"
                      isRequired={true}
                      error={
                        data?.updatedPrescriberEmail.valid ===
                        ValidationStatus.INVALID
                      }
                    >
                      <InputBase
                        className="update-prescriberemail-input"
                        name="updatedPrescriberEmail"
                        data-testid="update-prescriberemail-input-test"
                        onChange={validateAndSetData}
                        value={data?.updatedPrescriberEmail?.value}
                      />
                    </InputWithLabel>
                  </Grid>
                ) : (
                  <Grid item xs={4}>
                    <div className="prescriberInfoDiv">
                      <div
                        className="prescriberInfoLabel"
                        data-testid="prescriberInfoLabelSelectedEmailTest"
                      >
                        Prescriber Email Address
                      </div>
                      <div className="prescriberInfoDesc">
                        {data?.updatedPrescriberEmail?.value === "" ||
                        data?.updatedPrescriberEmail?.value === undefined
                          ? "--"
                          : data?.updatedPrescriberEmail?.value}
                      </div>
                    </div>
                  </Grid>
                )
              ) : null}

              {NewOrderObj?.prescriberList?.eScript !== "No" ? (
                NewOrderObj?.showPrescriberUpdateEmail ? (
                  <>
                    <Grid
                      item
                      xs={2}
                      className="prescriber-info-Selected-UpdateBtn"
                    >
                      <Button
                        classes={{ root: "button-update-email" }}
                        data-testid="button-update-email-test"
                        variant="outlined"
                        onClick={handleUpdateEmail}
                        disabled={
                          data?.updatedPrescriberEmail?.valid ===
                          ValidationStatus.INVALID
                        }
                      >
                        update
                      </Button>
                    </Grid>
                    <Grid item xs={1}>
                      <CrossIcon
                        data-testid="crossIconTest"
                        onClick={handleCancelClick}
                        className="crossIcon"
                      />
                    </Grid>
                  </>
                ) : (
                  <Grid
                    item
                    xs={4}
                    className="prescriber-info-Selected-PresBtn"
                  >
                    <Button
                      classes={{
                        root: "prescriber-info-email-addOrRemove-button",
                      }}
                      data-testid="prescriber-selected-addOrRemove-button-email-test"
                      onClick={handleEditEmailOnclick}
                    >
                      edit email
                    </Button>
                  </Grid>
                )
              ) : (
                <Grid item xs={8} className="prescriber-info-Selected-PresBtn">
                  <Button
                    classes={{
                      root: "prescriber-info-email-addOrRemove-button",
                    }}
                    data-testid="prescriber-selected-addOrRemove-button-email-test"
                    onClick={() => {
                      handlePrescriberSearchType(
                        SearchPrescriberModal.SEARCH_PRESCRIBER
                      );
                      NewOrderObj?.setSearchPrescriberPopup(true);
                    }}
                  >
                    select a different prescriber
                  </Button>
                </Grid>
              )}
            </Grid>
          </div>
        </>
      )}
      {NewOrderObj?.isPrescriberAddedOpenErrorInfo && (
        <>
          <Grid
            className={
              NewOrderObj?.prescriberList?.eScript == "No"
                ? "prescriberNoErrorinfo"
                : "prescriberErrorinfo"
            }
          >
            <Grid item xs={8}>
              <div className="prescriberErrorDesc">
                <div>
                  <img src={redimportant} alt={redimportant}></img>
                </div>
                <div
                  className="prescriberErrorDescLabel"
                  data-testid="prescriberErrorDescLabelTest"
                >
                  To use E-Prescription, you need to select a prescriber
                </div>
              </div>
            </Grid>
            <Grid item xs={4} className="prescriberSelectedChangePresBtn">
              <Button
                onClick={() => {
                  NewOrderObj?.setprescribeSearchAddPopUpSection(
                    SearchPrescriberModal.SEARCH_PRESCRIBER
                  );
                  NewOrderObj?.setSearchPrescriberPopup(true);
                }}
                classes={{
                  root: "prescriber-selected-addOrRemove-button",
                }}
                data-testid="prescriber-selected-addOrRemove-button-prescribersearch-test"
              >
                search for prescriber
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {NewOrderObj?.isPrescriberAddedOpenInfo
        ? data.updatedPrescriberEmail.valid === ValidationStatus.INVALID && 
          NewOrderObj?.prescriberList?.eScript !== "No" && (
            <div
              className="prescriberEmailError"
              data-testid="prescriberEmailError"
            >
              Prescriber email address required
            </div>
          )
        : null}
    </>
  );
};
