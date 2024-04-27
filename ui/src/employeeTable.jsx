import React from "react";
import { Link } from "react-router-dom";
import graphQLFetch from "./graphQLFetch";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// EmployeeTable component to display employee details in a table
export default class EmployeeTable extends React.Component {
  // Handle delete employee action
  handleDelete = async (id) => {
    try {
      const query = `
            mutation DeleteEmployee($id: ID!) {
              employeeDelete(id: $id)
            }
          `;
      const data = await graphQLFetch(query, { id });
      if (data && data.employeeDelete) {
        toast.success("Employee Deleted Successfully.", { autoClose: 2000 });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      // Display error message using toast when cannot delete employee
      toast.error(`${error.message}`, { autoClose: 2500 });
      // alert(`${error.message}`);
      console.log("Error deleting employee:", error.message);
    }
  };

  render() {
    const { employeeList } = this.props;

    return (
      <Container className="mt-4">
        <h4>Employees Table</h4>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Join Age</th>
                <th>Date of Joining</th>
                <th>Title</th>
                <th>Department</th>
                <th>Employee Type</th>
                <th>Current Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{index + 1}</td>
                  <td>{`${employee.FirstName} ${employee.LastName}`}</td>
                  <td>{employee.Age}</td>
                  <td>
                    {
                      new Date(employee.DateOfJoining)
                        .toISOString()
                        .split("T")[0]
                    }
                  </td>
                  <td>{employee.Title}</td>
                  <td>{employee.Department}</td>
                  <td>{employee.EmployeeType}</td>
                  <td>{employee.CurrentStatus}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Employee Actions"
                    >
                      <Link
                        to={`/employees/${employee._id}`}
                        className="btn btn-primary btn-sm mr-1"
                      >
                        View
                      </Link>
                      <Link
                        to={`/employee-edit/${employee._id}`}
                        className="btn btn-success btn-sm mr-1"
                      >
                        Edit
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => this.handleDelete(employee._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    );
  }
}
