import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ISearchPatientByRentalOrder, ISearchPatientByName } from "./searchPatient.interface";

export let defaultPatientDataForRental: ISearchPatientByRentalOrder = {
    dob: {
        valid: ValidationStatus.UNTOUCHED,
        value: null
    },
    ro: {
        valid: ValidationStatus.UNTOUCHED,
        value: ''
    },
    search: {
        valid: ValidationStatus.UNTOUCHED,
        value: 'false'
    },
}

export let defaultPatientDataForNameSearch: ISearchPatientByName = {
    dob1: {
        valid: ValidationStatus.UNTOUCHED,
        value: null
    },
    lastName: {
        valid: ValidationStatus.UNTOUCHED,
        value: ''
    },
    zip: {
        valid: ValidationStatus.UNTOUCHED,
        value: ''
    },
    search: {
        valid: ValidationStatus.UNTOUCHED,
        value: 'false'
    },
}