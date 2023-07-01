import { createContext, useState } from "react";
import { getDeepClone } from "../util/ObjectFunctions";
import { IUserProfile } from "../components/administration/manageUsers/userProfile/userProfile.interface";
import { defaultUserProfileData } from "../components/administration/manageUsers/userProfile/userProfile.model";

export type UserProfileContextType = {
  profileDetails: IUserProfile;
  setProfileDetails: React.Dispatch<React.SetStateAction<IUserProfile>>;
  resetUserProfile: () => void;
};

type UserProfileContextProviderProps = {
  children: React.ReactNode;
};

export const UserProfileContext = createContext<UserProfileContextType | null>(
  null
);

export const UserProfileContextProvider = ({
  children,
}: UserProfileContextProviderProps) => {
  const [profileDetails, setProfileDetails] = useState<IUserProfile>(
    getDeepClone(defaultUserProfileData)
  );
  const resetUserProfile = () => {
    setProfileDetails(getDeepClone(defaultUserProfileData));
  };
  return (
    <UserProfileContext.Provider
      value={{
        profileDetails,
        setProfileDetails,
        resetUserProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
