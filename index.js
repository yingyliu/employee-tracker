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


// first prompt
function companyStructure() = {
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
                break;
            case 'Add an employee':
                break;
            case 'Update an employee role':
                break;
            case 'Exit':
                break;
        }
    })
}