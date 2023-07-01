import { NewOrderContextType } from "../../../context/NewOrderContext";
import {
  ICanister,
  IDeliveryInformation,
  IDressingKit,
  INewOrder,
  IProductAccessory,
  IProductInfo,
  IRequesterInfo,
} from "../newOrder.interface";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import {
  Product,
  Insurance,
  ISaveVacOrderRequest,
} from "./newOrderRequestMapper.interface";
import { ISecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";

export const mapSaveVacOrderRequest = async (
  IsSaveAndExit: boolean,
  newOrderPatientDetails: INewOrder,
  requesterDetails: IRequesterInfo,
  producDetails: IProductInfo,
  newOrderWoundDetails: INewOrderWoundInfo,
  dressingKit: IDressingKit,
  canister: ICanister,
  accessory: IProductAccessory,
  NewOrderObj: NewOrderContextType | null,
  orderID: string | null,
  deliveryInformation: IDeliveryInformation,
  loggedInUserSiteUseID: string
) => {
  let requestBody: ISaveVacOrderRequest;
  let secondaryWoundInfo: ISecondaryWoundInfo;
  secondaryWoundInfo = NewOrderObj?.secondaryWoundInfoData!;
  let isSecondaryWound = checkBooleanValue(
    newOrderWoundDetails.isShowSecondaryWoundInfo.value
  );
  requestBody = {
    isSaveAndExit: IsSaveAndExit,
    orderID: orderID,
    loggedInUserSiteUseID: loggedInUserSiteUseID,
    customer: {
      firstName: newOrderPatientDetails.firstName.value.trim(),
      lastName: newOrderPatientDetails.lastName.value.trim(),
      dob: formatISODate(
        newOrderPatientDetails.dob.value,
        newOrderPatientDetails.dob.valid
      ),
      phoneNo: formatPhoneNumber(newOrderPatientDetails.phone.value),
      currentPhoneNo: formatPhoneNumber(
        newOrderPatientDetails.patientCurrentAddressPhone.value
      ),
      email: newOrderPatientDetails.email.value,
      permanentAddress: {
        addressLine1: newOrderPatientDetails.address1.value,
        addressLine2: newOrderPatientDetails.address2.value,
        city: newOrderPatientDetails.city.value,
        stateCode: newOrderPatientDetails.state.value,
        postalCode: newOrderPatientDetails.zip.value,
      },
      currentAddress: {
        addressLine1:
          newOrderPatientDetails.IsSamePermanentAddress.value === "true"
            ? newOrderPatientDetails.address1.value
            : newOrderPatientDetails.patientCurrentAddress1.value,
        addressLine2:
          newOrderPatientDetails.IsSamePermanentAddress.value === "true"
            ? newOrderPatientDetails.address2.value
            : newOrderPatientDetails.patientCurrentAddress2.value,
        city:
          newOrderPatientDetails.IsSamePermanentAddress.value === "true"
            ? newOrderPatientDetails.city.value
            : newOrderPatientDetails.patientCurrentAddressCity.value,
        stateCode:
          newOrderPatientDetails.IsSamePermanentAddress.value === "true"
            ? newOrderPatientDetails.state.value
            : newOrderPatientDetails.patientCurrentAddressState.value,
        postalCode:
          newOrderPatientDetails.IsSamePermanentAddress.value === "true"
            ? newOrderPatientDetails.zip.value
            : newOrderPatientDetails.patientCurrentAddressZip.value,
      },
    },
    deliveryAddress: {
      addressType: deliveryInformation.deliverySiteType.value
        ? parseInt(deliveryInformation.deliverySiteType.value)
        : 0,
      name: deliveryInformation.deliveryFacilityName.value,
      address: {
        addressLine1: deliveryInformation.deliveryAddressLine1.value,
        addressLine2: deliveryInformation.deliveryAddressLine2.value,
        city: deliveryInformation.deliveryCity.value,
        stateCode: deliveryInformation.deliveryState.value,
        postalCode: deliveryInformation.deliveryZipCode.value,
      },
    },
    emergencyContact: {
      firstName: newOrderPatientDetails.emergencyContactFirstName.value,
      lastName: newOrderPatientDetails.emergencyContactLastName.value,
      phoneNumber: formatPhoneNumber(
        newOrderPatientDetails.emergencyContactPhoneNumber.value
      ),
    },
    requestor: {
      email: requesterDetails.requesterEmail.value,
      facilityName: requesterDetails.requesterFacility?.accountName!,
      name: requesterDetails.requesterFirstName.value,
      lastName: requesterDetails.requesterLastName.value,
      facilityNumber:
        requesterDetails.requesterFacility?.accountNumber!.toString(),
      siteUseID: checkNullValue(requesterDetails.requesterFacility?.siteUseId!),
      address: {
        addressLine1: requesterDetails.requesterFacility?.address1!,
        addressLine2: requesterDetails.requesterFacility?.address2!,
        city: requesterDetails.requesterFacility?.city!,
        stateCode: requesterDetails.requesterFacility?.state!,
        postalCode: requesterDetails.requesterFacility?.zip?.toString() ?? "",
      },
    },
    insurance: [
      getInsuranceObj(NewOrderObj, newOrderPatientDetails, true),
      getInsuranceObj(NewOrderObj, newOrderPatientDetails, false),
    ],
    contributingCauseWoundResult: checkBooleanValue(
      newOrderPatientDetails.contributingCause.value
    ),
    contributingCauseAccidentDate: formatISODate(
      newOrderPatientDetails.dateOfAccident.value,
      newOrderPatientDetails.dateOfAccident.valid
    ),
    contributingCauseAccidentType: newOrderPatientDetails.accidentType.value,
    therapyDuration: newOrderPatientDetails.lengthOfTherapy.value
      ? parseInt(newOrderPatientDetails.lengthOfTherapy.value)
      : 0,
    therapyGoal: newOrderPatientDetails.goalOfTherapy.value,
    prescriber: {
      npi: NewOrderObj?.prescriberAddedData?.npi!,
      firstName: NewOrderObj?.prescriberAddedData?.firstName!,
      lastName: NewOrderObj?.prescriberAddedData?.lastName!,
      emailAddress: NewOrderObj?.prescriberAddedData?.email!,
      city: NewOrderObj?.prescriberAddedData?.city!,
      state: NewOrderObj?.prescriberAddedData?.state!,
    },
    prescriptionMethod: getSubmitPrescription(
      newOrderPatientDetails.submitPrescription.value
    ),
    isUpdatePrescriberEmailId: !NewOrderObj?.showPrescriberUpdateEmail,
    isFromReadyCare: checkBooleanValue(producDetails.productInformation.value!),
    vacUnit: producDetails.productValue.value!
      ? parseInt(producDetails.productValue.value!)
      : 0,
    mainDressing: getMainDressing(dressingKit),
    additionalDressing: getAdditionalDressing(dressingKit),
    canister: getCannister(canister),
    accessories: getAccessoriesObj(accessory.accessories),
    isTransition: checkBooleanValue(
      newOrderPatientDetails?.wasNPWTInitiated.value!
    ),
    transitionFromFacility: getInPatientFacility(newOrderPatientDetails),
    administeringDressingChanges: checkBooleanValue(
      newOrderPatientDetails.homeCareProvider.value
    ),
    hcp: {
      facilityName: newOrderPatientDetails.addedCaregiverName.value,
      accountNumber: newOrderPatientDetails.addedCaregiverAccountNumber.value,
      facilityType: parseInt(
        newOrderPatientDetails.addedCaregiverFacilityTypeCode.value
      ),
      hcpSiteUseID: newOrderPatientDetails.addedCaregiverSiteUseID.value,
      caregiverID: newOrderPatientDetails.addedCaregiverID.value,
      address: {
        addressLine1: newOrderPatientDetails.addedCaregiverAddress1.value,
        addressLine2: newOrderPatientDetails.addedCaregiverAddress2.value,
        city: newOrderPatientDetails.addedCaregiverCity.value,
        stateCode: newOrderPatientDetails.addedCaregiverState.value,
        postalCode: newOrderPatientDetails.addedCaregiverZip.value,
      },
      phoneNo: newOrderPatientDetails.addedCaregiverPhone.value,
      extension: checkNullValue(
        newOrderPatientDetails.addedCaregiverPhoneExtension.value
      ),
      mode: 1,
    },
    deliveryDueDate: formatISODate(
      deliveryInformation.deliveryProductNeedByDate.value,
      deliveryInformation.deliveryProductNeedByDate.valid
    ),
    needByTime: deliveryInformation.deliveryProductNeedByTime.value,
    deliveryFirstName: newOrderPatientDetails.deliveryContactFirstName.value,
    deliveryLastname: newOrderPatientDetails.deliveryContactLastName.value,
    deliveryPhoneNumber: formatPhoneNumber(
      newOrderPatientDetails.deliveryContactPhone.value
    ),
    orderNotes: newOrderPatientDetails.deliveryInstructions.value,
    woundDetail: {
      vacNotUsedConsequences:
        newOrderWoundDetails.shortNarrativeOfPossibleConsequences.value,
      nutritionStatus: checkBooleanValue(
        newOrderWoundDetails.nutriStatusCompromized.value
      ),
      nutritionAction: getNutritionActionValues(newOrderWoundDetails),
      previousTherapies: getPreviousTherapyValues(newOrderWoundDetails),
      otherTherapiesConditionPrevented:
        getOtherTherapyPreventedValues(newOrderWoundDetails),
      comorbititiesApply: getComorbiditiesValues(newOrderWoundDetails),
      osteomyelitisPresent: checkBooleanValue(
        newOrderWoundDetails.isOsteomyelitisPresent.value
      ),
      osteomyelitisTreatmentRegimen:
        getOsteomyelitisValues(newOrderWoundDetails),
      osteomyelitisRegimenResolve: checkBooleanValue(
        newOrderWoundDetails.isTreatemenForResolveBoneInfection.value
      ),
      wounds: [
        {
          isPrimary: true,
          type: newOrderWoundDetails.woundType.value,
          stageTurnedorPositioned: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Is the patient being turned/positioned?"
          ),
          stageUlcerLocation: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Has a group 2 or 3 surface been used for ulcer located on the posterior trunk or pelvis?"
          ),
          stageMoistureManagement: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Are moisture and/or incontinence being managed?"
          ),
          stageGreaterThanThirtyDays: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Is pressure ulcer greater than 30 days?"
          ),
          diabeticUlcer: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Has a reduction of pressure on the foot ulcer been accomplished with appropriate modalities?"
          ),
          neuropathicUlcerPressureReduction: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Has a reduction of pressure on the foot ulcer been accomplished with appropriate modalities?"
          ),
          venousStatisUlcerBandagesApplied: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Are compression bandages and/or garments being consistently applied?"
          ),
          venousStatisElevationEncouraged: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Is elevation/ambulation being encouraged?"
          ),
          arterialUlcerPressureRelieved: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Is pressure over the wound being relieved?"
          ),
          surgicallyCreated: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Was the wound surgically created and not represented by descriptions above?"
          ),
          surgicalProcedure: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Description of surgical procedure (At least 5 characters)"
          ),
          surgicalProcedureDate: getPrimaryAdditionalQuestionValue(
            NewOrderObj,
            "Date of surgical procedure"
          ),
          age:
            newOrderWoundDetails.woundAge.value === ""
              ? "0"
              : newOrderWoundDetails.woundAge.value,
          location: newOrderWoundDetails.woundLocation.value,
          locationWritten: getWoundlocationWritten(newOrderWoundDetails),
          eschar: checkBooleanValue(newOrderWoundDetails.isTissuePresent.value),
          debridementAttempt: checkBooleanValue(
            newOrderWoundDetails.debridementAttempted.value
          ),
          debridementType: newOrderWoundDetails.debridementType.value,
          debridementDate: formatISODate(
            newOrderWoundDetails.debridementDate.value,
            newOrderWoundDetails.debridementDate.valid
          ),
          debridementRequired: checkBooleanValue(
            newOrderWoundDetails.serialDebridementRequired.value
          ),
          measurementDate: formatISODate(
            newOrderWoundDetails.woundMeasurementDate.value,
            newOrderWoundDetails.woundMeasurementDate.valid
          ),
          length: checkFloatValue(newOrderWoundDetails.woundLength.value),
          width: checkFloatValue(newOrderWoundDetails.woundWidth.value),
          depth: checkFloatValue(newOrderWoundDetails.woundDepth.value),
          thickness: checkBooleanValue(
            newOrderWoundDetails.woundThickness.value
          ),
          underminingPresent: checkBooleanValue(
            newOrderWoundDetails.woundUndermining.value
          ),
          underminingLocation1: {
            depth: checkFloatValue(
              newOrderWoundDetails.underminingLocation1Depth.value
            ),
            area: returnArea(
              newOrderWoundDetails.underminingLocation1PositionFrom.value,
              newOrderWoundDetails.underminingLocation1PositionTo.value
            ),
          },
          underminingLocation2: {
            depth: checkFloatValue(
              newOrderWoundDetails.underminingLocation2Depth.value
            ),
            area: returnArea(
              newOrderWoundDetails.underminingLocation2PositionFrom.value,
              newOrderWoundDetails.underminingLocation2PositionTo.value
            ),
          },
          tunnelingPresent: checkBooleanValue(
            newOrderWoundDetails.woundTunneling.value
          ),
          tunnelingSinusLocation1: {
            depth: checkFloatValue(newOrderWoundDetails.location1Depth.value),
            area: newOrderWoundDetails.location1Position.value,
          },
          tunnelingSinusLocation2: {
            depth: checkFloatValue(newOrderWoundDetails.location2Depth.value),
            area: newOrderWoundDetails.location2Position.value,
          },
          brightRedTissue:
            newOrderWoundDetails.granulationValue.value !== ""
              ? parseInt(
                  newOrderWoundDetails.granulationValue.value.substring(3, 6)
                )
              : null,
          dullTissue:
            newOrderWoundDetails.epthilizationValue.value !== ""
              ? parseInt(
                  newOrderWoundDetails.epthilizationValue.value.substring(3, 6)
                )
              : null,
          whiteTissue:
            newOrderWoundDetails.sloughValue.value !== ""
              ? parseInt(newOrderWoundDetails.sloughValue.value.substring(3, 6))
              : null,
          blackEschar:
            newOrderWoundDetails.escharValue.value !== ""
              ? parseInt(newOrderWoundDetails.escharValue.value.substring(3, 6))
              : null,
          bedTotal: parseInt(newOrderWoundDetails.woundBedTotal.value),
          exudateAmount: newOrderWoundDetails.exudateAmount.value,
          exudateAppearance: newOrderWoundDetails.exudateAppearance.value,
          tissueExposed: getExposedStructure(
            newOrderWoundDetails,
            "Subcutaneous Tissue"
          ),
          muscleExposed: getExposedStructure(newOrderWoundDetails, "Muscle"),
          tendonExposed: getExposedStructure(newOrderWoundDetails, "Tendon"),
          boneExposed: getExposedStructure(newOrderWoundDetails, "Bone"),
        },
        {
          isPrimary: false,
          type: isSecondaryWound ? secondaryWoundInfo?.woundType?.value : "",
          stageTurnedorPositioned: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Is the patient being turned/positioned?"
          ),
          stageUlcerLocation: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Has a group 2 or 3 surface been used for ulcer located on the posterior trunk or pelvis?"
          ),
          stageMoistureManagement: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Are moisture and/or incontinence being managed?"
          ),
          stageGreaterThanThirtyDays: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Is pressure ulcer greater than 30 days?"
          ),
          diabeticUlcer: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Has a reduction of pressure on the foot ulcer been accomplished with appropriate modalities?"
          ),
          neuropathicUlcerPressureReduction:
            getSecondaryAdditionalQuestionValue(
              NewOrderObj,
              "Has a reduction of pressure on the foot ulcer been accomplished with appropriate modalities?"
            ),
          venousStatisUlcerBandagesApplied: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Are compression bandages and/or garments being consistently applied?"
          ),
          venousStatisElevationEncouraged: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Is elevation/ambulation being encouraged?"
          ),
          arterialUlcerPressureRelieved: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Is pressure over the wound being relieved?"
          ),
          surgicallyCreated: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Was the wound surgically created and not represented by descriptions above?"
          ),
          surgicalProcedure: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Description of surgical procedure (At least 5 characters)"
          ),
          surgicalProcedureDate: getSecondaryAdditionalQuestionValue(
            NewOrderObj,
            "Date of surgical procedure"
          ),
          age:
            secondaryWoundInfo.woundAge.value === ""
              ? "0"
              : secondaryWoundInfo.woundAge.value,
          location: secondaryWoundInfo.woundLocation.value,
          locationWritten: getWoundlocationWritten(secondaryWoundInfo),
          eschar: checkBooleanValue(secondaryWoundInfo.isTissuePresent.value),
          debridementAttempt: checkBooleanValue(
            secondaryWoundInfo.debridementAttempted.value
          ),
          debridementType: secondaryWoundInfo.debridementType.value,
          debridementDate: formatISODate(
            secondaryWoundInfo.debridementDate.value,
            secondaryWoundInfo.debridementDate.valid
          ),
          debridementRequired: checkBooleanValue(
            secondaryWoundInfo.serialDebridementRequired.value
          ),
          measurementDate: formatISODate(
            secondaryWoundInfo.woundMeasurementDate.value,
            secondaryWoundInfo.woundMeasurementDate.valid
          ),
          length: checkFloatValue(secondaryWoundInfo.woundLength.value),
          width: checkFloatValue(secondaryWoundInfo.woundWidth.value),
          depth: checkFloatValue(secondaryWoundInfo.woundDepth.value),
          thickness: checkBooleanValue(secondaryWoundInfo.woundThickness.value),
          underminingPresent: checkBooleanValue(
            secondaryWoundInfo.woundUndermining.value
          ),
          underminingLocation1: {
            depth: checkFloatValue(
              secondaryWoundInfo.underminingLocation1Depth.value
            ),
            area: returnArea(
              secondaryWoundInfo.underminingLocation1PositionFrom.value,
              secondaryWoundInfo.underminingLocation1PositionTo.value
            ),
          },
          underminingLocation2: {
            depth: checkFloatValue(
              secondaryWoundInfo.underminingLocation2Depth.value
            ),
            area: returnArea(
              secondaryWoundInfo.underminingLocation2PositionFrom.value,
              secondaryWoundInfo.underminingLocation2PositionTo.value
            ),
          },
          tunnelingPresent: checkBooleanValue(
            secondaryWoundInfo.woundTunneling.value
          ),
          tunnelingSinusLocation1: {
            depth: checkFloatValue(secondaryWoundInfo.location1Depth.value),
            area: secondaryWoundInfo.location1Position.value,
          },
          tunnelingSinusLocation2: {
            depth: checkFloatValue(secondaryWoundInfo.location2Depth.value),
            area: secondaryWoundInfo.location2Position.value,
          },
          brightRedTissue:
            secondaryWoundInfo.granulationValue.value !== ""
              ? parseInt(
                  secondaryWoundInfo.granulationValue.value.substring(3, 6)
                )
              : null,
          dullTissue:
            secondaryWoundInfo.epthilizationValue.value !== ""
              ? parseInt(
                  secondaryWoundInfo.epthilizationValue.value.substring(3, 6)
                )
              : null,
          whiteTissue:
            secondaryWoundInfo.sloughValue.value !== ""
              ? parseInt(secondaryWoundInfo.sloughValue.value.substring(3, 6))
              : null,
          blackEschar:
            secondaryWoundInfo.escharValue.value !== ""
              ? parseInt(secondaryWoundInfo.escharValue.value.substring(3, 6))
              : null,
          bedTotal: parseInt(secondaryWoundInfo.woundBedTotal.value),
          exudateAmount: secondaryWoundInfo.exudateAmount.value,
          exudateAppearance: secondaryWoundInfo.exudateAppearance.value,
          tissueExposed: getExposedStructure(
            secondaryWoundInfo,
            "Subcutaneous Tissue"
          ),
          muscleExposed: getExposedStructure(secondaryWoundInfo, "Muscle"),
          tendonExposed: getExposedStructure(secondaryWoundInfo, "Tendon"),
          boneExposed: getExposedStructure(secondaryWoundInfo, "Bone"),
        },
      ],
    },
  };
  if (requestBody.mainDressing == null) {
    requestBody.mainDressing = requestBody.additionalDressing;
    requestBody.additionalDressing = null;
  }
  return requestBody;
};

