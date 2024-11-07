const express = require("express");
const cors = require("cors");
const app = express();
let { employee } = require("./models/employee.model");
let { sequelize } = require("./lib/index");

app.use(express.json());
app.use(cors());

let employeeData = [
	{
	  id: 1,
	  name: 'Alice',
	  salary: 60000,
	  department: 'Engineering',
	  designation: 'Software Engineer'
	},
	{
    id: 2,
    name: 'Bob',
    salary: 70000,
    department: 'Marketing',
    designation: 'Marketing Manager'
  },
	{
	  id: 3,
	  name: 'Charlie',
	  salary: 80000,
	  department: 'Engineering',
	  designation: 'Senior Software Engineer'
	}
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

app.listen(3000, () => {
  console.log("Server is running on Port : 3000");
});