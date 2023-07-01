export type IVacOrderSummary = {
  lockedOrder: IlockedOrder;
  sharedDetails: IsharedDetails;
};

export type IlockedOrder = {
  isLocked: boolean;
  lockedByFirstName: string;
  lockedByLastName: string;
  orderStatus: number | null;
};
export type IsharedDetails = {
  sharedFrom: string;
  sharedTo: string;
  sharednotes: string;
};
