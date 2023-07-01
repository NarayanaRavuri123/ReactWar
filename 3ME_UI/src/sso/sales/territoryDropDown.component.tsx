import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import {
  CustomDropDown,
  DropDownValue,
} from "../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../core/inputWithLabel/inputWithLabel.component";
import {
  getFacilitySearchResultByTerritory,
  getUserTerritories,
} from "../../util/userService";
import { getCodeFromText, getTextFromCode } from "../../util/utilityFunctions";
import { useSortableTable } from "../../util/utilityFunctions";
import SearchFacilityResult from "../searchFacilities/searchFacilityResult/searchFacilityResult.component";
import "./salesRoleFacility.css";

export const TerritorySalesAndNonSales = ({ salesRole }: any) => {
  const [territoryView, setTerritoryView] = useState([]);
  const [territoryViewText, setTerritoryViewText] = useState([]);
  const [selectedTerritory, setSelectedTerritory] = useState<string>("");
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchSelected, setIsSearchSelected] = useState(false);
  const [data, setData] = useState([]);
  const columns = [
    { label: "", accessor: "select", sortable: false },
    {
      label: "Facility Site Name",
      accessor: "accountName",
      sortable: true,
    },
    { label: "Favorite", accessor: "isFavourite", sortable: true },
    { label: "Facility No.", accessor: "accountNumber", sortable: true },
    {
      label: "Classification",
      accessor: "typeName",
      sortable: true,
    },
    { label: "Setting", accessor: "careSetting", sortable: true },
  ];
  const [sortedData, setSortedData, handleSorting] = useSortableTable(
    [],
    columns
  );

  useEffect(() => {
    if (AuthObj?.userProfile) {
      getTerritories();
    }
  }, [AuthObj?.userProfile]);

  useEffect(() => {
    if (selectedTerritory) {
      getFacilityListByTerritory(selectedTerritory);
    }
  }, [selectedTerritory]);

  const getFacilityListByTerritory = async (code: string) => {
    const reqBody = {
      userName: AuthObj?.userProfile?.userName,
      territoryCode: code,
    };
    setIsLoading(true);
    setSortedData([]);
    const searchResult = await getFacilitySearchResultByTerritory(reqBody);
    if (searchResult && searchResult.data !== null) {
      setData(searchResult.result);
      setSortedData(searchResult.result);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log("No data Available");
    }
  };

  const getTerritories = async () => {
    const territories = await getUserTerritories(
      AuthObj?.userProfile?.userName
    );
    if (territories !== undefined) {
      if (territories.length > 0) {
        let territoryObject: any = [];
        territories.map((x: { code: string; name: string }) => {
          const dropDownValue: DropDownValue = {
            code: x.code,
            text: x.code + " " + x.name,
          };
          territoryObject.push(dropDownValue);
        });
        const territoryTextObject = territories.map(
          (x: { name: string; code: string }) => x.code + " " + x.name
        );
        setTerritoryView(territoryObject);
        setTerritoryViewText(territoryTextObject);
        if (territoryTextObject && territoryTextObject.length > 0) {
          const territoryCode = getCodeFromText(
            territoryObject,
            territoryTextObject[0].toString()
          );

          if (territoryCode) {
            setSelectedTerritory(territoryCode);
          }
        }
      }
    }
  };

  const handleChange = (e: any) => {
    setIsSearchSelected(true);
    let value = e.target.value;
    value = getCodeFromText(territoryView, e.target.value);
    setSelectedTerritory(value);
  };

  return (
    <>
      <div className="territoryView" data-testid="territoryView">
        <InputWithLabel label="Territory to view" testId={"territory-view"}>
          <CustomDropDown
            name="TerritoryView"
            menuItem={territoryViewText}
            handleChange={handleChange}
            selectpropsClassName="territoryView-select"
            selectClassName="territoryView-input"
            testId="territoryView-DropDown"
            value={
              selectedTerritory
                ? getTextFromCode(territoryView, selectedTerritory)
                : ""
            }
          />
        </InputWithLabel>
      </div>
      <SearchFacilityResult
        sortedData={sortedData}
        setSortedData={setSortedData}
        handleSorting={handleSorting}
        columns={columns}
        isLoading={isLoading}
        data={data}
        salesRole={salesRole}
        isSearchSelected={isSearchSelected}
        setIsSearchSelected={setIsSearchSelected}
        setData={setData}
      />
    </>
  );
};
