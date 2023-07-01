import "./manageUsersListTable.css";
import {
  formatDate,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import Table from "../../../../core/customSortingTable/table.component";
import { IManageUsersListTableProps } from "./manageUsersListTable.interface";

export const ManageUsersListTable = ({
  columns,
  handleSorting,
  openUserDetails,
  sortedData,
}: IManageUsersListTableProps) => {
  return (
    <div className="manage-user-table_container" data-testid="patient-list">
      <Table
        tableClassName="manageUser_table"
        tableColumns={columns}
        handleSorting={handleSorting}
      >
        {sortedData.length > 0 ? (
          <tbody>
            {sortedData.map((data: any) => {
              return (
                <tr key={data.id}>
                  <td
                    className="select-username-link"
                    onClick={() => openUserDetails(data)}
                  >
                    {data.userName}
                  </td>
                  <td className="table-static-data">
                    {makeCapitalEachWordInString(`${data.lastName}`)}
                  </td>
                  <td className="table-static-data">
                    {makeCapitalEachWordInString(`${data.firstName}`)}
                  </td>
                  <td className="table-static-data">{data.role}</td>
                  <td
                    className={
                      data.status.toLowerCase() === "locked" ||
                      data.status.toLowerCase() === "inactive"
                        ? "status-red"
                        : "status-blue"
                    }
                    onClick={() => openUserDetails(data)}
                  >
                    {data.status}
                  </td>
                  <td className="last-login-data">
                    {data.lastLogin ? formatDate(data.lastLogin) : "--"}
                  </td>
                  <td className="reason-disabeled-data">
                    {data.disabledReason ? data.disabledReason : "--"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : null}
      </Table>
    </div>
  );
};
