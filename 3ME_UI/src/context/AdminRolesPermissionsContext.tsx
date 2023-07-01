import { createContext, useState } from "react";

export type AdminRolesPermissionsContextType = {
  permissions: [];
  setPermissions: React.Dispatch<React.SetStateAction<[]>>;
  originalPermissions: [];
  setOriginalPermissions: React.Dispatch<React.SetStateAction<[]>>;
  isRolePermissionChanged: boolean;
  setIsRolePermissionChanged: React.Dispatch<React.SetStateAction<boolean>>;

  resetRoleSettings: () => void;
};

type AdminRolesPermissionsProviderProps = {
  children: React.ReactNode;
};
export const AdminRolesPermissionsContext =
  createContext<AdminRolesPermissionsContextType | null>(null);
export const AdminRolesPermissionsContextProvider = ({
  children,
}: AdminRolesPermissionsProviderProps) => {
  const [permissions, setPermissions] = useState<[]>([]);
  const [originalPermissions, setOriginalPermissions] = useState<[]>([]);
  const [isRolePermissionChanged, setIsRolePermissionChanged] =
    useState<boolean>(false);

  const resetRoleSettings = () => {
    setPermissions([]);
    setOriginalPermissions([]);
    setIsRolePermissionChanged(false);
  };

  return (
    <AdminRolesPermissionsContext.Provider
      value={{
        permissions,
        setPermissions,
        originalPermissions,
        setOriginalPermissions,
        isRolePermissionChanged,
        setIsRolePermissionChanged,
        resetRoleSettings,
      }}
    >
      {children}
    </AdminRolesPermissionsContext.Provider>
  );
};
