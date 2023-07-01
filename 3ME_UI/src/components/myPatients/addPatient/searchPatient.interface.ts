import { IInputField, IInputFieldNullable } from "../../../core/interfaces/input.interface"

export interface ISearchPatientByRentalOrder {
    ro: IInputField,
    dob: IInputFieldNullable,
    search: IInputField
}

export interface ISearchPatientByName {
    lastName: IInputField,
    dob1: IInputFieldNullable,
    zip: IInputField,
    search: IInputField
}