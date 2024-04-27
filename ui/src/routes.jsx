import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import EmployeeCreate from "./createEmployee.jsx";
import EmployeeDirectory from "./listEmployee.jsx";
import EmployeeDetails from "./detailEmployee.jsx";
import editEmployee from "./editEmployee.jsx";

// NotFound component to display when the route is not found
const NotFound = () => (
  <div style={{ textAlign: "center" }}>
    <h3>Oops! Page Not Found</h3>
  </div>
);

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/employees-list" />
      <Route exact path="/employees-list" component={EmployeeDirectory} />
      <Route exact path="/create-employee" component={EmployeeCreate} />
      <Route path="/employees/:id" component={EmployeeDetails} />
      <Route path="/employee-edit/:id" component={editEmployee} />
      <Route component={NotFound} />
    </Switch>
  );
}
