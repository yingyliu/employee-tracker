// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');

function companyStructure() = {
    inquirer.prompt ([
        {
            type:"list",
            name: "overview",
            message: "Please select the following option.",
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