const checkBooleanValue = (value: string) => {
  if (!value) {
    return null;
  }
  return value.toLowerCase() === "yes"
    ? true
    : value.toLowerCase() === "no"
    ? false
    : null;
};
const getSubmitPrescription = (value: string) => {
  switch (value) {
    case "RxImage":
      return 1;
    case "EPrescription":
      return 2;
    case "Fax":
      return 3;
    default:
      return null;
  }
};

const getAccessoriesObj = (value: any) => {
  return value.map((element: any) => {
    return { sku: element.code.toString(), quantity: 1 };
  });
};

const formatISODate = (value: string, valid: string) => {
  if (
    value === "" ||
    value === "--" ||
    value === null ||
    value === "Invalid date" ||
    valid !== ValidationStatus.VALID
  ) {
    return null;
  } else {
    let datestring = null;
    if (value && value.includes("T")) {
      return value;
    } else {
      datestring = value + " 00:00 UTC";
    }
    const event = new Date(datestring);
    return event.toISOString();
  }
};

const formatPhoneNumber = (inputNumber: any) => {
  if (inputNumber === null || inputNumber === "") {
    return null;
  }
  return inputNumber.replace(/[^0-9]/g, "");
};

const checkNullValue = (value: string = "") => {
  return value === "" ? null : value;
};

