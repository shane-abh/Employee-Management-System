import React from "react";
import { Link } from "react-router-dom";

// Nav component to display navigation links
export default class Nav extends React.Component {
  render() {
    return (
      <nav
        style={{
          backgroundColor: "#008eb0",
          color: "white",
          padding: "15px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: "1", textAlign: "left" }}>
            <h1 style={{ margin: 0, fontSize: "24px" }}>EMS</h1>
          </div>
          <div style={{ flex: "1", textAlign: "right" }}>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              <li style={{ display: "inline", marginRight: "24px" }}>
                <Link to="/employees-list" style={{ color: "white" }}>
                  Employees List
                </Link>
              </li>
              <li style={{ display: "inline", marginRight: "24px" }}>
                <Link
                  to="/employees-list?employeeType=&filterOption=UpcomingRetirement"
                  style={{ color: "white" }}
                >
                  Upcoming Retirement
                </Link>
              </li>
              <li style={{ display: "inline" }}>
                <Link to="/create-employee" style={{ color: "white" }}>
                  Add Employee
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
