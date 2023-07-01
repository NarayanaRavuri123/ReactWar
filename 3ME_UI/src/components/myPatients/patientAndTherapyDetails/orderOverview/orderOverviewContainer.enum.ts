export enum OrderOverViewTabs {
  ORDER_DETAILS = "Orders",
  DOCUMENTS = "Documents",
  WOUND_PROGRESS = "Wound Progress",
  PATIENT_FINANCIAL_INFO = "Patient Financial Info",
}
export enum acceptedOrderOverviewStatus {
  IN_THERAPY = "In Therapy",
  IN_PROCCESS = "In Process",
  CLOSED = "Closed",
  SHIPPED = "Shipped",
  PICKUP_PENDING = "Pickup Pending",
  DELIVERED = "Delivered",
  APPROVED_FOR_PLACEMNET = "Approved for placement",
}

export enum alertTypes {
  Missing_Rx = "Missing Rx",
  Confirm_Placement = "Confirm Placement",
  Proof_of_Delivery_Needed = "Proof of Delivery Needed",
}

export enum OrderOverViewTabsTitle {
  ORDER_DETAIL_TAB_TITLE = "Order Detail",
  ORDER_TAB_TITLE = "Orders",
  SUPPLY_ORDER_TAB_TITLE = "Supply Orders",
  DOCUMENTS_TAB_TITLE = "Documents",
  WOUND_PROGRESS_TAB_TITLE = "Wound Progress",
  PATIENT_FINANCIAL_INFO_TAB_TITLE = "Patient Financial Info",
  WOUND_DETAIL_TAB_TITLE = "Wound Detail",
}

export enum TherapyStatus {
  CONTINUE = "Continuing",
  ONHOLD = "On Hold",
  DISCONTINUE = "Discontinued",
}
