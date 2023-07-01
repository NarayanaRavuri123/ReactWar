import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { MyPatients } from "../myPatients.component";
import { IPatient } from "../patient.interface";
import { patientList } from "./patientList.mock";
import * as Popup from "../../../core/popup/popup.component";
import { PatientActions } from "../patientActions/patientActions.component";
import { getMockAuthContextData } from "../../header/__test__/authContextMockData";
import { USER_ROLE_CLINICIAN } from "../../../util/PermissionName";
import { AuthContext } from "../../../context/AuthContext";
import { IUserRolesPermission } from "../userRolesPermission.interface";
import { RolesPermissionContext } from "../../../context/RolesPermissionContext";
import { IPermissionData } from "../../../RolesPermission/RolesPermission.model";
import userEvent from "@testing-library/user-event";
import { MobileDisplayContext } from "../../../context/MobileDisplayContext";

jest.mock("../../newOrder/newOrderFooterGroup/shareOrder/shareOrder.component");

export let defaultTestPermissionDataModel: IPermissionData = {
  IsShowStartNewOrder: true,
  IsShowSupplyOrderButton: true,
  IsShowVacOrderButton: true,
  IsShowInventoryOption: false,
  IsShowAdminstrationOption: false,
  IsSupportRole: true,
  IsSalesRole: false,
  IsSalesManagerRole: false,
  IsFacilityAdminRole: false,
  IsClinicianRole: false,
  IsBaseRole: false,
  Is3MAdminRole: false,
  IsProdManagerRole: false,
  IsAdminFacilitySettingsButton: false,
  IsAdminFacilityUsersButton: false,
  IsAdminMyListsButton: false,
  IsAdminRolesPermissionButton: false,
  IsAdminUserAccounts: false,
  IsShowManageAccountMenu: false,
  IsPrdMgrSiteStatus: false,
  IsShowAddWoundAssessmentMenu: true,
};

