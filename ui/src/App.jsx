import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import Page from "./page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Render the Page component with the EmployeeDirectory component
const element = (
  <Router>
    <>
      <Page />
      <ToastContainer position="top-center" toastStyle={{ margin: "1 auto" }} />
    </>
  </Router>
);
ReactDOM.render(element, document.getElementById("app"));
