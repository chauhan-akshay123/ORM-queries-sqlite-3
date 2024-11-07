# Employee Management API

This project is an Employee Management API built with Node.js, Express, and Sequelize (with a MySQL/PostgreSQL/SQLite database). It allows users to perform CRUD operations on employee data, including creating, reading, updating, deleting, and filtering employees based on their attributes.

## Features

- **Database Seeding**: Seed the database with initial employee data.
- **CRUD Operations**:
- Create a new employee record.
- Retrieve all employees or filter employees by specific criteria.
- Update an employee's details by ID.
- Delete an employee record by ID.
- **Filtering and Sorting**:
- Retrieve employees by department.
- Sort employees based on their salary.

## Endpoints

### 1. Seed Database

Seeds the database with a list of sample employees.

- **URL**: `/seed_db`
- **Method**: `GET`
- **Response**: `{ message: "Database seeding successful." }`

### 2. Fetch All Employees

Retrieves all employee records.

- **URL**: `/employees`
- **Method**: `GET`
- **Response**: `{ employees: [...] }` (Returns an array of all employee records)

### 3. Fetch Employee by ID

Fetches details of a specific employee based on their ID.

- **URL**: `/employees/details/:id`
- **Method**: `GET`
- **Response**: `{ employee: {...} }` (Returns the employee details)

### 4. Fetch Employees by Department

Fetches employees based on their department.

- **URL**: `/employees/department/:department`
- **Method**: `GET`
- **Response**: `{ employees: [...] }` (Returns employees in the specified department)

### 5. Sort Employees by Salary

Sorts employees by salary in ascending or descending order.

- **URL**: `/employees/sort/salary`
- **Method**: `GET`
- **Query Params**: `order` (`ASC` or `DESC`)
- **Response**: `{ employees: [...] }` (Returns employees sorted by salary)

### 6. Add New Employee

Adds a new employee record.

- **URL**: `/employees/new`
- **Method**: `POST`
- **Request Body**: `{ newEmployee: {...} }`
- **Response**: `{ newEmployee: {...} }` (Returns the newly created employee)

### 7. Update Employee by ID

Updates an existing employee's information.

- **URL**: `/employees/update/:id`
- **Method**: `POST`
- **Request Body**: `{ ...updatedFields }`
- **Response**: `{ message: "Employee has been updated successfully.", updatedEmployee: {...} }`

### 8. Delete Employee by ID

Deletes an employee record based on the provided ID.

- **URL**: `/employees/delete`
- **Method**: `POST`
- **Request Body**: `{ id: employeeId }`
- **Response**: `{ message: "Employee record has been deleted successfully." }`

## Setup and Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/employee-management-api.git
cd employee-management-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up your database in the `lib/index.js` file (using Sequelize), with a configuration like this:

```javascript
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
host: 'localhost',
dialect: 'mysql' // or 'postgres' or 'sqlite' as per your database
});
```

4. Run the server:

```bash
node index.js
```

The server should be running on `http://localhost:3000`.

## Technologies Used

- **Node.js** and **Express**: For backend API creation.
- **Sequelize**: For ORM and database interaction.
- **MySQL/PostgreSQL/SQLite**: For data storage.
- **Cors**: To allow cross-origin requests.

## Error Handling

Errors are handled with appropriate HTTP status codes and error messages. Common responses include:

- **404 Not Found**: For non-existent employee records.
- **500 Internal Server Error**: For any unexpected issues.

## Example Usage

To seed the database, visit:

```
http://localhost:3000/seed_db
```

To add a new employee, use a POST request to `/employees/new` with employee data in the body. For example:

```json
{
"newEmployee": {
"name": "Alice Johnson",
"designation": "Developer",
"department": "Engineering",
"salary": 80000
}
}
```
