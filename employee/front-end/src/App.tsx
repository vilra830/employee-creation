import "./App.css";
import EmployeeForm from "./components/Employee/EmployeeForm";
import React from "react";

function App() {
  return (
    <div className="App">
      <h1>Employee Form</h1>
      <EmployeeForm /> {/* Render the EmployeeForm component */}
    </div>
  );
}

export default App;
