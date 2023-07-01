import React, { createContext, useState } from "react";
import { UpdateContactInfoPopUpSection } from "../components/manageProfile/contactInformation/popUpContainer.enum";
import {
  IManageProfile,
  ITerritoryData,
} from "../components/manageProfile/manageProfile.interface";
import { defaultRegistrationFormData } from "../signUp/registration/registrationForm/registrationForm.model";
import { getDeepClone } from "../util/ObjectFunctions";

export type ProfileFormContextType = {
  profileDetails: IManageProfile;
  setProfileDetails: React.Dispatch<React.SetStateAction<IManageProfile>>;
  territoryData: ITerritoryData[] | undefined;
  setTerritoryData: React.Dispatch<
    React.SetStateAction<ITerritoryData[] | undefined>
  >;
  originalProfileDetails: IManageProfile;
  setOriginalProfileDetails: React.Dispatch<
    React.SetStateAction<IManageProfile>
  >;
  registeredFacility: any;
  setRegisteredFacility: React.Dispatch<React.SetStateAction<any>>;
  resetProfileForm: () => void;
  // Communication preferences
  contInfoSmsDisabled: boolean;
  setContInfoSmsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  smsAcceptDisabled: boolean;
  setSmsAcceptDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  smsTnCAcceptedDate: Date | null;
  setSmsTnCAcceptedDate: React.Dispatch<React.SetStateAction<any>>;
  isTnCOpen: boolean;
  setIsTnCOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trashIconVisibility: boolean;
  setTrashIconVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  keepMeUpdatedVal: boolean;
  setKeepMeUpdatedVal: React.Dispatch<React.SetStateAction<boolean>>;
  isLandlineSelected: boolean;
  setIsLandlineSelected: React.Dispatch<React.SetStateAction<boolean>>;
  renderManageProfile: boolean;
  setrenderManageProfile: React.Dispatch<React.SetStateAction<boolean>>;
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  popUpSection: UpdateContactInfoPopUpSection;
  setPopUpSection: React.Dispatch<
    React.SetStateAction<UpdateContactInfoPopUpSection>
  >;
  isOnlyEmailPreference: boolean;
  setIsOnlyEmailPreference: React.Dispatch<React.SetStateAction<boolean>>;
};

type ProfileFormContextProviderProps = {
  children: React.ReactNode;
};

export const ProfileFormContext = createContext<ProfileFormContextType | null>(
  null
);

export const ProfileFormContextProvider = ({
  children,
}: ProfileFormContextProviderProps) => {
  const [profileDetails, setProfileDetails] = useState<IManageProfile>(
    getDeepClone(defaultRegistrationFormData)
  );
  const [originalProfileDetails, setOriginalProfileDetails] =
    useState<IManageProfile>(getDeepClone(defaultRegistrationFormData));
  const [registeredFacility, setRegisteredFacility] = useState([]);
  const [contInfoSmsDisabled, setContInfoSmsDisabled] = useState(false);
  const [smsAcceptDisabled, setSmsAcceptDisabled] = useState(true);
  const [smsTnCAcceptedDate, setSmsTnCAcceptedDate] = useState(null);
  const [keepMeUpdatedVal, setKeepMeUpdatedVal] = useState(false);
  const [isTnCOpen, setIsTnCOpen] = useState(false);
  const [trashIconVisibility, setTrashIconVisibility] = useState(false);
  const [isLandlineSelected, setIsLandlineSelected] = useState(false);
  const [renderManageProfile, setrenderManageProfile] = useState<boolean>(true);
  const [editable, setEditable] = useState<boolean>(false);
  const resetProfileForm = () => {
    setProfileDetails(getDeepClone(defaultRegistrationFormData));
    setRegisteredFacility([]);
    setContInfoSmsDisabled(false);
    setSmsAcceptDisabled(true);
    setSmsTnCAcceptedDate(null);
    setIsTnCOpen(false);
    setTrashIconVisibility(false);
    setKeepMeUpdatedVal(false);
    setIsLandlineSelected(false);
  };
  const [popUpSection, setPopUpSection] =
    useState<UpdateContactInfoPopUpSection>(UpdateContactInfoPopUpSection.NONE);
  const [isOnlyEmailPreference, setIsOnlyEmailPreference] =
    useState<boolean>(false);
  const [territoryData, setTerritoryData] = useState<
    ITerritoryData[] | undefined
  >(undefined);

  return (
    <ProfileFormContext.Provider
      value={{
        profileDetails,
        setProfileDetails,
        originalProfileDetails,
        setOriginalProfileDetails,
        registeredFacility,
        setRegisteredFacility,
        resetProfileForm,
        contInfoSmsDisabled,
        setContInfoSmsDisabled,
        smsAcceptDisabled,
        setSmsAcceptDisabled,
        smsTnCAcceptedDate,
        setSmsTnCAcceptedDate,
        isTnCOpen,
        setIsTnCOpen,
        trashIconVisibility,
        setTrashIconVisibility,
        keepMeUpdatedVal,
        setKeepMeUpdatedVal,
        isLandlineSelected,
        setIsLandlineSelected,
        renderManageProfile,
        setrenderManageProfile,
        editable,
        setEditable,
        popUpSection,
        setPopUpSection,
        isOnlyEmailPreference,
        setIsOnlyEmailPreference,
        territoryData,
        setTerritoryData,
      }}
    >
      {children}
    </ProfileFormContext.Provider>
  );
};
