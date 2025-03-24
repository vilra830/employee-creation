import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import EmployeeForm from "../components/CreateEmployee/EmployeeForm"; // Import the EmployeeForm
import { EmployeeFormData } from "../components/CreateEmployee/schema"; // Import the EmployeeForm schema
import { useAppDispatch } from "../state/store"; // Import Redux dispatch function
import { createEmployee } from "../state/employee/employeeSlice"; // Import the async thunk for creating an employee
import { AppDispatch } from "../state/store"; // Optional import for dispatch typing

export default function NewEmployeePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // For navigation after success

  const onSubmit = (data: EmployeeFormData) => {
    dispatch(createEmployee(data)) // Dispatch create employee action
      .unwrap() // Handle the async nature of the thunk
      .then(() => {
        // Successfully created the employee
        console.log("Employee created");
        navigate("/"); // Redirect to employee list page (or wherever you want)
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
      });
  };

  return (
    <div>
      <h2>Create a New Employee</h2>
      <EmployeeForm onSubmit={onSubmit} />
    </div>
  );
}