const checkEmptyValue = (value: string) => {
  return value === "" ? "" : value;
};

const getInsuranceObj = (
  NewOrderObj: NewOrderContextType | null,
  newOrderPatientDetails: INewOrder,
  isPrimary: boolean
) => {
  const typePrimaryText = isPrimary ? "typePrimary" : "typeSecondary";
  const InsuranceText = isPrimary ? "primaryInsurance" : "secondaryInsurance";
  const tempObj: any = NewOrderObj?.showAddtionalObject[typePrimaryText]!;

  let defaultObj: Insurance = {
    isPrimary: isPrimary,
    type: null,
    name: "",
    memberID: "",
    groupID: "",
    relationshipToPatient: "",
    additionalInfo: "",
    providerContactNumber: null,
    providerContactNumberExtension: null,
    insuranceEmailAddress: "",
  };
  Object.keys(tempObj).forEach((x: any) => {
    let keyName: any = "";
    if (tempObj[x] === true) {
      let selectedTypeCode = parseInt(
        newOrderPatientDetails[InsuranceText].insuranceTypeCode.value
      );
      keyName = x;

      if (selectedTypeCode === 1 || selectedTypeCode === 2) {
        defaultObj.isPrimary = isPrimary;
        defaultObj.type = checkNullValue(
          newOrderPatientDetails[
            InsuranceText
          ].insuranceTypeCode.value.toString()
        );
        defaultObj.memberID = checkEmptyValue(
          newOrderPatientDetails[InsuranceText][
            `${keyName}`
          ].memberID.value.toString()
        );
        defaultObj.relationshipToPatient = checkEmptyValue(
          newOrderPatientDetails[InsuranceText][
            `${keyName}`
          ].relationShipInsured.value.toString()
        );
      } else if (selectedTypeCode === 99) {
        defaultObj.isPrimary = isPrimary;
        defaultObj.type = checkNullValue(
          newOrderPatientDetails[
            InsuranceText
          ].insuranceTypeCode.value.toString()
        );
        defaultObj.additionalInfo =
          newOrderPatientDetails[InsuranceText][`${keyName}`].value.toString();
      } else if (selectedTypeCode === 4) {
        defaultObj.isPrimary = isPrimary;
        defaultObj.type = checkNullValue(
          newOrderPatientDetails[
            InsuranceText
          ].insuranceTypeCode.value.toString()
        );
        defaultObj.name = newOrderPatientDetails.firstName.value;
        defaultObj.insuranceEmailAddress = newOrderPatientDetails.email.value;
        defaultObj.providerContactNumber = checkNullValue(
          formatPhoneNumber(newOrderPatientDetails.phone.value)
        );
      } else if (selectedTypeCode === 6 || selectedTypeCode === 8) {
        defaultObj.isPrimary = isPrimary;
        defaultObj.type = checkNullValue(
          newOrderPatientDetails[
            InsuranceText
          ].insuranceTypeCode.value.toString()
        );
      } else {
        defaultObj = {
          isPrimary: isPrimary,
          type: checkNullValue(
            newOrderPatientDetails[
              InsuranceText
            ].insuranceTypeCode.value.toString()
          ),
          name: checkEmptyValue(
            newOrderPatientDetails[InsuranceText][
              `${keyName}`
            ].payerName?.value.toString()
          ),
          memberID: checkEmptyValue(
            newOrderPatientDetails[InsuranceText][
              `${keyName}`
            ].memberID.value.toString()
          ),
          groupID: checkEmptyValue(
            newOrderPatientDetails[InsuranceText][
              `${keyName}`
            ].groupID?.value.toString()
          ),
          relationshipToPatient: checkEmptyValue(
            newOrderPatientDetails[InsuranceText][
              `${keyName}`
            ].relationShipInsured.value.toString()
          ),
          additionalInfo: "",
          providerContactNumber:
            newOrderPatientDetails[InsuranceText][`${keyName}`]
              .payerContactNumber?.valid === ValidationStatus.INVALID
              ? null
              : formatPhoneNumber(
                  checkNullValue(
                    newOrderPatientDetails[InsuranceText][
                      `${keyName}`
                    ].payerContactNumber?.value.toString()
                  )
                ),
          providerContactNumberExtension:
            newOrderPatientDetails[InsuranceText][`${keyName}`].extension
              ?.valid === ValidationStatus.INVALID
              ? null
              : checkNullValue(
                  newOrderPatientDetails[InsuranceText][
                    `${keyName}`
                  ].extension?.value.toString()
                ),
          insuranceEmailAddress: "",
        };
      }
      return defaultObj;
    }
  });
  return defaultObj;
};

