import axios from "axios";
import { Employee } from "../types/employee.types";
import { getEmployeeById } from "../state/employee/employeeSlice";

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

  // Get all employees
  async getAllEmployees(): Promise<Employee[]> {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  // Delete an employee
  async deleteEmployee(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}/employees/${id}`);
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  async getEmployeeById(id: number): Promise<Employee> {
    try {
      const response = await axios.get(`${API_URL}/employees/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  // Update an employee
  async updateEmployee(employeeData: Employee): Promise<Employee> {
    try {
      const response = await axios.patch(
        `${API_URL}/employees/${employeeData.id}`,
        employeeData
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw error.response.data;
      }
      throw error;
    }
  },
};