describe("My Patients component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("My Patients Header", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MyPatients />
      </MemoryRouter>
    );
    expect(screen.getByText("My Patients")).toBeInTheDocument();
  });

  it("My Patients Searchbar", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
          }}
        >
          <MyPatients />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText("Search Name or RO #")
    ).toBeInTheDocument();
  });

  it("My Patients Add Patient", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
          }}
        >
          <MyPatients />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Add Patient")).toBeInTheDocument();
  });

  it("My Patients Order Supplies", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
          }}
        >
          <RolesPermissionContext.Provider
            value={{
              mappedRolesPermissionData: defaultTestPermissionDataModel,
              setMappedRolesPermissionData: () => {},
            }}
          >
            <MyPatients />
          </RolesPermissionContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Order Supplies")).toBeInTheDocument();
  });

  it("My Patients Order V.A.C.® Therapy", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };

    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
          }}
        >
          <RolesPermissionContext.Provider
            value={{
              mappedRolesPermissionData: defaultTestPermissionDataModel,
              setMappedRolesPermissionData: () => {},
            }}
          >
            <MyPatients />
          </RolesPermissionContext.Provider>
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("orderTherapy")).toBeInTheDocument();
  });

  it("My Patient List 1", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Cherry, Sophia")).toBeInTheDocument();
    expect(screen.getByText("10/30/1981")).toBeInTheDocument();
    expect(screen.getByTestId("26212341")).toBeInTheDocument();
    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });

  it("My Patient List 2", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Cobb, Liana")).toBeInTheDocument();
    expect(screen.getByText("10/30/1982")).toBeInTheDocument();
    expect(screen.getByTestId("26212342")).toBeInTheDocument();
    expect(screen.getByText("26212342")).toBeInTheDocument();
    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });

  it("My Patient List 3", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Douglas, Doug")).toBeInTheDocument();
    expect(screen.getByText("10/30/1983")).toBeInTheDocument();
    expect(screen.getByTestId("26212343")).toBeInTheDocument();
    expect(screen.getByText("26212343")).toBeInTheDocument();
    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });

  it("My Patient List 4", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Eamon, Nina")).toBeInTheDocument();
    expect(screen.getByText("10/30/1984")).toBeInTheDocument();
    expect(screen.getByTestId("26212344")).toBeInTheDocument();
    expect(screen.getByText("26212344")).toBeInTheDocument();
    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });

  it("My Patient List 5", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Edgar, Elliot")).toBeInTheDocument();
    expect(screen.getByText("10/30/1985")).toBeInTheDocument();
    expect(screen.getByTestId("26212345")).toBeInTheDocument();
    expect(screen.getByText("26212345")).toBeInTheDocument();
    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });

  it("My Patient List 6", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Esparragueza, Immacuella")).toBeInTheDocument();
    expect(screen.getByText("10/30/1986")).toBeInTheDocument();
    expect(screen.getByTestId("26212346")).toBeInTheDocument();
    expect(screen.getByText("26212346")).toBeInTheDocument();
    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });

  it("My Patient List 7", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Hunt, Messiah")).toBeInTheDocument();
    expect(screen.getByText("10/30/1987")).toBeInTheDocument();
    expect(screen.getByTestId("26212347")).toBeInTheDocument();
    expect(screen.getByText("26212347")).toBeInTheDocument();
    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });

  it("My Patient List 8", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Newman, Nelsey")).toBeInTheDocument();
    expect(screen.getByText("10/30/1988")).toBeInTheDocument();
    expect(screen.getByTestId("26212348")).toBeInTheDocument();
    expect(screen.getByText("26212348")).toBeInTheDocument();
    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });

  it("My Patient List 9", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Solomon, Sarah")).toBeInTheDocument();
    expect(screen.getByText("10/30/1989")).toBeInTheDocument();
    expect(screen.getByTestId("26212349")).toBeInTheDocument();
    expect(screen.getByText("26212349")).toBeInTheDocument();
    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });

  it("My Patient List 10", () => {
    const userRoles: IUserRolesPermission = {
      userRole: USER_ROLE_CLINICIAN,
      permissions: [],
      pagePermissions: [],
    };
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthContext.Provider
          value={{
            ...getMockAuthContextData(),
            userRolePermissionData: userRoles,
            isLoggedIn: false,
          }}
        >
          <MyPatients isTesting={true} />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Zander, Zora")).toBeInTheDocument();
    expect(screen.getByText("10/30/1990")).toBeInTheDocument();
    expect(screen.getByTestId("26212350")).toBeInTheDocument();

    expect(
      screen.getByText("Created On Dec 21, 2021 6:02 PM")
    ).toBeInTheDocument();
  });
  //------------------ patient alerts unit tests ---------------------------------//
  it("renders my patient with alerts", () => {
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MyPatients />
      </MemoryRouter>
    );
  });

  it("Add patient popup should be available", () => {
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MyPatients />
      </MemoryRouter>
    );
    const val = document.querySelector(".paperRoot");
    expect(val).toBeDefined();
  });

  it("Patient Dot Menu Available", () => {
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patientsMenu: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patientsMenu, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PatientActions
          setSelectedValue={() => {}}
          clickedOutside={() => {}}
          menuData={patientList[0].menuActions}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId("dotMenuTest")).toBeInTheDocument();
  });

  it("Patient Menu Option  Available", () => {
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patientsMenu: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patientsMenu, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PatientActions
          setSelectedValue={() => {}}
          clickedOutside={() => {}}
          menuData={patientList[0].menuActions}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Continue Saved Order")).toBeInTheDocument();
  });

  it("renders my patient with alerts based on permission", () => {
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <MyPatients />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
  });

  it("My Patient List 11", () => {
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <PatientActions
            setSelectedValue={() => {}}
            clickedOutside={() => {}}
            menuData={patientList[10].menuActions}
          />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Order Supplies")).toBeInTheDocument();
    expect(screen.getByText("Add Wound Assessment")).toBeInTheDocument();
  });

  it("My Patients Add Patient Disabled", () => {
    jest.spyOn(Popup, "Popup").mockImplementation(() => {
      return <div></div>;
    });
    const patients: Array<IPatient> = patientList;
    React.useState = jest.fn().mockReturnValue([patients, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RolesPermissionContext.Provider
          value={{
            mappedRolesPermissionData: defaultTestPermissionDataModel,
            setMappedRolesPermissionData: () => {},
          }}
        >
          <MyPatients isTesting={true} />
        </RolesPermissionContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("add-patient-button-test")).toBeDisabled();
  });
});
