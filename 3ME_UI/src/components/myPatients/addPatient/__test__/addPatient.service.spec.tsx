import { cleanup } from '@testing-library/react';
import { ValidationStatus } from '../../../../core/interfaces/input.interface';
import { searchPatient } from '../addPatient.service';

describe("Add Patient Service ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("In case search returns patient data", () => {
    searchPatient(ValidationStatus.VALID).then((response) => expect(response).toBe('found'));
  });
  it("In case search doesn't return patient data", () => {
    searchPatient(ValidationStatus.INVALID).catch((response) => expect(response).toBe('not found'));
  });
});