export interface IOrderDetailRequest {
  RentalOrderNumber: string;
  dob: string;
}
export interface IOrderDetailResponse {
  orderNumber: string;
  patientFirstName: string;
  patientLastName: string;
  salesRepName: string;
  orderDate: string;
  salesRepPhone: string;
  salesRepEmail: string;
  csrName: string;
  csrPhone: string;
  csrEmail: string;
  trackingLink: string;
  trackingNumber: string;
  receivedFlag: string;
  releaseToShipFlag: string;
  releaseDate: string;
  validatedFlag: string;
  benefitsComplDate: string;
  therapyFlag: string;
  therapyDate: any;
  deliveredDate: string;
  deliveredFlag: string;
  rentalProduct: string;
  outForDeliveryFlag: string;
  outDeliveryDate: string;
  deliverySiteType: string;
}
