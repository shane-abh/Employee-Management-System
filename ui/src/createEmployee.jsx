import React from "react";
import { withRouter } from "react-router-dom";
import graphQLFetch from "./graphQLFetch";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

// EmployeeCreate component with state and form validation
class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      dateOfJoining: "",
      title: "",
      department: "",
      employeeType: "",
      currentStatus: "Working",
      errors: {
        firstName: "",
        lastName: "",
        age: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
        currentStatus: "",
      },
    };
  }

  // Handle form input changes
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Validate required fields and return errors object if any errors
  validateRequiredFields = (requiredFields) => {
    const errors = {};

    requiredFields.forEach((field) => {
      const value = this.state[field];
      if (!value) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // Handle form submission and add employee to the database using GraphQL mutation
  handleSubmit = async (e) => {
    e.preventDefault();

    // Destructure form values from state and errors object from state
    const {
      firstName,
      lastName,
      age,
      dateOfJoining,
      title,
      department,
      employeeType,
      currentStatus,
      errors,
    } = this.state;

    const requiredFields = [
      "firstName",
      "lastName",
      "age",
      "dateOfJoining",
      "title",
      "department",
      "employeeType",
    ];

    // Validate required fields
    const isValid = this.validateRequiredFields(requiredFields);

    if (!isValid) {
      return;
    }

    // Validate age field
    if (age <= 20 || age >= 70) {
      this.setState({
        errors: {
          age: "Enter age above 20 and below 70",
        },
      });
      return;
    } else {
      this.setState({
        errors: {
          age: "",
        },
      });
    }

    // GraphQL mutation
    const mutation = `
        mutation {
          employeeAdd(employee: {
            FirstName: "${firstName}",
            LastName: "${lastName}",
            Age: ${parseInt(age, 10)},
            DateOfJoining: "${dateOfJoining}",
            Title: ${title},
            Department: ${department},
            EmployeeType: ${employeeType},
            CurrentStatus: ${currentStatus}
          }) {
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
      const response = await graphQLFetch(mutation);
      console.log("Employee added Successfully:", response.employeeAdd);
      // Display success message and redirect to home page
      toast.success("Employee added Successfully");
      this.props.history.push("/");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <Container className="mt-4">
        <h4>Create Employee</h4>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                {errors.firstName && (
                  <span className="text-danger">{errors.firstName}</span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                {errors.lastName && (
                  <span className="text-danger">{errors.lastName}</span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age between 21 and below 70"
                  value={this.state.age}
                  onChange={this.handleChange}
                />
                {errors.age && (
                  <span className="text-danger">{errors.age}</span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="dateOfJoining">
                <Form.Label>Date of Joining</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.dateOfJoining}
                  onChange={this.handleChange}
                />
                {errors.dateOfJoining && (
                  <span className="text-danger">{errors.dateOfJoining}</span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.title}
                  onChange={this.handleChange}
                >
                  <option value="">Select Title</option>
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="VP">VP</option>
                </Form.Control>
                {errors.title && (
                  <span className="text-danger">{errors.title}</span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.department}
                  onChange={this.handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </Form.Control>
                {errors.department && (
                  <span className="text-danger">{errors.department}</span>
                )}
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="employeeType">
                <Form.Label>Employee Type</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.employeeType}
                  onChange={this.handleChange}
                >
                  <option value="">Select Employee Type</option>
                  <option value="FullTime">Full Time</option>
                  <option value="PartTime">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                </Form.Control>
                {errors.employeeType && (
                  <span className="text-danger">{errors.employeeType}</span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Button
            className="btn-primary"
            style={{ backgroundColor: "#008eb0", color: "white" }}
            type="submit"
          >
            Create Employee
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(EmployeeCreate);
