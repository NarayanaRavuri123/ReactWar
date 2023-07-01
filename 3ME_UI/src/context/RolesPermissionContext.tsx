import {
  defaultPermissionDataModel,
  IPermissionData,
} from "../RolesPermission/RolesPermission.model";
import React, { createContext, useState } from "react";
import { getDeepClone } from "../util/ObjectFunctions";

export type RolesPermissionContextType = {
  mappedRolesPermissionData: IPermissionData;
  setMappedRolesPermissionData: React.Dispatch<
    React.SetStateAction<IPermissionData>
  >;
};

type RolesPermissionContextProviderProps = {
  children: React.ReactNode;
};

export const RolesPermissionContext =
  createContext<RolesPermissionContextType | null>(null);

export const RolesPermissionContextProvider = ({
  children,
}: RolesPermissionContextProviderProps) => {
  const [mappedRolesPermissionData, setMappedRolesPermissionData] =
    useState<IPermissionData>(getDeepClone(defaultPermissionDataModel));
  return (
    <RolesPermissionContext.Provider
      value={{
        mappedRolesPermissionData,
        setMappedRolesPermissionData,
      }}
    >
      {children}
    </RolesPermissionContext.Provider>
  );
};
