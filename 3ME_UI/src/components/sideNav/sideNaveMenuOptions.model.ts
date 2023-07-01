import { ISideNav } from "./sideNavMenuOption.interface";

export let sideNavMenuOptionModel: ISideNav = {
  home: {
    labelText: "My Patients",
    isVisible: true,
  },
  orders: {
    labelText: "Start New Order",
    isVisible: false,
  },
  inventory: {
    labelText: "Inventory",
    isVisible: false,
  },
  productsAndSolutions: {
    labelText: "Products & Solutions",
    isVisible: true,
  },
  education: {
    labelText: "Education",
    isVisible: true,
  },
  administration: {
    labelText: "Administration",
    isVisible: false,
  },
};
