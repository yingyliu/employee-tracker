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


// function addDept() {
//     inquirer.prompt ([
//         {
//             type:"input",
//             name: "addADepartment",
//             message: "What is the name of the department?",
//         }
//     ])
//     .then(answer => {
//         const sql = `INSERT INTO departments (name) VALUES (?)`;
//         // const params = [body.name];

//         db.query(sql, answer.addADepartment, (err, result) => {
//             if(result){
//                 console.table(result);
//             }
//             // ask the user what they want to do again
//             companyStructure();
//         }
//         // const createDept = new Department(answer.addADepartment);
//         // teamArray.push(createDept);
//     })
// }

// Add Dept prompt
function addDept() {
    inquirer.prompt ([
        {
            type: "input",
            name: "addADepartment",
            message: "What is the name of the department?",
            validate: addADepartment =>{
                if (addADepartment) {
                    return true;
                } else {
                    console.log('Please enter a department name');
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        db.query(sql, answer.addADepartment, (err, result) => {
            if(result){
                console.table(result);
                teamArray.push(sql);
                companyStructure();
            }
        })
    })
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

companyStructure();