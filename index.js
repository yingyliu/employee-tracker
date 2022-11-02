// Import and require mysql2
const mysql = require('mysql2');

// Import inquirer from 'inquirer';
const inquirer = require('inquirer');

let teamArray =[];

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

// Add a role prompt
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
        const sqlRole = `INSERT INTO roles(title, salary, dept_id) VALUES (?, ?, ?)`;
        db.query(sqlRole, paramsOne, (err, result) => {
                console.log(result);

                teamArray.push(sqlRole, paramsOne);
                companyStructure();
        })
    })
};

// Add an Employee prompt
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
        if (answers.assignManager === "") {
            const paramsNoManager = [answers.firstName, answers.lastName, answers.role];
            const sqlAddEmployeeNoManager = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, Null)`;
            db.query(sqlAddEmployeeNoManager, paramsNoManager, (err, result) => {
                console.log(result);

                teamArray.push(sqlAddEmployeeNoManager, paramsNoManager);
                companyStructure();
            })
        } else {
        const paramsTwo = [answers.firstName, answers.lastName, answers.role, answers.assignManager];
        const sqlAddEmployee = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?,?)`;
        db.query(sqlAddEmployee, paramsTwo, (err, result) => {
                console.log(result);

                teamArray.push(sqlAddEmployee, paramsTwo);
                companyStructure();
           
            });
    }});
    
    };

// Update Employee Role prompt
function updateEmployeeRole() {
    db.query(`SELECT * FROM employees;`, (err, result) => {
        let updateEmployee = []
        result.forEach((res) => {
            updateEmployee.push(res.first_name,)
        })
    
    db.query(`SELECT * FROM roles;`, (err, result) => {
        let updateRole = []
        result.forEach((res) => {
            updateRole.push(res.title)
        })
    
        inquirer.prompt ([
            {
                type:"list",
                name: "updateRole",
                message: "Which employee's role do you want to update?",
                choices: updateEmployee,
            },
            {
                type: "list",
                name: "newRole",
                message: "Please select a new role for the employee.",
                choices: updateRole,
            }
        ])
        .then(answers => {
            db.query("SELECT roles.id FROM roles WHERE title = ? ", [answers.newRole], (err, result) => {
                let role_id = result[0].id
                console.log(role_id)
            db.query("SELECT employees.id FROM employees WHERE first_name =?", [answers.updateRole], (err, result) => {
                let employee_id = result[0].id
                console.log(employee_id)
            
            const paramsThree = [role_id, employee_id];
            const sqlUpdateEmployee = `UPDATE employees SET role_id =? WHERE id = ?`;
            console.log(answers.updateRole + answers.newRole);
            db.query(sqlUpdateEmployee, paramsThree, (err, result) => {
                    console.log(result);
    
                    teamArray.push(sqlUpdateEmployee, paramsThree);
                    companyStructure();
            })
        });
    })
    })
   
    });
});
};

companyStructure();