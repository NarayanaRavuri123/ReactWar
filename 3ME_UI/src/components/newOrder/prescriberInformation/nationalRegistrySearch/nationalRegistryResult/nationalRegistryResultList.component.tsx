import React, { useContext } from "react";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../../context/NewOrderContext";
import Table from "../../../../../core/customSortingTable/table.component";
import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";
import {
  INationalRegistry,
  INationalRegistryResultList,
} from "./nationalRegistry.interface";
import "./nationalRegistryResult.css";

const NationalRegistryResultList = ({
  columns,
  nationalRegistryResultList,
  handleSorting,
}: INationalRegistryResultList) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  const handleSelectLink = (value: INationalRegistry) => {
    NewOrderObj?.setPrescriberAddedData(value);
    NewOrderObj?.setSearchPrescriberPopup(false);
    NewOrderObj?.setPrescriberList(undefined);
  };

  return (
    <div className="nr-table">
      <Table
        tableClassName="table"
        tableColumns={columns}
        handleSorting={handleSorting}
      >
        {nationalRegistryResultList.length > 0 ? (
          <tbody>
            {nationalRegistryResultList.map((data: INationalRegistry) => {
              return (
                <tr>
                  <td
                    className="select-patient-link"
                    onClick={() => handleSelectLink(data)}
                  >
                    Select
                  </td>
                  <td className="table-static-data">{`${makeCapitalEachWordInString(
                    data.lastName
                  )}, ${makeCapitalEachWordInString(data.firstName)}`}</td>
                  <td className="table-static-data">{data.npi}</td>
                  <td className="table-static-data">
                    {makeCapitalEachWordInString(data.city)}
                  </td>
                  <td className="table-static-data">{data.state}</td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          ""
        )}
      </Table>
    </div>
  );
};

export default NationalRegistryResultList;