const getMainDressing = (dressingKit: IDressingKit) => {
  let dressingData: Product;
  if (
    dressingKit.productCode.value === "" &&
    dressingKit.productSizeCode.value === ""
  ) {
    return null;
  } else {
    dressingData = {
      id: null,
      quantity: parseInt(dressingKit.productQuantity.value),
      sku:
        dressingKit.productCode.value === null
          ? dressingKit.productSizeCode.value
          : dressingKit.productCode.value,
    };
    return dressingData;
  }
};

const getAdditionalDressing = (dressingKit: IDressingKit) => {
  let dressingData: Product;
  if (
    dressingKit.secProductCode.value === "" &&
    dressingKit.secProductSizeCode.value === ""
  ) {
    return null;
  } else {
    dressingData = {
      id: null,
      quantity: parseInt(dressingKit.secProductQuantity.value),
      sku:
        dressingKit.secProductCode.value === null
          ? dressingKit.secProductSizeCode.value
          : dressingKit.secProductCode.value,
    };
    return dressingData;
  }
};

const getCannister = (canister: ICanister) => {
  let dressingData: Product;
  if (canister.canisterProductCode.value === "") {
    return null;
  } else {
    dressingData = {
      id: null,
      quantity: parseInt(canister.canisterProductQuantity.value),
      sku: canister.canisterProductCode.value,
    };
    return dressingData;
  }
};

