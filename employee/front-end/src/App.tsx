import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/state/store";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import Header from "./components/Header/Header";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import "./App.scss";
import EditEmployee from "./components/EditEmployee/EditEmployee";
import NewEmployeePage from "./pages/NewEmployeePage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <main className="app__content">
            <Routes>
              <Route path="/" element={<Navigate to="/employees" replace />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />
              <Route path="/employees/create" element={<NewEmployeePage />} />
              <Route path="/employees/edit/:id" element={<EditEmployee />} />
              <Route path="*" element={<Navigate to="/employees" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
