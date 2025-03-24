import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  createEmployee,
  clearErrors,
} from "../../state/employee/employeeSlice";
import styles from "./EmployeeForm.module.scss";

import {
  Employee,
  Address,
  State,
  WorkSchedule,
  ContractType,
  ValidationErrors,
} from "../../types/employee.types";

const EmployeeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error, validationErrors } = useAppSelector(
    (state) => state.employees
  );

  const [employee, setEmployee] = useState<Employee>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {
      streetAddress: "",
      suburb: "",
      city: "",
      zipCode: "",
      state: State.NSW,
    },
    startDate: "",
    workSchedule: WorkSchedule.FULL_TIME,
    contractType: ContractType.PERMANENT,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested address fields
      const [parent, child] = name.split(".");
      setEmployee({
        ...employee,
        [parent]: {
          ...(employee[parent as keyof Employee] as Record<string, any>),
          [child]: value,
        },
      });
    } else {
      setEmployee({
        ...employee,
        [name]: value,
      });
    }

    // Clear errors when user starts typing
    dispatch(clearErrors());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createEmployee(employee));
  };

  const getFieldError = (fieldName: string): string => {
    if (!validationErrors) return "";

    // Handle nested fields like 'address.streetAddress'
    if (fieldName.includes(".")) {
      const [parent, child] = fieldName.split(".");
      const nestedError = validationErrors[`${parent}.${child}`];
      if (nestedError) return nestedError;
    }

    return validationErrors[fieldName] || "";
  };

  return (
    <div className={styles["employee-form"]}>
      <h2>Add New Employee</h2>

      {error && <div className={styles["error-message"]}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles["form-section"]}>
          <h3>Personal Information</h3>

          <div className={styles["form-group"]}>
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={employee.firstName}
              onChange={handleChange}
              required
            />
            {getFieldError("firstName") && (
              <div className={styles["field-error"]}>
                {getFieldError("firstName")}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="lastName">Last Name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={employee.lastName}
              onChange={handleChange}
              required
            />
            {getFieldError("lastName") && (
              <div className={styles["field-error"]}>
                {getFieldError("lastName")}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
            />
            {getFieldError("email") && (
              <div className={styles["field-error"]}>
                {getFieldError("email")}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={employee.phoneNumber}
              onChange={handleChange}
              required
            />
            {getFieldError("phoneNumber") && (
              <div className={styles["field-error"]}>
                {getFieldError("phoneNumber")}
              </div>
            )}
          </div>
        </div>

        <div className={styles["form-section"]}>
          <h3>Address</h3>

          <div className={styles["form-group"]}>
            <label htmlFor="address.streetAddress">Street Address*</label>
            <input
              type="text"
              id="address.streetAddress"
              name="address.streetAddress"
              value={employee.address.streetAddress}
              onChange={handleChange}
              required
            />
            {getFieldError("address.streetAddress") && (
              <div className={styles["field-error"]}>
                {getFieldError("address.streetAddress")}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="address.suburb">Suburb*</label>
            <input
              type="text"
              id="address.suburb"
              name="address.suburb"
              value={employee.address.suburb}
              onChange={handleChange}
              required
            />
            {getFieldError("address.suburb") && (
              <div className={styles["field-error"]}>
                {getFieldError("address.suburb")}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="address.city">City*</label>
            <input
              type="text"
              id="address.city"
              name="address.city"
              value={employee.address.city}
              onChange={handleChange}
              required
            />
            {getFieldError("address.city") && (
              <div className={styles["field-error"]}>
                {getFieldError("address.city")}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="address.zipCode">Zip Code*</label>
            <input
              type="text"
              id="address.zipCode"
              name="address.zipCode"
              value={employee.address.zipCode}
              onChange={handleChange}
              required
            />
            {getFieldError("address.zipCode") && (
              <div className={styles["field-error"]}>
                {getFieldError("address.zipCode")}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="address.state">State*</label>
            <select
              id="address.state"
              name="address.state"
              value={employee.address.state}
              onChange={handleChange}
              required
            >
              {Object.values(State).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {getFieldError("address.state") && (
              <div className={styles["field-error"]}>
                {getFieldError("address.state")}
              </div>
            )}
          </div>
        </div>

        <div className={styles["form-section"]}>
          <h3>Employment Details</h3>

          <div className={styles["form-group"]}>
            <label htmlFor="startDate">Start Date*</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={employee.startDate}
              onChange={handleChange}
              required
            />
            {getFieldError("startDate") && (
              <div className={styles["field-error"]}>
                {getFieldError("startDate")}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={employee.endDate || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="workSchedule">Work Schedule*</label>
            <select
              id="workSchedule"
              name="workSchedule"
              value={employee.workSchedule}
              onChange={handleChange}
              required
            >
              {Object.values(WorkSchedule).map((schedule) => (
                <option key={schedule} value={schedule}>
                  {schedule.replace("_", " ")}
                </option>
              ))}
            </select>
            {getFieldError("workSchedule") && (
              <div className={styles["field-error"]}>
                {getFieldError("workSchedule")}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="contracType">Contract Type*</label>
            <select
              id="contracType"
              name="contracType"
              value={employee.contractType}
              onChange={handleChange}
              required
            >
              {Object.values(ContractType).map((type) => (
                <option key={type} value={type}>
                  {type.replace("_", " ")}
                </option>
              ))}
            </select>
            {getFieldError("contracType") && (
              <div className={styles["field-error"]}>
                {getFieldError("contracType")}
              </div>
            )}
          </div>
        </div>

        <div className={styles["form-actions"]}>
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Submitting..." : "Add Employee"}
          </button>
        </div>
      </form>

      {status === "succeeded" && (
        <div className={styles["success-message"]}>
          Employee added successfully!
        </div>
      )}
    </div>
  );
};

export default EmployeeForm;
