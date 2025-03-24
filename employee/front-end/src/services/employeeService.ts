import axios from "axios";
import { Employee } from "../types/employee.types";

const API_URL = "http://localhost:8080"; // Adjust to your Spring Boot API URL

export const employeeService = {
  createEmployee: async (employee: Employee): Promise<Employee> => {
    try {
      const response = await axios.post(`${API_URL}/employees`, employee);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw new Error("Failed to create employee");
    }
  },

  // Add more API methods as needed (getEmployees, updateEmployee, etc.)
};