const getInPatientFacility = (newOrderPatientDetails: INewOrder) => {
  if (newOrderPatientDetails.wasNPWTInitiated.value === "yes") {
    return {
      name: newOrderPatientDetails.inpatientFacility?.accountName!,
      transitionSiteUseID: checkNullValue(
        newOrderPatientDetails.inpatientFacility?.siteUseId!
      ),
      facilityNumber: checkNullValue(
        newOrderPatientDetails.inpatientFacility?.accountNumber!
          ? newOrderPatientDetails.inpatientFacility?.accountNumber!.toString()
          : ""
      ),
      transitionInitaiatedDate: formatISODate(
        newOrderPatientDetails.dateInitiated.value,
        newOrderPatientDetails.dateInitiated.valid
      ),
      address: {
        addressLine1: newOrderPatientDetails.inpatientFacility?.address1!,
        addressLine2: newOrderPatientDetails.inpatientFacility?.address2!,
        city: newOrderPatientDetails.inpatientFacility?.city!,
        stateCode: newOrderPatientDetails.inpatientFacility?.state!,
        postalCode: newOrderPatientDetails.inpatientFacility?.zip!
          ? newOrderPatientDetails.inpatientFacility?.zip!.toString()!
          : "",
      },
    };
  } else {
    return null;
  }
};

