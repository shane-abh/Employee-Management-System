// Validation function for creating an employee
function validateEmployeeInput(employeeData) {
    const {
        FirstName,
        LastName,
        Age,
        DateOfJoining,
        Title,
        Department,
        EmployeeType
    } = employeeData;

    // Validate FirstName and LastName (non-empty strings)
    if (!FirstName || !LastName) {
        throw new Error('First Name and Last Name are required.');
    }

    // Validate Age between 20 and 70
    const parsedAge = parseInt(Age, 10);
    if (isNaN(parsedAge) || parsedAge < 20 || parsedAge > 70) {
        throw new Error('Age must be a number between 20 and 70.');
    }

    // Validate DateOfJoining 
    if (!DateOfJoining) {
        throw new Error('Date of Joining is required.');
    }

    // Validate Title, Department, and EmployeeType against allowed values
    const allowedTitles = ['Employee', 'Manager', 'Director', 'VP'];
    const allowedDepartments = ['IT', 'Marketing', 'HR', 'Engineering'];
    const allowedEmployeeTypes = ['FullTime', 'PartTime', 'Contract', 'Seasonal'];

    if (!allowedTitles.includes(Title)) {
        throw new Error(`Invalid Title. Allowed values: ${allowedTitles.join(', ')}`);
    }

    if (!allowedDepartments.includes(Department)) {
        throw new Error(`Invalid Department. Allowed values: ${allowedDepartments.join(', ')}`);
    }

    if (!allowedEmployeeTypes.includes(EmployeeType)) {
        throw new Error(`Invalid Employee Type. Allowed values: ${allowedEmployeeTypes.join(', ')}`);
    }
}

module.exports = validateEmployeeInput;