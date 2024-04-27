import React from "react";
import { withRouter, Link } from "react-router-dom";
import graphQLFetch from "./graphQLFetch";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

// EmployeeDetails component to display employee details
class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: null,
      loading: true,
      error: null,
    };
  }

  // Fetch employee details by ID from the database using GraphQL query
  async componentDidMount() {
    const { match } = this.props;
    const {
      params: { id },
    } = match;

    const query = `
      query GetEmployeeById($id: ID!) {
        employeeById(id: $id) {
          _id
          FirstName
          LastName
          Age
          DateOfJoining
          Title
          Department
          EmployeeType
          CurrentStatus
          timeLeftForRetirement {
            years
            months
            days
          }
        }
      }
    `;

    try {
      const data = await graphQLFetch(query, { id });
      this.setState({
        employee: data.employeeById,
        loading: false,
        timeLeftForRetirement: data.employeeById.timeLeftForRetirement,
      });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  render() {
    const { employee, timeLeftForRetirement, loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Employee not found</p>;
    }

    if (!employee) {
      return <p>Employee not found</p>;
    }

    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card
          style={{
            width: "600px",
            padding: "30px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="m-0" style={{ fontSize: "1.5rem" }}>
              Employee Details
            </h3>
            <Link
              to="/"
              className="text-decoration-none font-weight-bold"
              style={{ color: "#007bff" }}
            >
              &#8592; Back to Employees
            </Link>
          </div>
          <div>
            <div className="mb-2">
              <strong>First Name:</strong> {employee.FirstName}
            </div>
            <div className="mb-2">
              <strong>Last Name:</strong> {employee.LastName}
            </div>
            <div className="mb-2">
              <strong>Age:</strong> {employee.Age}
            </div>
            <div className="mb-2">
              <strong>Date of Joining:</strong>{" "}
              {new Date(employee.DateOfJoining).toISOString().split("T")[0]}{" "}
            </div>
            <div className="mb-2">
              <strong>Title:</strong> {employee.Title}
            </div>
            <div className="mb-2">
              <strong>Department:</strong> {employee.Department}
            </div>
            <div className="mb-2">
              <strong>Employee Type:</strong> {employee.EmployeeType}
            </div>
            <div className="mb-2">
              <strong>Current Status:</strong> {employee.CurrentStatus}
            </div>
            {timeLeftForRetirement && (
              <div
                className="mb-2"
                style={{
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <strong style={{ fontSize: "1rem", color: "#333" }}>
                  Time Left for Retirement:
                </strong>{" "}
                <span style={{ fontSize: "1rem" }}>
                  {timeLeftForRetirement.years >= 0
                    ? `${timeLeftForRetirement.years} years, `
                    : "Already Retired "}
                  {timeLeftForRetirement.months >= 0
                    ? `${timeLeftForRetirement.months} months, `
                    : ""}
                  {timeLeftForRetirement.days >= 0
                    ? `${timeLeftForRetirement.days} days`
                    : ""}
                </span>
              </div>
            )}
          </div>
        </Card>
      </Container>
    );
  }
}

export default withRouter(EmployeeDetails);
