import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { getEmployeeById } from "../../state/employee/employeeSlice";
import styles from "./EmployeeDetails.module.scss";
import {
  Employee,
  Address,
  State,
  WorkSchedule,
  ContractType,
  ValidationErrors,
} from "../../types/employee.types";

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentEmployee, status, error } = useAppSelector(
    (state) => state.employees
  );

  useEffect(() => {
    console.log("Fetching employee with id: ", id);
    if (id) {
      dispatch(getEmployeeById(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleEdit = () => {
    navigate(`/employees/edit/${id}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatEnum = (value: string) => {
    return value.replace("_", " ");
  };

  if (status === "loading") {
    return <div className={styles["loading"]}>Loading employee details...</div>;
  }

  if (status === "failed" || !currentEmployee) {
    return (
      <div className={styles["error"]}>
        {error || "Failed to load employee details"}
        <button onClick={handleBack}>Go Back</button>
      </div>
    );
  }
  if (status === "succeeded") {
    console.log("Employee data fetched successfully:", currentEmployee); // Log successful data retrieval
  }

  return (
    <div className={styles["employee-details"]}>
      <h2>Employee Details</h2>

      <div className={styles["details-container"]}>
        <div className={styles["section"]}>
          <h3>Personal Information</h3>
          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Name:</span>
            <span className={styles["value"]}>
              {currentEmployee?.firstName} {currentEmployee?.lastName}
            </span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Email:</span>
            <span className={styles["value"]}>{currentEmployee.email}</span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Phone Number:</span>
            <span className={styles["value"]}>
              {currentEmployee.phoneNumber}
            </span>
          </div>
        </div>

        <div className={styles["section"]}>
          <h3>Address</h3>
          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Street Address:</span>
            <span className={styles["value"]}>
              {currentEmployee.address.streetAddress}
            </span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Suburb:</span>
            <span className={styles["value"]}>
              {currentEmployee.address.suburb}
            </span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>City:</span>
            <span className={styles["value"]}>
              {currentEmployee.address.city}
            </span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Zip Code:</span>
            <span className={styles["value"]}>
              {currentEmployee.address.zipCode}
            </span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>State:</span>
            <span className={styles["value"]}>
              {currentEmployee.address.state}
            </span>
          </div>
        </div>

        <div className={styles["section"]}>
          <h3>Employment Details</h3>
          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Start Date:</span>
            <span className={styles["value"]}>
              {formatDate(currentEmployee.startDate)}
            </span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>End Date:</span>
            <span className={styles["value"]}>
              {formatDate(currentEmployee.endDate)}
            </span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Work Schedule:</span>
            <span className={styles["value"]}>
              {formatEnum(currentEmployee.workSchedule)}
            </span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Contract Type:</span>
            <span className={styles["value"]}>
              {formatEnum(currentEmployee.contractType)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles["actions"]}>
        <button className={styles["back-button"]} onClick={handleBack}>
          Back to List
        </button>
        <button className={styles["edit-button"]} onClick={handleEdit}>
          Edit Employee
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
