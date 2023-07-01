import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { LoadingSpinner } from "../../../../../core/loader/LoadingSpinner";
import { SearchPrescriberModal } from "../../searchPrescriber.enum";
import "./nationalRegistryResult.css";
import NationalRegistryResultList from "./nationalRegistryResultList.component";
import { ReactComponent as SearchIconSvg } from "../../../../../assets/blackSearchIcon.svg";
import { useSortableTable } from "../../../../../util/utilityFunctions";
import {
  defaultNationalRegistryFilterBox,
  IFilterNationalRegistry,
} from "./filterNationalRegistry.model";
import { NewOrderValidator } from "../../../newOrder.validator";
import { INationalRegistry } from "./nationalRegistry.interface";

type Props = {
  handlePrescriberSearchType: any;
  nationalRegistryList: any;
};

const columns = [
  { label: "", accessor: "orderID", sortable: false },
  { label: "Prescriber Name", accessor: "prescriberFirstName", sortable: true },
  { label: "NPI #", accessor: "npi", sortable: true },
  { label: "City", accessor: "city", sortable: true },
  { label: "State", accessor: "state", sortable: true },
];

const NationalRegistryResult = ({
  handlePrescriberSearchType,
  nationalRegistryList,
}: Props) => {
  const [showNoData, setShowNoData] = useState(true);
  const [filterNPI, setFilterNPI] = useState<IFilterNationalRegistry>(
    defaultNationalRegistryFilterBox
  );
  const [sortedData, setSortedData, handleSorting] = useSortableTable(
    [],
    columns
  );
  useEffect(() => {
    if (nationalRegistryList.length > 0) {
      setSortedData(nationalRegistryList);
      setShowNoData(false);
    }
  }, []);

  const noData = () => {
    return (
      <div className="nr-no-data">No data found. Please search again.</div>
    );
  };

  const handleFilterNPI = (e: any) => {
    const validator = new NewOrderValidator();
    const { value } = e.target;
    const isvalid = validator.validate(value, e.target.name);
    setFilterNPI((filterNPI) => ({
      ...filterNPI,
      [e.target.name]: { value: value, valid: isvalid?.status },
    }));
    if (value.length > 2) {
      const filteredList = nationalRegistryList.filter(
        (x: INationalRegistry) => {
          return (
            x.city.toLowerCase().includes(value.toLowerCase()) ||
            x.npi.toLowerCase().includes(value.toLowerCase()) ||
            x.firstName.toLowerCase().includes(value.toLowerCase()) ||
            x.lastName.toLowerCase().includes(value.toLowerCase())
          );
        }
      );
      setSortedData(filteredList);
    } else if (value.length === 0) {
      setSortedData(nationalRegistryList);
    }
  };

  return (
    <div className="nr-result">
      <div className="header" data-testid="nr-result-header">
        National Registry Search Results
      </div>
      {showNoData ? (
        noData()
      ) : (
        <>
          <div style={{ marginTop: "20px", marginBottom: "5px" }}>
            <TextField
              autoComplete="off"
              data-testid="nr-filter-npi"
              autoFocus={true}
              className="filter-npi-list"
              inputProps={{ style: { fontSize: 14 } }}
              placeholder="Filter Prescriber List by Name, City, or NPI number"
              InputProps={{
                startAdornment: (
                  <SearchIconSvg style={{ marginRight: "5px" }} />
                ),
              }}
              value={filterNPI.filterNPIList.value}
              onChange={handleFilterNPI}
              variant="outlined"
              name="filterNPIList"
            />
          </div>
          <NationalRegistryResultList
            handleSorting={handleSorting}
            columns={columns}
            nationalRegistryResultList={sortedData}
            handlePrescriberSearchType={handlePrescriberSearchType}
          />
        </>
      )}
      <ExpressButton
        testId="back2SearchButton"
        clickHandler={() => {
          handlePrescriberSearchType(
            SearchPrescriberModal.NATIONAL_REGISTRY_SEARCH
          );
        }}
        parentClass="nr-backButton"
        variant="outlined"
      >
        Back to Search
      </ExpressButton>
    </div>
  );
};

export default NationalRegistryResult;
