export enum State {
  NSW = "NSW",
  VIC = "VIC",
  ACT = "ACT",
  WA = "WA",
  QLD = "QLD",
  TAS = "TAS",
  SA = "SA",
  NT = "NT",
}

export enum WorkSchedule {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CASUAL = "CASUAL",
}

export enum ContractType {
  PERMANENT = "PERMANENT",
  FIXED_TERM = "FIXED_TERM",
  CASUAL = "CASUAL",
}

export interface Address {
  id?: number;
  streetAddress: string;
  suburb: string;
  city: string;
  zipCode: string;
  state: State;
}

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: Address;
  startDate: string; // Using string for dates in the frontend
  endDate?: string;
  workSchedule: WorkSchedule;
  contractType: ContractType; // Note: this matches your typo in the backend
}

export interface ValidationErrors {
  [key: string]: string;
}
