import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

// EmployeeFilter component to filter employees by type and upcoming retirement
class EmployeeFilter extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { search },
    } = props;
    const params = new URLSearchParams(search);
    this.state = {
      employeeType: params.get("employeeType") || "",
      filterOption: params.get("filterOption") || "All",
      changed: false,
    };
    this.onChangeEmployeeType = this.onChangeEmployeeType.bind(this);
    this.onChangeFilterOption = this.onChangeFilterOption.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevSearch = prevProps.location.search;
    const search = this.props.location.search;
    if (prevSearch !== search) {
      this.resetFilter();
    }
  }

  render() {
    const { employeeType, filterOption, changed } = this.state;
    return (
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <h5>Filter Employee</h5>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4} className="d-flex">
            <Form.Select
              className="mr-2 form-control w-auto"
              value={employeeType}
              onChange={this.onChangeEmployeeType}
            >
              <option value="">All</option>
              <option value="FullTime">Full Time</option>
              <option value="PartTime">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </Form.Select>
            <Form.Select
              className="mr-2 form-control w-auto"
              value={filterOption}
              onChange={this.onChangeFilterOption}
            >
              <option value="All">All</option>
              <option value="UpcomingRetirement">Upcoming Retirement</option>
            </Form.Select>
            <Button variant="secondary" onClick={this.applyFilter}>
              Apply
            </Button>
            <Button
              variant="secondary"
              className="ml-2"
              onClick={this.resetFilter}
              disabled={!changed}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  // Update the employeeType state when the user selects a filter
  onChangeEmployeeType(e) {
    this.setState({ employeeType: e.target.value, changed: true });
  }

  // Update the filterOption state when the user selects a filter option
  onChangeFilterOption(e) {
    this.setState({ filterOption: e.target.value, changed: true });
  }

  // Apply filter to the employee list
  applyFilter() {
    const { employeeType, filterOption } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "/employees-list",
      search: `?employeeType=${employeeType}&filterOption=${filterOption}`,
    });
  }

  // Reset the filter
  resetFilter() {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      employeeType: params.get("employeeType") || "",
      filterOption: params.get("filterOption") || "All",
      changed: false,
    });
  }
}

export default withRouter(EmployeeFilter);
