import { OutlinedInputProps } from "@mui/material";

export interface IOptionsProps {
  key: string;
  value: string;
}
export interface ISearchInputProps {
  searchInputProps: OutlinedInputProps;
  selectedBoxLabel: string;
  showNoResults: boolean;
  optionData: Array<IOptionsProps>;
  selectedData: Array<IOptionsProps>;
  handleSearchClick: () => {} | void;
  handleSelect: (val: any) => {} | void;
  handleDeselect: (val: any) => {} | void;
  handleNoResultClick: (val: any) => {} | void;
}
