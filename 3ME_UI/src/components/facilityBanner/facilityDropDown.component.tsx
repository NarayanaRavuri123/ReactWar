import react, { useContext, useEffect, useState } from "react";
import { IFacility } from "../manageProfile/facilityInformation/facility.interface";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { CustomDropDown } from "../../core/customDropdown/customDropdown.component";
import {
  getFcilityAddress,
  getLinkedfacilityAddressData,
} from "../../util/utilityFunctions";
import { getUserRolePermission } from "../../util/userService";
import { IPermissionData } from "../../RolesPermission/RolesPermission.model";
import { mapUserRolesAndPermissionData } from "../../RolesPermission/RolesPermission.Mapper";
import { ISideNav } from "../sideNav/sideNavMenuOption.interface";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";

type Props = {
  userLinkedFacilityData: IFacility[];
};
export const FacilityDropDown = ({ userLinkedFacilityData }: Props) => {
  const AuthObj = react.useContext<AuthContextType | null>(AuthContext);
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [facilityList, setFacilityList] = useState<string[] | null>(null);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const validateAndSetDropDownData = async (e: any) => {
    let selectedFacilityData = e.target.value.split(", ");
    let facilityObj;
    setSelectedFacility(e.target.value);
    if (selectedFacilityData.length > 0) {
      facilityObj = userLinkedFacilityData.filter(
        (x) =>
          x.accountName.toLowerCase() ===
            selectedFacilityData[0].toLowerCase() &&
          x.address1.toLowerCase() === selectedFacilityData[1].toLowerCase()
      )[0];
    }
    if (facilityObj?.facilityAddressID !== undefined) {
      const userRolesPermissionResponse = await getUserRolePermission(
        facilityObj?.facilityAddressID
      );
      AuthObj?.setuserRolePermissionData(userRolesPermissionResponse.data);
      const rolesPermissionRes: IPermissionData =
        await mapUserRolesAndPermissionData(
          userRolesPermissionResponse.data!,
          facilityObj?.readyCareFlag
        );
      permissionObj?.setMappedRolesPermissionData(rolesPermissionRes);
      AuthObj?.setsideNavMenuOptionModelData((dt: ISideNav) => ({
        ...dt,
        orders: {
          ...dt.orders,
          isVisible: rolesPermissionRes.IsShowStartNewOrder,
        },
        inventory: {
          ...dt.inventory,
          isVisible: rolesPermissionRes.IsShowInventoryOption,
        },
        administration: {
          ...dt.administration,
          isVisible: rolesPermissionRes.IsShowAdminstrationOption,
        },
      }));
      AuthObj?.setuserRolesAndPermissionLoaded(true);
      if (facilityObj) {
        AuthObj?.setregisteredFaciltyAddress(facilityObj);
      }
    }
  };

  const updateFacilityList = () => {
    let selectedVal: string = "";
    const newArray = getLinkedfacilityAddressData(userLinkedFacilityData);
    if (AuthObj?.registeredFaciltyAddress) {
      selectedVal = getFcilityAddress(AuthObj.registeredFaciltyAddress);
    } else if (userLinkedFacilityData.length > 0) {
      selectedVal = getFcilityAddress(userLinkedFacilityData[0]);
    }
    setSelectedFacility(selectedVal);
    setFacilityList(newArray);
  };

  useEffect(() => {
    updateFacilityList();
  }, []);

  return (
    <>
      {selectedFacility && facilityList && (
        <CustomDropDown
          name="facilityDropDown"
          menuItem={facilityList}
          handleChange={validateAndSetDropDownData}
          selectpropsClassName="facilityBanner-select"
          selectClassName="facilityBanner-input"
          testId="facility-DropDown"
          value={selectedFacility}
        />
      )}
      {!selectedFacility && <div></div>}
    </>
  );
};
