export default class EmployeeSearch extends React.Component {
  render() {
    return (
      <div className="container mt-4">
        <h4>Search Employees</h4>
        <div className="input-group input-group-sm mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
          />
        </div>
      </div>
    );
  }
}
