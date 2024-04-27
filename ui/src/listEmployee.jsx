// listEmployee.jsx

import React from "react";
import EmployeeTable from "./employeeTable";
import graphQLFetch from "./graphQLFetch";
import EmployeeFilter from "./filterEmployee";
import { Route } from "react-router-dom";

export default class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = { employeeList: [] };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.location.search;
    const search = this.props.location.search;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async loadData() {
    try {
      const { location } = this.props;
      const params = new URLSearchParams(location.search);
      const EmployeeType = params.get("employeeType");
      const filterOption = params.get("filterOption");

      const query = `query employeeList($EmployeeType: String, $filterOption: String) {
        employeeList(EmployeeType: $EmployeeType, filterOption: $filterOption) { 
          _id,
          FirstName,
          LastName,
          Age,
          DateOfJoining,
          Title,
          Department,
          EmployeeType,
          CurrentStatus
        }
      }`;

      const data = await graphQLFetch(query, { EmployeeType, filterOption });
      if (data) {
        this.setState({ employeeList: data.employeeList });
      }
    } catch (error) {
      console.error("Error fetching employee list:", error.message);
    }
  }

  render() {
    const { employeeList } = this.state;

    return (
      <div>
        <EmployeeFilter />
        <EmployeeTable employeeList={employeeList} />
      </div>
    );
  }
}
