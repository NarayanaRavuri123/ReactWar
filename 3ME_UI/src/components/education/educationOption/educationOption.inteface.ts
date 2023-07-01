export interface IEducationOptionProp {
  openVideoLibrary: Function;
  option: IEducationOption;
}

export interface IEducationOption {
  bodyCopy: string;
  imageLink: string;
  labelText: string;
  resourceLink: string | null;
  resourceOrder: string;
}
