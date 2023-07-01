import { ValidationStatus } from "../../../core/interfaces/input.interface";


export const searchPatient = (isValid: ValidationStatus) => {
  return new Promise((resolve, reject) => {
    if (isValid === ValidationStatus.VALID) {
      resolve('found');
    } else {
      reject('not found')
    }
  });
}