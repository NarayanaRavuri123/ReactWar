import { ValidationStatus } from "../../core/interfaces/input.interface";
import { ICode } from "./codeVerification.interface";

export let defaultCode: ICode = {
    code: {
        valid: ValidationStatus.UNTOUCHED,
        value: ''
    },
}