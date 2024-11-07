# Employee Management API

This is an Express-based API for managing employee records. The API allows you to seed the database with initial employee data, retrieve all employees, fetch employee details by specific criteria, and sort employees by salary. Sequelize ORM is used to interact with a SQL-compatible database (default is SQLite).

## Features

- Seed the database with sample employee data
- Fetch all employees
- Fetch employee details by ID
- Retrieve employees by department
- Sort employees by salary in ascending or descending order

## Prerequisites

- **Node.js** and **npm** installed on your system
- **SQLite** database (default), or you can configure Sequelize for other SQL databases

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/employee-management-api.git
   cd employee-management-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Sequelize:**
   Ensure that `sequelize` is configured in the `lib/index.js` file to connect to your preferred database. By default, SQLite is used.

4. **Start the Server:**
   ```bash
   node app.js
   ```

   The server will run at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. Seed the Database

- **URL**: `/seed_db`
- **Method**: `GET`
- **Description**: Seeds the database with initial employee data.
- **Response**:
  - `200 OK`: `{"message": "Database seeding successful."}`
  - `500 Internal Server Error`: `{"message": "Error seeding the database", "error": "error message"}`

### 2. Fetch All Employees

- **URL**: `/employees`
- **Method**: `GET`
- **Description**: Fetches all employee records.
- **Response**:
  - `200 OK`: `{ "employees": [ ... ] }`
  - `404 Not Found`: `{"message": "No employee found."}`
  - `500 Internal Server Error`: `{"message": "Error fetching employees", "error": "error message"}`

### 3. Fetch Employee by ID

- **URL**: `/employees/details/:id`
- **Method**: `GET`
- **Description**: Fetches a specific employee by their ID.
- **Response**:
  - `200 OK`: `{ "employee": { ... } }`
  - `404 Not Found`: `{"message": "Employee not found."}`
  - `500 Internal Server Error`: `{"message": "Error fetching employee by ID", "error": "error message"}`

### 4. Fetch Employees by Department

- **URL**: `/employees/department/:department`
- **Method**: `GET`
- **Description**: Retrieves all employees in a specific department.
- **Response**:
  - `200 OK`: `{ "employees": [ ... ] }`
  - `404 Not Found`: `{"message": "No employees found."}`
  - `500 Internal Server Error`: `{"message": "Error fetching employees by department", "error": "error message"}`

### 5. Sort Employees by Salary

- **URL**: `/employees/sort/salary`
- **Method**: `GET`
- **Description**: Sorts employees by their salary in ascending or descending order.
- **Query Parameter**: `order` (values: `ASC` for ascending, `DESC` for descending)
- **Response**:
  - `200 OK`: `{ "employees": [ ... ] }`
  - `404 Not Found`: `{"message": "No employees found."}`
  - `500 Internal Server Error`: `{"message": "Error fetching sorted employees", "error": "error message"}`

## Example Usage

1. **Seed the Database**
   ```bash
   curl http://localhost:3000/seed_db
   ```

2. **Fetch All Employees**
   ```bash
   curl http://localhost:3000/employees
   ```

3. **Fetch Employee by ID**
   ```bash
   curl http://localhost:3000/employees/details/1
   ```

4. **Fetch Employees by Department**
   ```bash
   curl http://localhost:3000/employees/department/Engineering
   ```

5. **Sort Employees by Salary (Descending)**
   ```bash
   curl "http://localhost:3000/employees/sort/salary?order=desc"
   ```

## Technologies Used

- **Express** - For building the API
- **Sequelize** - ORM for managing the database
- **SQLite** - Default database (can be configured for other databases)
- **Cors** - Enables cross-origin requests

