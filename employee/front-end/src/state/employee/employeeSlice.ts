import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Employee, ValidationErrors } from "../../types/employee.types";
import { employeeService } from "../../services/employeeService";

interface EmployeeState {
  employees: Employee[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  validationErrors: ValidationErrors | null;
}

const initialState: EmployeeState = {
  employees: [],
  status: "idle",
  error: null,
  validationErrors: null,
};

// Async thunk for creating an employee
export const createEmployee = createAsyncThunk<
  Employee,
  Employee,
  { rejectValue: ValidationErrors | string }
>("employees/create", async (employeeData, { rejectWithValue }) => {
  try {
    return await employeeService.createEmployee(employeeData);
  } catch (error: any) {
    // Handle validation errors from Spring Boot
    if (error.fieldErrors) {
      const validationErrors: ValidationErrors = {};
      error.fieldErrors.forEach((fieldError: any) => {
        validationErrors[fieldError.field] = fieldError.message;
      });
      return rejectWithValue(validationErrors);
    }
    return rejectWithValue(error.message || "Failed to create employee");
  }
});

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.validationErrors = null;
      })
      .addCase(
        createEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.status = "succeeded";
          state.employees.push(action.payload);
        }
      )
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = "failed";
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else if (action.payload) {
          state.validationErrors = action.payload as ValidationErrors;
        } else {
          state.error = action.error.message || "Unknown error occurred";
        }
      });
  },
});

export const { clearErrors } = employeeSlice.actions;
export default employeeSlice.reducer;
