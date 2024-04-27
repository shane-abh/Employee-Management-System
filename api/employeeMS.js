const {
    getDb
} = require('./db');
const {
    ObjectId
} = require('mongodb');

function getLastDayOfMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}


// function for fetching employee list 
async function employeeList(_, {
    EmployeeType,
    filterOption
}) {
    try {
        const filter = {};
        if (EmployeeType) {
            filter.EmployeeType = EmployeeType;
        }

        const db = getDb();
        let employees = await db.collection('employees').find(filter).toArray();

        if (filterOption === 'UpcomingRetirement') {
            // current date is 20th July 2024, as per the instructions
            const currentDate = new Date(2024, 6, 20);
            // six months from currentDate is 31st December 2024
            const sixMonthsFromNow = new Date(currentDate.getFullYear(), 11, 31);

            employees = employees.filter(employee => {
                const joiningDate = new Date(employee.DateOfJoining);
                const ageAtJoining = employee.Age;
                const retirementYear = joiningDate.getFullYear() + (65 - ageAtJoining);
                const retirementDate = new Date(retirementYear, 11, 31);

                // console.log(employee.FirstName, ageAtJoining, joiningDate, retirementYear, retirementDate);

                // display employee who will retire within 6 months from currentDate
                return retirementDate > currentDate && retirementDate <= sixMonthsFromNow;
            });
        }

        return employees;
    } catch (error) {
        console.error('Error fetching employee list:', error.message);
        return [];
    }
}


// function for validating employee input fields 
function employeeValidate(employee) {
    const errors = [];

    if (!employee.FirstName || !employee.LastName) {
        errors.push('Fields "FirstName" and "LastName" are required.');
    }

    if (!employee.Age) {
        errors.push('Field "Age" is required.');
    }

    if (employee.Age <= 20 || employee.Age >= 70) {
        errors.push('Enter age between 20 and 70.');
    }

    if (!employee.Title) {
        errors.push('Field "Title" is required.');
    }

    if (!employee.Department) {
        errors.push('Field "Department" is required.');
    }

    if (!employee.DateOfJoining) {
        errors.push('Field "DateOfJoining" is required.');
    }

    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', {
            errors
        });
    }
}

// function for adding employee 
async function employeeAdd(_, {
    employee
}) {
    const db = getDb();
    employeeValidate(employee);
    const result = await db.collection('employees').insertOne(employee);
    const savedEmployee = await db.collection('employees')
        .findOne({
            _id: result.insertedId
        });
    return savedEmployee;
}

// Function for fetching employee by ID and
async function employeeById(_, {
    id
}) {
    try {
        const db = getDb();

        // Converting the string id to Object Id for MongoDB id
        const objectId = new ObjectId(id);

        const employee = await db.collection('employees').findOne({
            _id: objectId
        });
        if (!employee) {
            throw new Error("Employee not found");
        }

        // Calculate retirement date
        const joiningDate = new Date(employee.DateOfJoining);
        const ageAtJoining = employee.Age;
        // Assuming retirement age is 65 as per the instructions 
        const retirementYear = joiningDate.getFullYear() + 65 - ageAtJoining;
        // Last day of December of the retirement year
        const retirementDate = new Date(retirementYear, 11, getLastDayOfMonth(12, retirementYear));

        // Assuming currentDate 20th July 2024, as per the instructions
        const currentDate = new Date(2024, 6, 20);
        // Calculating time left for retirement from currentDate
        const timeLeftForRetirement = calculateTimeLeft(currentDate, retirementDate);

        return {
            ...employee,
            timeLeftForRetirement
        };
    } catch (error) {
        console.error('Error fetching employee by ID:', error.message);
        throw error;
    }
}

// Calculate number of days, months, and years left for retirement
function calculateTimeLeft(currentDate, retirementDate) {
    const timeLeft = retirementDate.getTime() - currentDate.getTime();
    const years = Math.floor(timeLeft / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((timeLeft % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((timeLeft % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    return {
        years,
        months,
        days
    };
}

// function for deleting employee by ID 
const employeeDelete = async (_, {
    id
}) => {
    try {
        const db = getDb();
        const objectId = new ObjectId(id);

        // Fetching employee by ID
        const employee = await db.collection('employees').findOne({
            _id: objectId
        });

        // Checking for employee exists
        if (!employee) {
            throw new Error("Employee not found");
        }

        // Check if CurrentStatus is active
        if (employee.CurrentStatus === 'Working') {
            throw new Error("CAN'T DELETE EMPLOYEE – STATUS ACTIVE");
        }

        // Employee will Delete, if no error
        const result = await db.collection('employees').deleteOne({
            _id: objectId
        });

        // Checking if employee is deleted
        if (result.deletedCount === 1) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting employee:', error.message);
        throw error;
    }
};

// function for updating employee by ID 
async function update(_, {
    id,
    employee
}) {
    const objectId = new ObjectId(id);

    const db = getDb();
    const employees = await db.collection('employees').findOne({
        _id: objectId
    });
    Object.assign(employees, employee);

    await db.collection('employees').updateOne({
        _id: objectId
    }, {
        $set: employee
    });
    const savedEmployee = await db.collection('employees').findOne({
        _id: objectId
    });
    return savedEmployee;
}

// Exporting the functions to use in the main file 
module.exports = {
    employeeList,
    employeeAdd,
    employeeById,
    employeeDelete,
    update
};