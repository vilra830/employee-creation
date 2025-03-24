import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import {
  getAllEmployees,
  deleteEmployee,
} from "../../state/employee/employeeSlice";
import styles from "./EmployeeList.module.scss";

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { employees, status, error } = useSelector(
    (state: RootState) => state.employees
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

  useEffect(() => {
    // Fetch employees when component mounts
    if (status === "idle") {
      dispatch(getAllEmployees());
    }
  }, [dispatch, status]);

  const handleEdit = (id: number) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    setEmployeeToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete !== null) {
      dispatch(deleteEmployee(employeeToDelete))
        .unwrap()
        .then(() => {
          setShowConfirmation(false);
          setEmployeeToDelete(null);
        })
        .catch((error) => {
          console.error("Failed to delete employee:", error);
          setShowConfirmation(false);
          setEmployeeToDelete(null);
        });
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setEmployeeToDelete(null);
  };

  const handleAddEmployee = () => {
    navigate("/employees/create");
  };

  const getFullName = (employee: any) => {
    return `${employee.firstName} ${employee.lastName}`;
  };

  return (
    <div className={styles.employeeList}>
      <div className={styles.employeeList__header}>
        <h1>Employees List</h1>
        <button
          className={styles.employeeList__addButton}
          onClick={handleAddEmployee}
        >
          Add Employee
        </button>
      </div>

      {status === "loading" && (
        <div className={styles.employeeList__loading}>Loading employees...</div>
      )}

      {status === "failed" && error && (
        <div className={styles.employeeList__error}>{error}</div>
      )}

      {status === "succeeded" && employees.length === 0 && (
        <div className={styles.employeeList__empty}>
          No employees found. Add your first employee!
        </div>
      )}

      {status === "succeeded" && employees.length > 0 && (
        <table className={styles.employeeList__table}>
          <thead className={styles.employeeList__tableHeader}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Contract Type</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className={styles.employeeList__tableRow}>
                <td>
                  {/* Use the Link component to navigate to the EmployeeDetails page */}
                  <Link
                    to={`/employees/${employee.id}`}
                    className={styles.employeeList__nameLink}
                  >
                    {getFullName(employee)}
                  </Link>
                </td>{" "}
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.contractType}</td>
                <td>{new Date(employee.startDate).toLocaleDateString()}</td>
                <td className={styles.employeeList__actions}>
                  <button
                    className={styles.edit}
                    onClick={() => handleEdit(employee.id!)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.delete}
                    onClick={() => handleDelete(employee.id!)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Dialog */}
      {showConfirmation && (
        <div className={styles.employeeList__confirmation}>
          <div className={styles.employeeList__confirmationDialog}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to remove this employee?</p>
            <div className={styles.employeeList__confirmationDialogActions}>
              <button className={styles.cancel} onClick={cancelDelete}>
                Cancel
              </button>
              <button className={styles.confirm} onClick={confirmDelete}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