const getNutritionActionValues = (newOrderWoundDetails: INewOrderWoundInfo) => {
  let arrayValues: any = [];
  newOrderWoundDetails.nutritionActions.value.map((element: any) => {
    if (element.selected) {
      arrayValues.push(element.value);
    }
  });
  return arrayValues.join(",");
};

const getPreviousTherapyValues = (newOrderWoundDetails: INewOrderWoundInfo) => {
  let arrayValues: any = [];
  newOrderWoundDetails.previousTherapies.value.map((element: any) => {
    if (element.selected) {
      if (element.label.toLowerCase() === "other") {
        arrayValues.push(
          `${element.label}:${newOrderWoundDetails.previousTherapyOther.value}`
        );
      } else {
        arrayValues.push(element.label);
      }
    }
  });
  return arrayValues.join(",");
};

const getOtherTherapyPreventedValues = (
  newOrderWoundDetails: INewOrderWoundInfo
) => {
  let arrayValues: any = [];
  newOrderWoundDetails.previousTherapiesCauses.value.map((element: any) => {
    if (element.selected) {
      if (element.label.toLowerCase() === "other") {
        arrayValues.push(
          `${element.label}:${newOrderWoundDetails.previousTherapiesCausesOther.value}`
        );
      } else {
        arrayValues.push(element.label);
      }
    }
  });
  return arrayValues.join(",");
};

