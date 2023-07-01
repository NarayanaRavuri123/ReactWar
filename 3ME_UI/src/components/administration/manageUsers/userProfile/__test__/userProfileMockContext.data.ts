import { UserProfileContextType } from "../../../../../context/UserProfileContext";
import { mockUserProfileData } from "../userProfile.model";

export const getMockUserProfileContextData = (): UserProfileContextType => {
  return {
    profileDetails: mockUserProfileData,
    setProfileDetails: () => {},
    resetUserProfile: () => {},
  };
};
