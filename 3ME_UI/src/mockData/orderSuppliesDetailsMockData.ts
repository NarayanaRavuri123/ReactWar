import {
  IOrderSupplies,
  ISupplyOrdersInfo,
} from "../components/myPatients/patientAndTherapyDetails/orderSupplyDetail/orderSupplyDetails.interface";

export const orderSupliesMock: IOrderSupplies = {
  supplyOrders: [
    {
      ropn: "30635455",
      product: "SALE: VAC DISPOSABLES",
      initiatedName: "EMMA GRACIA",
      status: "ORDERED",
      deliveredDate: null,
      createdDate: "2023-02-15T04:19:22",
      statusColor: "Orange",
    },
    {
      ropn: "30635455",
      product: "SALE: VAC DISPOSABLES",
      initiatedName: "EMMA GRACIA",
      status: "ORDERED",
      deliveredDate: null,
      createdDate: "2023-02-15T04:19:22",
      statusColor: "Green",
    },
  ],
  rentalOrderNumber: "22889920",
  therapyStartDate: "2023-02-15T04:19:22",
};

export const orderSuppliesInfoMock: ISupplyOrdersInfo = {
  ropn: "30635455",
  product: "SALE: VAC DISPOSABLES",
  initiatedName: "EMMA GRACIA",
  status: "ORDERED",
  deliveredDate: null,
  createdDate: "2023-02-15T04:19:22",
  statusColor: "Green",
};
