import React, { createContext, useState } from "react";
import { IManageAccount } from "../components/manageAccount/manageAccount.interface";
import { defaultAccountData } from "../components/manageAccount/manageAccount.model";
import { IFacility } from "../components/manageProfile/facilityInformation/facility.interface";
import { IUser } from "../components/manageProfile/user.interface";
import { IUserRolesPermission } from "../components/myPatients/userRolesPermission.interface";
import { sideNavMenuOptionModel } from "../components/sideNav/sideNaveMenuOptions.model";
import { ISideNav } from "../components/sideNav/sideNavMenuOption.interface";
import { getDeepClone } from "../util/ObjectFunctions";

export type AuthContextType = {
  isLoggedIn: boolean | null;
  userName: string | undefined;
  profileSaveAuthicated: boolean | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
  setUserName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setProfileSaveAuthicated: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  isLoading: boolean | undefined;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  terms: string | undefined;
  setTerms: React.Dispatch<React.SetStateAction<string | undefined>>;
  preferredUserName: string | undefined;
  setpreferredUserName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  userProfile: IUser | undefined;
  setUserProfile: React.Dispatch<React.SetStateAction<IUser | undefined>>;

  setTermsOfUseAccepted: React.Dispatch<React.SetStateAction<boolean | null>>;
  termsOfUseAccepted: boolean | null;
  registeredFaciltyAddress: IFacility | undefined;
  setregisteredFaciltyAddress: React.Dispatch<
    React.SetStateAction<IFacility | undefined>
  >;
  manageAccountData: IManageAccount | undefined;
  setManageAccountData: React.Dispatch<
    React.SetStateAction<IManageAccount | undefined>
  >;
  manageAccountProgbarVal: number;
  setManageAccountProgbarVal: React.Dispatch<React.SetStateAction<number>>;
  verificationType: string;
  setVerificationType: React.Dispatch<React.SetStateAction<string>>;
  userRolePermissionData: IUserRolesPermission | null;
  setuserRolePermissionData: React.Dispatch<
    React.SetStateAction<IUserRolesPermission | null>
  >;
  sideNavMenuOptionModelData: ISideNav;
  setsideNavMenuOptionModelData: React.Dispatch<React.SetStateAction<ISideNav>>;
  userRolesAndPermissionLoaded: boolean | null;
  setuserRolesAndPermissionLoaded: React.Dispatch<
    React.SetStateAction<boolean | null>
  >;
  isInternalUser: boolean;
  setIsInternalUser: React.Dispatch<React.SetStateAction<boolean>>;
  isInternalUserFacilitySelected: boolean;
  setIsInternalUserFacilitySelected: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  updateInternalUser: boolean;
  setUpdateInternalUser: React.Dispatch<React.SetStateAction<boolean>>;
  unLinkedFacilitesCount: string | undefined;
  setUnLinkedFacilityCount: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  deepLinkPath: string | null;
  setDeepLinkPath: React.Dispatch<React.SetStateAction<string | null>>;

  allFacilities: IFacility[];
  setAllFacilties: React.Dispatch<React.SetStateAction<IFacility[]>>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userName, setUserName] = useState<string | undefined>();
  const [profileSaveAuthicated, setProfileSaveAuthicated] = useState<
    boolean | null
  >(false);
  const [preferredUserName, setpreferredUserName] = useState<
    string | undefined
  >("");
  const [terms, setTerms] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const [userProfile, setUserProfile] = useState<IUser | undefined>(undefined);
  const [termsOfUseAccepted, setTermsOfUseAccepted] = useState<boolean | null>(
    false
  );
  const [registeredFaciltyAddress, setregisteredFaciltyAddress] =
    useState<IFacility>();
  const [manageAccountData, setManageAccountData] = useState<
    IManageAccount | undefined
  >(getDeepClone(defaultAccountData));
  const [manageAccountProgbarVal, setManageAccountProgbarVal] =
    useState<number>(25);
  const [verificationType, setVerificationType] = useState<string>("");
  const [userRolePermissionData, setuserRolePermissionData] =
    useState<IUserRolesPermission | null>(null);
  const [sideNavMenuOptionModelData, setsideNavMenuOptionModelData] =
    useState<ISideNav>(getDeepClone(sideNavMenuOptionModel));
  const [userRolesAndPermissionLoaded, setuserRolesAndPermissionLoaded] =
    useState<boolean | null>(null);

  const [isInternalUser, setIsInternalUser] = useState<boolean>(false);
  const [isInternalUserFacilitySelected, setIsInternalUserFacilitySelected] =
    useState<boolean>(true);
  const [updateInternalUser, setUpdateInternalUser] = useState<boolean>(false);
  const [unLinkedFacilitesCount, setUnLinkedFacilityCount] = useState<
    string | undefined
  >();
  const [deepLinkPath, setDeepLinkPath] = useState<string | null>(null);
  const [allFacilities, setAllFacilties] = useState<IFacility[]>([]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        profileSaveAuthicated,
        setProfileSaveAuthicated,
        isLoading,
        setIsLoading,
        terms,
        setTerms,
        preferredUserName,
        setpreferredUserName,
        userProfile,
        setUserProfile,
        registeredFaciltyAddress,
        setregisteredFaciltyAddress,
        setTermsOfUseAccepted,
        termsOfUseAccepted,
        manageAccountData,
        setManageAccountData,
        manageAccountProgbarVal,
        setManageAccountProgbarVal,
        verificationType,
        setVerificationType,
        userRolePermissionData,
        setuserRolePermissionData,
        sideNavMenuOptionModelData,
        setsideNavMenuOptionModelData,
        userRolesAndPermissionLoaded,
        setuserRolesAndPermissionLoaded,
        isInternalUser,
        setIsInternalUser,
        isInternalUserFacilitySelected,
        setIsInternalUserFacilitySelected,
        updateInternalUser,
        setUpdateInternalUser,
        unLinkedFacilitesCount,
        setUnLinkedFacilityCount,
        deepLinkPath,
        setDeepLinkPath,
        allFacilities,
        setAllFacilties,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
