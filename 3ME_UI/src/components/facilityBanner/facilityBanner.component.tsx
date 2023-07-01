import { Grid } from "@mui/material";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import "./facilityBanner.css";
import { IFacility } from "../manageProfile/facilityInformation/facility.interface";
import { fetchUserLinkedFacilities } from "../../util/userService";
import { FacilityBannerAdmin } from "./facilityBannerAdmin/facilityBannerAdmin.component";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";

type Props = {
  isComponentVisibleTest?: boolean;
  isLoadUI?: boolean;
};
export const FacilityBanner = ({
  isComponentVisibleTest = false,
  isLoadUI = false,
}: Props) => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const [userLinkedFacilityData, setuserLinkedFacilityData] =
    useState<IFacility[]>();
  const [loadUI, setLoadUI] = useState<boolean>(isLoadUI);

  const loadUserLinkedFacilities = async () => {
    if (AuthObj?.isInternalUser) {
      let sa: IFacility[] = [];
      if (AuthObj?.registeredFaciltyAddress !== undefined) {
        sa.push(AuthObj?.registeredFaciltyAddress!);
        setuserLinkedFacilityData(sa);
        AuthObj?.setAllFacilties(sa);
        setLoadUI(true);
      }
    } else {
      const responseObj = await fetchUserLinkedFacilities();
      setuserLinkedFacilityData(responseObj);
      AuthObj?.setAllFacilties(responseObj);
      setLoadUI(true);
    }
  };

  useEffect(() => {
    loadUserLinkedFacilities();
  }, []);

  return (
    <>
      {loadUI &&
      !(
        permissionObj &&
        permissionObj.mappedRolesPermissionData.IsClinicianRole &&
        userLinkedFacilityData &&
        userLinkedFacilityData.length <= 1
      ) ? (
        <div className="facilityBanner" data-testid="facility-Banner">
          <Grid container spacing={2} className="facilityGridAlign">
            {AuthObj?.userRolesAndPermissionLoaded &&
              userLinkedFacilityData &&
              userLinkedFacilityData.length > 0 && (
                <FacilityBannerAdmin
                  userLinkedFacilityData={userLinkedFacilityData}
                />
              )}
          </Grid>
        </div>
      ) : null}
    </>
  );
};
