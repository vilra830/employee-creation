import { useForm } from "react-hook-form";
import { EmployeeSchema, EmployeeFormData } from "./schema";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { State, WorkSchedule, ContractType } from "../../types/employee.types";
import styles from "./EmployeeForm.module.scss";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { createEmployee } from "../../state/employee/employeeSlice";

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => unknown;
  initialEmployee?: EmployeeFormData;
}
const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  initialEmployee,
}) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors },
    reset,
  } = useForm<EmployeeFormData>({ resolver: zodResolver(EmployeeSchema) });

  // Set form values when initialEmployee is available
  useEffect(() => {
    if (initialEmployee) {
      setValue("firstName", initialEmployee.firstName);
      setValue("lastName", initialEmployee.lastName);
      setValue("email", initialEmployee.email);
      setValue("phoneNumber", initialEmployee.phoneNumber);
      setValue("address.streetAddress", initialEmployee.address.streetAddress);
      setValue("address.suburb", initialEmployee.address.suburb);
      setValue("address.city", initialEmployee.address.city);
      setValue("address.zipCode", initialEmployee.address.zipCode);
      setValue("address.state", initialEmployee.address.state);
      setValue("startDate", initialEmployee.startDate);
      if (initialEmployee.endDate) {
        setValue("endDate", initialEmployee.endDate);
      }
      setValue("workSchedule", initialEmployee.workSchedule);
      setValue("contractType", initialEmployee.contractType);
    }
  }, [initialEmployee, setValue]);

  // Log validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);
    }
  }, [errors]);

  // Reset form after successful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleSubmitForm = (data: EmployeeFormData) => {
    dispatch(createEmployee(data))
      .unwrap()
      .then(() => {
        // Handle success, if necessary
        console.log("Employee created successfully!");
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating employee:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className={styles["form-container"]}
    >
      {/* Personal Information Section */}
      <div className={styles.formSection}>
        <h3>Personal Information</h3>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>First Name</label>
            <input type="text" {...register("firstName")} />
            {errors.firstName && (
              <small style={{ color: "red" }}>{errors.firstName.message}</small>
            )}
          </div>
          <div className={styles.formField}>
            <label>Last Name</label>
            <input type="text" {...register("lastName")} />
            {errors.lastName && (
              <small style={{ color: "red" }}>{errors.lastName.message}</small>
            )}
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>Email</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <small style={{ color: "red" }}>{errors.email.message}</small>
            )}
          </div>
          <div className={styles.formField}>
            <label>Phone Number</label>
            <input
              type="tel"
              {...register("phoneNumber")}
              placeholder="e.g. +1 (123) 456-7890"
            />
            {errors.phoneNumber && (
              <small style={{ color: "red" }}>
                {errors.phoneNumber.message}
              </small>
            )}
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className={styles.formSection}>
        <h3>Address</h3>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>Street Address</label>
            <input type="text" {...register("address.streetAddress")} />
            {errors.address?.streetAddress && (
              <small style={{ color: "red" }}>
                {errors.address.streetAddress.message}
              </small>
            )}
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>Suburb</label>
            <input type="text" {...register("address.suburb")} />
            {errors.address?.suburb && (
              <small style={{ color: "red" }}>
                {errors.address.suburb.message}
              </small>
            )}
          </div>
          <div className={styles.formField}>
            <label>City</label>
            <input type="text" {...register("address.city")} />
            {errors.address?.city && (
              <small style={{ color: "red" }}>
                {errors.address.city.message}
              </small>
            )}
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>Zip Code</label>
            <input type="text" {...register("address.zipCode")} />
            {errors.address?.zipCode && (
              <small style={{ color: "red" }}>
                {errors.address.zipCode.message}
              </small>
            )}
          </div>
          <div className={styles.formField}>
            <label>State</label>
            <select {...register("address.state")}>
              <option value="">Select a State</option>
              {Object.values(State).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.address?.state && (
              <small style={{ color: "red" }}>
                {errors.address.state.message}
              </small>
            )}
          </div>
        </div>
      </div>

      {/* Employment Details Section */}
      <div className={styles.formSection}>
        <h3>Employment Details</h3>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>Start Date</label>
            <input type="date" {...register("startDate")} />
            {errors.startDate && (
              <small style={{ color: "red" }}>{errors.startDate.message}</small>
            )}
          </div>
          <div className={styles.formField}>
            <label>End Date (Optional)</label>
            <input type="date" {...register("endDate")} />
            {errors.endDate && (
              <small style={{ color: "red" }}>{errors.endDate.message}</small>
            )}
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <label>Work Schedule</label>
            <select {...register("workSchedule")}>
              <option value="">Select a Work Schedule</option>
              {Object.values(WorkSchedule).map((schedule) => (
                <option key={schedule} value={schedule}>
                  {schedule.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            {errors.workSchedule && (
              <small style={{ color: "red" }}>
                {errors.workSchedule.message}
              </small>
            )}
          </div>
          <div className={styles.formField}>
            <label>Contract Type</label>
            <select {...register("contractType")}>
              <option value="">Select a Contract Type</option>
              {Object.values(ContractType).map((type) => (
                <option key={type} value={type}>
                  {type.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            {errors.contractType && (
              <small style={{ color: "red" }}>
                {errors.contractType.message}
              </small>
            )}
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit">
          {initialEmployee ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};
export default EmployeeForm;
