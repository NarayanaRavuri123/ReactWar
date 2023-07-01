import { useContext, useEffect, useState } from "react";
import "./favoriteFacility.css";
import Table from "../../core/customSortingTable/table.component";
import {
  makeCapitalEachOfWordInString,
  makeCapitalEachWordInString,
  useSortableTable,
} from "../../util/utilityFunctions";
import {
  getUserFavouriteFacilities,
  selectFacility,
} from "../../util/userService";
import { updateFavouriteFacility } from "../../util/userService";
import Favorite from "../../assets/Favorite.png";
import { AuthContextType, AuthContext } from "../../context/AuthContext";
import { searchFacility } from "../../components/manageProfile/facilityInformation/addFacility/addFacility.service";
import { mapUserRolesAndPermissionData } from "../../RolesPermission/RolesPermission.Mapper";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";
import { ISideNav } from "../../components/sideNav/sideNavMenuOption.interface";
import { LoadingSpinner } from "../../core/loader/LoadingSpinner";
import { useHistory, useLocation } from "react-router-dom";
import { Popup } from "../../core/popup/popup.component";
import {
  getUnlinkedFacilitesCount,
  getCareGiverId,
} from "../../util/3meService";

const FavoriteFacility = () => {
  const columns = [
    { label: "", accessor: "orderID", sortable: false },
    {
      label: "Facility Site Name",
      accessor: "accountName",
      sortable: true,
    },
    { label: "Favorite", accessor: "isFavorite", sortable: true },
    { label: "Facility No.", accessor: "accountNumber", sortable: true },
    {
      label: "Classification",
      accessor: "marketingSegmentDesc",
      sortable: true,
    },
    { label: "Setting", accessor: "careSetting", sortable: true },
  ];
  const [sortedData, setSortedData, handleSorting] = useSortableTable(
    [],
    columns
  );

  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const history = useHistory();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    if (AuthObj?.userProfile) {
      getUserFavFacilities();
    }
  }, [!sortedData, AuthObj?.userProfile]);
  useEffect(() => {
    if (location.pathname !== currentPath) {
      setCurrentPath(location.pathname);
    }
  }, []);
  const getUserFavFacilities = async () => {
    if (!loader) {
      setLoader(true);
    }
    const favFacilities = await getUserFavouriteFacilities(
      AuthObj?.userProfile?.userName
    );
    if (favFacilities !== undefined) {
      setSortedData(favFacilities);
    }
    setLoader(false);
  };
  const updateFavFacility = async (e: any) => {
    const updateFacilities = await updateFavouriteFacility(
      AuthObj?.userProfile?.userName,
      e.siteUseId,
      FavoriteType.REMOVEFAVORITE
    );
    if (updateFacilities) {
      getUserFavFacilities();
    }
  };
  const Spinner = () => {
    return (
      <div className="facility-spinner">
        <LoadingSpinner />
      </div>
    );
  };

  const handleFavLink = (e: any) => {
    setLoader(true);
    updateFavFacility(e);
  };

  const handleSelectClick = async (e: any) => {
    if (currentPath === "/ssoRedirect") {
      localStorage.setItem("isComingFromSSO", "false");
    }
    const reqBody = {
      UserName: AuthObj?.userProfile?.userName,
      SiteUseId: e.target.id,
    };
    if (!loader) {
      setLoader(true);
    }
    const userPermissions = await selectFacility(reqBody);
    const data = sortedData.filter((x: any) => x.siteUseId === e.target.id)[0];
    AuthObj?.setuserRolePermissionData(userPermissions);
    await searchFacilityAddr(data, userPermissions);
    setLoader(false);
  };

  const searchFacilityAddr = async (data: any, userPermissions: any) => {
    let tempSideNavMenuOption: ISideNav;
    let readyCareFlag = "N";

    var facilitySearchRequest = {
      customerNumber: data.accountNumber,
      customerName: "",
      postalCode: "",
    };
    const searchedFacilities = await searchFacility(facilitySearchRequest);
    if (searchedFacilities) {
      const facilityRes = searchedFacilities.filter((x) => {
        if (x.siteUseId === data.siteUseId.toString()) {
          return x;
        }
      })[0];
      readyCareFlag = facilityRes.readyCareFlag!;
      facilityRes.isFavourite = true;
      //Set CareGiverId
      const caregiverId = await getCareGiverId(
        facilityRes.accountNumber?.toString(),
        facilityRes.typeCode
      );
      facilityRes.careGiverId = caregiverId;
      AuthObj?.setregisteredFaciltyAddress(facilityRes);
      const rolesPermissionRes = await mapUserRolesAndPermissionData(
        userPermissions,
        readyCareFlag
      );

      permissionObj?.setMappedRolesPermissionData(rolesPermissionRes);
      let adminText: any = "Administration";
      if (
        (AuthObj?.unLinkedFacilitesCount && rolesPermissionRes.Is3MAdminRole) ||
        (AuthObj?.unLinkedFacilitesCount &&
          rolesPermissionRes.IsProdManagerRole) ||
        (AuthObj?.unLinkedFacilitesCount && rolesPermissionRes.IsSupportRole)
      ) {
        adminText = (
          <div className="sideNavmadminBtnMain">
            Administration
            <span className="sideNavmadminBtnStyle">
              {AuthObj?.unLinkedFacilitesCount}{" "}
            </span>{" "}
          </div>
        );
      }

      tempSideNavMenuOption = {
        ...AuthObj?.sideNavMenuOptionModelData!,
        orders: {
          labelText: "Start New Order",
          isVisible: rolesPermissionRes.IsShowStartNewOrder,
        },
        inventory: {
          labelText: "Inventory",
          isVisible: rolesPermissionRes.IsShowInventoryOption,
        },
        administration: {
          labelText: adminText,
          isVisible: rolesPermissionRes.IsShowAdminstrationOption,
        },
      };

      AuthObj?.setuserRolesAndPermissionLoaded(true);
      AuthObj?.setIsInternalUserFacilitySelected(true);
      history.push("/home");
    }

    AuthObj?.setsideNavMenuOptionModelData(tempSideNavMenuOption!);
  };

  return (
    <div className="favoriteFacility-subMain">
      <div className="favorite-facility" data-testid="favorite-facility">
        Your Favorites
      </div>
      <Popup closeHandler={Spinner} openFlag={loader} hideCloseButton={true}>
        <div className="facility-spinner">
          <LoadingSpinner />
        </div>
      </Popup>

      <div className="tables_container" data-testid="Facility-list">
        <Table
          tableClassName="tables"
          tableColumns={columns}
          handleSorting={handleSorting}
        >
          {columns && sortedData && sortedData.length > 0 ? (
            <tbody>
              {sortedData.map((data: any) => {
                return (
                  <tr key={data.id}>
                    <td
                      className="select-facility"
                      id={data.siteUseId}
                      onClick={handleSelectClick}
                    >
                      Select
                    </td>
                    <td className="tables-static-data">
                      {makeCapitalEachWordInString(data.accountName)}
                      <br />
                      {makeCapitalEachWordInString(data.address1)},{" "}
                      {data.address2
                        ? makeCapitalEachWordInString(data.address2) + ","
                        : ""}{" "}
                      {makeCapitalEachWordInString(data.city)},{" "}
                      {makeCapitalEachOfWordInString(data.state)},{" "}
                      {makeCapitalEachWordInString(data.zip)}
                    </td>

                    <td className="tables-static-data">
                      <div className="imgclick">
                        <img
                          src={Favorite}
                          alt={Favorite}
                          onClick={() => handleFavLink(data)}
                        ></img>
                      </div>
                    </td>
                    <td className="tables-static-data">
                      {makeCapitalEachWordInString(`${data.accountNumber}`)}
                    </td>
                    <td className="tables-static-data">
                      {makeCapitalEachWordInString(
                        `${data.marketingSegmentDesc}`
                      )}
                    </td>
                    <td className="tables-static-data">
                      {makeCapitalEachWordInString(`${data.careSetting}`)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : null}
        </Table>
      </div>
    </div>
  );
};
export default FavoriteFacility;
export enum FavoriteType {
  ADDFAVORITE = 1,
  REMOVEFAVORITE = 2,
}
