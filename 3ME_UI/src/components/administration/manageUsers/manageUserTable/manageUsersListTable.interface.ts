export interface IManageUsersListTableProps {
  sortedData: IManageUserListTableData[];
  handleSorting: any;
  columns: any;
  openUserDetails: Function;
}

export interface IManageUserListTableData {
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  disabledReason: string;
  lastLogin: string;
}