const getComorbiditiesValues = (newOrderWoundDetails: INewOrderWoundInfo) => {
  let arrayValues: any = [];
  newOrderWoundDetails.wndInfoComorbidities.value.map((element: any) => {
    if (element.selected) {
      if (element.label.toLowerCase() === "other") {
        arrayValues.push(
          `${element.label}:${newOrderWoundDetails.wndInfoComorbiditiesOther.value}`
        );
      } else {
        arrayValues.push(element.label);
      }
    }
  });
  return arrayValues.join(",");
};

const getOsteomyelitisValues = (newOrderWoundDetails: INewOrderWoundInfo) => {
  let arrayValues: any = [];
  newOrderWoundDetails.osteomyelitisies.value.map(
    (element: any, index: any) => {
      if (element.selected) {
        if (element.value.toLowerCase() === "antibiotic") {
          arrayValues.push(
            `${element.label}:${
              newOrderWoundDetails.osteomyelitisies.value[index].textBoxValue ??
              ""
            }`
          );
        } else if (element.value.toLowerCase() === "iv antibiotics") {
          arrayValues.push(
            `${element.label}:${
              newOrderWoundDetails.osteomyelitisies.value[index].textBoxValue ??
              ""
            }`
          );
        } else {
          arrayValues.push(element.label);
        }
      }
    }
  );
  return arrayValues.join(",");
};

