const express = require("express");
const cors = require("cors");
const app = express();
let { employee } = require("./models/employee.model");
let { sequelize } = require("./lib/index");

app.use(express.json());
app.use(cors());

let employeeData =[
    {
      id: 1,
      name: 'John Doe',
      designation: 'Manager',
      department: 'Sales',
      salary: 90000,
    },
    {
      id: 2,
      name: 'Anna Brown',
      designation: 'Developer',
      department: 'Engineering',
      salary: 80000,
    },
    {
      id: 3,
      name: 'James Smith',
      designation: 'Designer',
      department: 'Marketing',
      salary: 70000,
    },
    {
      id: 4,
      name: 'Emily Davis',
      designation: 'HR Specialist',
      department: 'Human Resources',
      salary: 60000,
    },
    {
      id: 5,
      name: 'Michael Wilson',
      designation: 'Developer',
      department: 'Engineering',
      salary: 85000,
    },
    {
      id: 6,
      name: 'Sarah Johnson',
      designation: 'Data Analyst',
      department: 'Data Science',
      salary: 75000,
    },
    {
      id: 7,
      name: 'David Lee',
      designation: 'QA Engineer',
      department: 'Quality Assurance',
      salary: 70000,
    },
    {
      id: 8,
      name: 'Linda Martinez',
      designation: 'Office Manager',
      department: 'Administration',
      salary: 50000,
    },
    {
      id: 9,
      name: 'Robert Hernandez',
      designation: 'Product Manager',
      department: 'Product',
      salary: 95000,
    },
    {
      id: 10,
      name: 'Karen Clark',
      designation: 'Sales Associate',
      department: 'Sales',
      salary: 55000,
    },
  ];

// Defining a route to seed the database
app.get("/seed_db", async (req, res) => {
 try{
   await sequelize.sync({ force: true });
   await employee.bulkCreate(employeeData);
   
   res.status(200).json({ message: "Database seeding successful." });

 } catch(error){
   res.status(500).json({ message: "Error seeding the database", error: error.message });
 }
});

// function to fetch all employees
async function fetchAllEmployees(){
  let employees = await employee.findAll();
  return { employees };
}

// Endpoint to fetch all employees
app.get("/employees", async (req, res) => {
 try{ 
 let response = await fetchAllEmployees();
 
 if(response.employees.length === 0){
   return res.status(404).json({ message: "No employee found." });
 }

 return res.status(200).json(response);
 } catch(error){
   res.status(500).json({ message: "Error fetching employees", error: error.message });
 }
});

// function to fetch employee details by Id
async function fetchEmployeeById(id){
  let employeeData = await employee.findOne({ where: {id} });
  return { employee : employeeData };
}

// Endpoint to fetch employee details by Id
app.get("/employees/details/:id", async (req, res) => {
  try{
    let id = parseInt(req.params.id);
    let result = await fetchEmployeeById(id);

    if(result.employee === null){
      return res.status(404).json({ message: "Employee not found." });
    }
    
    return res.status(200).json(result);
  } catch(error){
    res.status(500).json({ message: "Error fetching employee by Id", error: error.message });
  }
});

// function to fetch all employees by department
async function fetchEmployeesByDepartment(department){
  let employees = await employee.findAll({where: { department }});
  return { employees: employees };
}

// Endpoint to fetch all employees by department
app.get("/employees/department/:department", async (req, res) => {
 try{
  let department = req.params.department;
  let result = await fetchEmployeesByDepartment(department);

  if(result.employees.length === 0){
    return res.status(404).json({ message: "No employees found." });
  }
  
  return res.status(200).json(result);
 } catch(error){
   res.status(500).json({ message: "Error fetching employees by department", error: error.message });
 }
});

// function to sort all employees by their salaries
async function sortedEmployees(order){
  let sortedEmployee = await employee.findAll({order: [["salary", order]]});
  return { employees: sortedEmployee };
}

// Endpoint to sort all employees by their salaries
app.get("/employees/sort/salary", async (req, res) => {
  try{
    let order = req.query.order;
    let result = await sortedEmployees(order);

    if(result.employees.length === 0){
      return res.status(404).json({ message: "No employees found." });
    }

    return res.status(200).json(result);
  } catch(error){
    res.status(500).json({ message: "Error fething sorted employees", error: error.message });
  }
});

// function to add a new employee
async function addNewEmployee(employeeData){
   let newEmployee = await employee.create(employeeData);
   
   return {newEmployee};
}

// Endpoint to add new employee
app.post("/employees/new", async (req, res) => {
 try{
    let newEmployee = req.body.newEmployee;
    let response = await addNewEmployee(newEmployee);
    return res.status(200).json(response);
 } catch(error){
    res.status(500).json({ message: "Error adding new employee", error: error.message });
 }
});

// function to update employee information by Id
async function updateById(updateEmployeeData, id){
    let employeeDetails = await employee.findOne({ where: { id } });
    if(!employeeDetails){
       return {}; 
    }

    employeeDetails.set(updateEmployeeData);
    let updatedEmployee = await employeeDetails.save();

    return { message: "Employee has been updated successfully.", updatedEmployee };
}

// Endpoint to update employee information
app.post("/employees/update/:id", async (req, res) => {
 try{
    let newEmployeeData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateById(newEmployeeData ,id);

    if(!response.message){
        return res.status(404).json({ message: "Employee not found." });
    }
    
    return res.status(200).json(response);
 } catch(error){
    res.status(500).json({ message: "Error updating employee", error: error.message });
 }
});

// function to delete an employee
async function deleteById(id){
 let destroyedEmployee = await employee.destroy({ where: { id } });

 if(destroyedEmployee === 0){
    return {};
 }

 return { message: "Employee record has been deleted successfully." };
}

// Endpoint to delete an employee
app.post("/employees/delete", async (req, res) => {
  try{
    let id = parseInt(req.body.id);
    let response = await deleteById(id);

    if(!response.message){
        return res.status(404).json({ message: "Employee not found." });
    }

    return res.status(200).json(response);
  } catch(error){
    res.status(500).json({ message: "Error deleting the employee", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on Port : 3000");
});
