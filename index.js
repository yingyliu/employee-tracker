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
        const paramsOne = [answers.newRole, answers.salary, answers.dept];
        // const sqlRole = `INSERT INTO role(title, salary, dept_id) VALUES (?,?,?)`;
        const sqlRole = `INSERT INTO roles(title, salary, dept_id) VALUES (?, ?, ?)`;
        db.query(sqlRole, paramsOne, (err, result) => {
                console.log(result);

                teamArray.push(sqlRole, paramsOne);
                companyStructure();
        })
    })
};


// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

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
        const paramsTwo = [answers.firstName, answers.lastName, answers.role, answers.assignManager];
        const sqlAddEmployee = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,?)`;
        db.query(sqlAddEmployee, paramsTwo, (err, result) => {
                console.log(result);

                teamArray.push(sqlAddEmployee, paramsTwo);
                companyStructure();
        })
        
    });
}



// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

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
        const paramsThree = [answers.firstName, answers.lastName, answers.role, answers.assignManager];
        const sqlAddEmployee = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,?)`;
        db.query(sqlAddEmployee, paramsThree, (err, result) => {
                console.log(result);

                teamArray.push(sqlAddEmployee, paramsThree);
                companyStructure();
        })
    });
}

companyStructure();