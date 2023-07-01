export interface IRadioDropdownProps<T> {
  data: T[],
  setChosenValue: React.Dispatch<React.SetStateAction<T | undefined>>,
  displayLabel: string
}