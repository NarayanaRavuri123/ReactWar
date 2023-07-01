import { ProfileFormContextType } from "../../../context/ProfileFormContext";
import { UpdateContactInfoPopUpSection } from "../../../components/manageProfile/contactInformation/popUpContainer.enum";
import { defaultRegistrationFormData } from "../../../signUp/registration/registrationForm/registrationForm.model";
import { getDeepClone } from "../../../util/ObjectFunctions";

export const getMockRegistrationFormData = (): ProfileFormContextType => ({
  profileDetails: getDeepClone(defaultRegistrationFormData),
  setProfileDetails: () => {},
  originalProfileDetails: getDeepClone(defaultRegistrationFormData),
  setOriginalProfileDetails: () => {},
  registeredFacility: [],
  setRegisteredFacility: () => {},
  resetProfileForm: () => void {},
  contInfoSmsDisabled: false,
  setContInfoSmsDisabled: () => {},
  smsAcceptDisabled: true,
  setSmsAcceptDisabled: () => {},
  smsTnCAcceptedDate: null,
  setSmsTnCAcceptedDate: () => {},
  isTnCOpen: false,
  setIsTnCOpen: () => {},
  trashIconVisibility: false,
  setTrashIconVisibility: () => {},
  keepMeUpdatedVal: false,
  setKeepMeUpdatedVal: () => {},
  isLandlineSelected: false,
  setIsLandlineSelected: () => {},
  renderManageProfile: true,
  setrenderManageProfile: () => {},
  editable: false,
  setEditable: () => {},
  popUpSection: UpdateContactInfoPopUpSection.NONE,
  setPopUpSection: () => {},
  isOnlyEmailPreference: false,
  setIsOnlyEmailPreference: () => {},
  territoryData: undefined,
  setTerritoryData: () => {},
});
