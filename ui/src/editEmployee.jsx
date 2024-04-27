import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import graphQLFetch from "./graphQLFetch";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// EmployeeEdit component to edit employee details
class EmployeeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {
        _id: "",
        FirstName: "",
        LastName: "",
        Age: "",
        Title: "",
        Department: "",
        EmployeeType: "",
        DateOfJoining: "",
        CurrentStatus: "",
      },
      errors: {},
    };
  }

  // Fetch employee details by ID from the database using GraphQL query
  async componentDidMount() {
    const { id } = this.props.match.params;

    const query = `
      query employeeById($id: ID!) {
        employeeById(id: $id) {
          _id
          FirstName
          LastName
          Age
          Title
          Department
          EmployeeType
          DateOfJoining
          CurrentStatus
        }
      }
    `;
    const data = await graphQLFetch(query, { id });
    if (data && data.employeeById) {
      this.setState({ employee: data.employeeById });
    }
  }

  // Handle form input changes
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      employee: {
        ...prevState.employee,
        [name]: value,
      },
    }));
  };

  // Handle form submission and update employee details
  handleSubmit = async (e) => {
    e.preventDefault();
    const { employee } = this.state;
    const { _id, ...employeeData } = employee;
    const mutation = `
      mutation updateEmployee($id: ID!, $employee: EmployeeUpdateInputs!) {
        update(id: $id, employee: $employee) {
          _id
          FirstName
          LastName
          Age
          Title
          Department
          EmployeeType
          DateOfJoining
          CurrentStatus
        }
      }
    `;
    try {
      const data = await graphQLFetch(mutation, {
        id: _id,
        employee: employeeData,
      });
      if (data && data.update) {
        console.log("Employee updated successfully:", data.update);
        
        // Display success message and redirect to home page
        toast.success("Employee Updated Successfully.", { autoClose: 2000 });
        setTimeout(() => {
          this.props.history.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Render the form to edit employee details
  render() {
    const { employee } = this.state;
    let formattedDate = "";
    if (employee.DateOfJoining) {
      const date = new Date(employee.DateOfJoining);
      if (!isNaN(date.getTime())) {
        formattedDate = date.toISOString().split("T")[0];
      }
    }

    return (
      <Container className="mt-4">
        <h4>Edit Employee</h4>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="FirstName"
                value={employee.FirstName}
                onChange={this.handleChange}
                disabled
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="LastName"
                value={employee.LastName}
                onChange={this.handleChange}
                disabled
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="Age"
                value={employee.Age}
                onChange={this.handleChange}
                disabled
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control
                type="date"
                name="DateOfJoining"
                value={formattedDate}
                onChange={this.handleChange}
                disabled
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="select"
                name="Title"
                value={employee.Title}
                onChange={this.handleChange}
              >
                <option value="">Select Title</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </Form.Control>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                as="select"
                name="Department"
                value={employee.Department}
                onChange={this.handleChange}
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </Form.Control>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Employee Type</Form.Label>
              <Form.Control
                as="select"
                name="EmployeeType"
                value={employee.EmployeeType}
                onChange={this.handleChange}
              >
                <option value="">Select Employee Type</option>
                <option value="FullTime">Full Time</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </Form.Control>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Current Status</Form.Label>
              <Form.Control
                as="select"
                name="CurrentStatus"
                value={employee.CurrentStatus}
                onChange={this.handleChange}
              >
                <option value="Working">Working</option>
                <option value="Retired">Retired</option>
              </Form.Control>
            </Col>
          </Row>
          <Button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "#008eb0", color: "white" }}
          >
            Update Employee
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(EmployeeEdit);
