export interface INationalRegistry {
  firstName: string;
  lastName: string;
  npi: string;
  city: string;
  state: string;
  telephoneNumber: string;
  zipCode: string;
  address1: string;
  address2: string;
  email?: string;
  faxNumber?: string;
  eScript?: string;
}
export interface INationalRegistryResultList {
  handlePrescriberSearchType: Function;
  columns: {}[];
  nationalRegistryResultList: [];
  handleSorting: Function;
}
