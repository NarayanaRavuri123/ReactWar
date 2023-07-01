import { createContext, useState } from "react";
import { IFacility } from "../components/manageProfile/facilityInformation/facility.interface";

export type FacilitySettingsContextType = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  selectedFacility: IFacility | undefined;
  setSelectedFacility: React.Dispatch<
    React.SetStateAction<IFacility | undefined>
  >;
  permissions: [];
  setPermissions: React.Dispatch<React.SetStateAction<[]>>;
  originalPermissions: [];
  setOriginalPermissions: React.Dispatch<React.SetStateAction<[]>>;

  isFacilityPermissionChanged: boolean;
  setIsFacilityPermissionChanged: React.Dispatch<React.SetStateAction<boolean>>;

  resetFacilitySettings: () => void;
};

type FacilitySettingProviderProps = {
  children: React.ReactNode;
};
export const FacilitySettingContext =
  createContext<FacilitySettingsContextType | null>(null);
export const FacilitySettingsProvider = ({
  children,
}: FacilitySettingProviderProps) => {
  const [userName, setUserName] = useState<string>("");
  const [selectedFacility, setSelectedFacility] = useState<IFacility>();
  const [permissions, setPermissions] = useState<[]>([]);
  const [originalPermissions, setOriginalPermissions] = useState<[]>([]);
  const [isFacilityPermissionChanged, setIsFacilityPermissionChanged] =
    useState<boolean>(false);

  const resetFacilitySettings = () => {
    setUserName("");
    setPermissions([]);
    setOriginalPermissions([]);
    setSelectedFacility(undefined);
    setIsFacilityPermissionChanged(false);
  };

  return (
    <FacilitySettingContext.Provider
      value={{
        permissions,
        setPermissions,
        originalPermissions,
        setOriginalPermissions,
        isFacilityPermissionChanged,
        setIsFacilityPermissionChanged,
        selectedFacility,
        setSelectedFacility,
        userName,
        setUserName,
        resetFacilitySettings,
      }}
    >
      {children}
    </FacilitySettingContext.Provider>
  );
};
