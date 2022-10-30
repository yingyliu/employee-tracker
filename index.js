// Import and require mysql2
const mysql = require('mysql2');

const express = require('express');
const inquirer = require('inquirer');

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',//MySQL username
        password: 'password', //MySQL password
        database: 'employee_db'
    },
    console.log(`connected to the employee_db datatbase.`)
);

// Query database
db.query('SELECT * FROM department', function(err, results) {

    if(results){
        results.forEach(function(dept){
            console.log(dept)
        })
    }
});

const teamArray =[];

// First prompt
function companyStructure() {
    inquirer.prompt ([
        {
            type:"list",
            name: "overview",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"],
        }
    ])
    .then(answers => {
        const {menu} = answers;

        switch (menu) {
            case 'View all departments':
                break;
            case 'View all roles':
                break;
            case 'View all employees':
                break;
            case 'Add a department':
                addDept()
                break;
            case 'Add an employee':
                addEmployee()
                break;
            case 'Update an employee role':
                updateEmployeeRole()
                break;
            case 'Exit':
                break;
        }
    })
}

// Add Dept prompt
function addDept() {
    inquirer.prompt ([
        {
            type:"input",
            name: "addADepartment",
            message: "What is the name of the department?",
        }
    ])
    .then(answers => {
        const createDept = new Department(answers.addADepartment);
        teamArray.push(createDept);
        companyStructure();
    });
}

// Add Employee prompt
function addEmployee() {
    inquirer.prompt ([
        {
            type:"input",
            name: "firstName",
            message: "What is the employee's first name?",
        },
        {
            type:"input",
            name: "lastName",
            message: "What is the employee's last name?",
        },
        {
            type:"input",
            name: "role",
            message: "What is the employee's role?",
        },
        {
            type:"input",
            name: "assignManager",
            message: "What is the employee's manager?",
        },
    ])
    .then(answers => {
        const createNewEmployee = new Employee(answers.firstName, answers.lastName, answers.role, answers.assignManager);
        teamArray.push(createNewEmployee);
        companyStructure();
    });
}

// Update Employee Role prompt
function updateEmployeeRole() {
    inquirer.prompt ([
        {
            type:"input",
            name: "updateRole",
            message: "Which employee's role do you want to update?",
        }
    ])
    .then(answers => {
        const updateEmployeeInfo = new EmployeeInfo(answers.updateRole);
        teamArray.push(updateEmployeeInfo);
        companyStructure();
    });
}

companyStructure()