const checkFloatValue = (value: string) => {
  if (value === "") {
    return null;
  } else {
    return parseFloat(value);
  }
};

const returnArea = (from: string, to: string) => {
  if (from === "" && to === "") {
    return "";
  } else {
    return `${from === "" ? "00:00" : from} to ${to === "" ? "00:00" : to}`;
  }
};

const getExposedStructure = (
  newOrderWoundDetails: INewOrderWoundInfo | ISecondaryWoundInfo,
  key: string
) => {
  let checkValue = null;
  newOrderWoundDetails.exposedStructures.value.map((element: any) => {
    if (element.label === key && element.selected) {
      checkValue = true;
    }
  });
  return checkValue;
};

const getWoundlocationWritten = (
  newOrderWoundDetails: INewOrderWoundInfo | ISecondaryWoundInfo
) => {
  let returnValue: string | null = "";
  if (
    newOrderWoundDetails.woundDirection.value === "" &&
    newOrderWoundDetails.woundOrientation.value === ""
  ) {
    returnValue = null;
  } else if (newOrderWoundDetails.woundDirection.value === "") {
    returnValue = newOrderWoundDetails.woundOrientation.value;
  } else if (newOrderWoundDetails.woundOrientation.value === "") {
    returnValue = newOrderWoundDetails.woundDirection.value;
  } else {
    returnValue = `${newOrderWoundDetails.woundDirection.value},${newOrderWoundDetails.woundOrientation.value}`;
  }
  return returnValue;
};

const getPrimaryAdditionalQuestionValue = (
  NewOrderObj: NewOrderContextType | null,
  AdditionalQuestionText: String
) => {
  let returnValue;
  NewOrderObj?.primaryAdditionalQuestions?.additionalQuestion.map(
    (element: any) => {
      if (element.text === AdditionalQuestionText) {
        if (element.type.toLowerCase() === "radiobutton") {
          returnValue = checkBooleanValue(element.value);
        } else if (element.type.toLowerCase() === "text") {
          returnValue = element.value;
        } else if (element.type.toLowerCase() === "date") {
          returnValue = formatISODate(element.value, element.valid);
        }
      }
    }
  );
  return returnValue === undefined ? null : returnValue;
};

const getSecondaryAdditionalQuestionValue = (
  NewOrderObj: NewOrderContextType | null,
  AdditionalQuestionText: String
) => {
  let returnValue;
  NewOrderObj?.secondaryAdditionalQuestions?.additionalQuestion.map(
    (element: any) => {
      if (element.text === AdditionalQuestionText) {
        if (element.type.toLowerCase() === "radiobutton") {
          returnValue = checkBooleanValue(element.value);
        } else if (element.type.toLowerCase() === "text") {
          returnValue = element.value;
        } else if (element.type.toLowerCase() === "date") {
          returnValue = formatISODate(element.value, element.valid);
        }
      }
    }
  );
  return returnValue === undefined ? null : returnValue;
};
