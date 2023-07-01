import { IManageUser } from "../manageUsers.interface";

export const columns = [
  { label: "Username", accessor: "userName", sortable: true },
  { label: "Last Name", accessor: "lastName", sortable: true },
  { label: "First Name", accessor: "firstName", sortable: true },
  { label: "Role", accessor: "role", sortable: true },
  { label: "Status", accessor: "status", sortable: true },
  { label: "Last Login", accessor: "lastLogin", sortable: true },
  { label: "Reason Disabled", accessor: "disabledReason", sortable: true },
];
export let mockManageUsersData: IManageUser = {
  data: [
    {
      userName: "abcdef",
      firstName: "abc",
      lastName: "def",
      role: "Admin",
      status: "Active",
      disabledReason: "Admin Disabled",
      lastLogin: "06/20/2023",
    },
  ],
};
