import { z } from "zod";
import { State, WorkSchedule, ContractType } from "../../types/employee.types";

// Phone and email validation regex patterns
const phoneRegex = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Address schema
export const AddressSchema = z.object({
  streetAddress: z.string().min(1), // Min length of 1, no custom error message
  suburb: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.nativeEnum(State), // Default error message for nativeEnum
});

// Employee schema
export const EmployeeSchema = z.object({
  firstName: z.string().min(1), // Min length of 1, no custom error message
  lastName: z.string().min(1),
  email: z.string().min(1).email(), // Min length of 1 and valid email check
  phoneNumber: z.string().min(1).regex(phoneRegex), // Valid phone number format
  address: AddressSchema,
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  workSchedule: z.nativeEnum(WorkSchedule), // Default error message for nativeEnum
  contractType: z.nativeEnum(ContractType), // Default error message for nativeEnum
});

// Define TypeScript type based on the schema
export type EmployeeFormData = z.infer<typeof EmployeeSchema>;
