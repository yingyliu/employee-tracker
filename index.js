// Import and require mysql2
const mysql = require('mysql2');

// const express = require('express');
const inquirer = require('inquirer');
// import inquirer from 'inquirer';

// const app = express();

const teamArray =[];

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

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


// function to ask the user what they want to do
function companyStructure() {
    inquirer.prompt (
        {
            type:"list",
            name: "overview",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"],
        }
    )
    .then(answer => {
        console.log(answer)
        // const { overview } = answers;
        const overview = answer.overview;

        switch (overview) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDept()
                break;
            case 'Add a role':
                addRole()
                break;
            case 'Add an employee':
                addEmployee()
                break;
            case 'Update an employee role':
                updateEmployeeRole()
                break;
            case 'Exit':
                db.end();
                break;
        }
    })
}

// Display view all departments
function viewDepartments() {
    db.query('SELECT * FROM departments', function(err, results) { 
        if(results){
            console.table(results);
        }
        // ask the user what they want to do again
        companyStructure();
    });
};

// Display view all roles
function viewRoles() {
    db.query('SELECT * FROM roles', function(err, results) { 
        if(results){
            console.table(results);
        }
        // ask the user what they want to do again
        companyStructure();
    });
};

// Display view all employees
function viewEmployees() {
    db.query('SELECT * FROM employees', function(err, results) { 
        if(results){
            console.table(results);
        }
        // ask the user what they want to do again
        companyStructure();
    });
};

// Add Dept prompt
function addDept() {
    inquirer.prompt ([
        {
            type: "input",
            name: "addADepartment",
            message: "What is the name of the department?",
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        db.query(sql, answer.addADepartment, (err, result) => {
                console.log("Department added");

                teamArray.push(sql);
                companyStructure();
        })
    })
};


// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
    inquirer.prompt ([
        {
            type: "input",
            name: "newRole",
            message: "What is the name of the role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: "input",
            name: "dept",
            message: "Which department does the role belong to?",
        }

    ])
    .then(answers => {
        const params = [answers.role, answers.salary, answers.dept];
        const sqlRole = `SELECT roles.title AS newRole, roles.salary AS salary, roles.dept_id AS dept FROM roles, `;
        db.query(sqlRole, params, (err, result) => {
                console.log("New role added");

                teamArray.push(sqlRole, params);
                companyStructure();
        })
    })
};


// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 



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

companyStructure();