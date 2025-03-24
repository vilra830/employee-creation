import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Employee, ValidationErrors } from "../../types/employee.types";
import { employeeService } from "../../services/employeeService";

interface EmployeeState {
  employees: Employee[];
  currentEmployee: Employee | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  validationErrors: ValidationErrors | null;
}

const initialState: EmployeeState = {
  employees: [],
  currentEmployee: null,
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

// New async thunk for getting all employees
export const getAllEmployees = createAsyncThunk(
  "employees/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await employeeService.getAllEmployees();
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch employees");
    }
  }
);

// New async thunk for deleting an employee
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await employeeService.deleteEmployee(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete employee");
    }
  }
);

// New async thunk for deleting an employee
export const getEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await employeeService.getEmployeeById(id);
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to get employee by the Id provided"
      );
    }
  }
);

// New async thunk for updating an employee
export const updateEmployee = createAsyncThunk<
  Employee,
  Employee,
  { rejectValue: ValidationErrors | string }
>("employees/update", async (employeeData, { rejectWithValue }) => {
  try {
    return await employeeService.updateEmployee(employeeData);
  } catch (error: any) {
    // Handle validation errors from Spring Boot
    if (error.fieldErrors) {
      const validationErrors: ValidationErrors = {};
      error.fieldErrors.forEach((fieldError: any) => {
        validationErrors[fieldError.field] = fieldError.message;
      });
      return rejectWithValue(validationErrors);
    }
    return rejectWithValue(error.message || "Failed to update employee");
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
      })

      // Get all employees cases
      .addCase(getAllEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to fetch employees";
      })

      // Delete employee cases
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to delete employee";
      })

      // GET EMPLOYEE BY ID
      .addCase(getEmployeeById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.validationErrors = null;
        state.currentEmployee = null;
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentEmployee = action.payload;
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Update employee cases
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.validationErrors = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
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
