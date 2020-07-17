var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    startMenu();
});

function startMenu() {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Role", "EXIT"]
    }]).then(({ action }) => {
        if (action === "Add Department") {
            addDepartment();
        } else if (action === "Add Role") {
            addRole();
        } else if (action === "Add Employee") {
            addEmployee();
        } else if (action === "View Departments") {
            viewDepartments();
        } else if (action === "View Roles") {
            viewRoles();
        } else if (action === "View Employees") {
            viewEmployees();
        } else if (action === "Update Employee Role") {
            updateEmployeeRole();
        } else { connection.end() };
    })
};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "enter department name",
        },
    ]).then((ans) => {
        connection.query("INSERT INTO department SET ?", { name: ans.department }, function (err) {
            if (err) throw err
            startMenu()
        })
    })
};

function addRole() {
    return connection.query("SELECT * FROM department", (err, results) => {
        if (err) {
            throw err;
        }
        const departmentNames = results.map(row => {
            return {
                name: row.department_name,
                value: row.id
            };
        });
        return inquirer
            .prompt([
                {
                    type: "input",
                    name: "roleTitle",
                    message: "enter role title",
                },
                {
                    type: "number",
                    name: "salary",
                    message: "enter salary for this role",
                },
                {
                    type: "list",
                    name: "departmentID",
                    message: "which department does this role belong to?",
                    choices: departmentNames
                }
            ]).then(answer => {
                return connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: answer.roleTitle,
                        salary: answer.salary,
                        department_id: answer.departmentID
                    },
                    err => {
                        if (err) {
                            throw err;
                        }
                        console.log("Role added sucessfully.");
                        return startMenu();
                    }
                )
            })
    })
};

function addEmployee() {
    return connection.query("SELECT * FROM role", (err, results) => {
        if (err) {
            throw err;
        }
        const rolesID = results.map(row => {
            return {
                name: row.role_title,
                value: row.id
            };
        });
        return inquirer
        .prompt([
            {
                type: "input",
                name: "employeeFirst",
                message: "What is the employee's first name?",
            },
            {
                type: "list",
                name: "employeeLast",
                message: "What is the amployee's last name?",
            },
            {
                type: "list",
                name: "roleID",
                message: "what is the employee's role?",
                choices: rolesID
            }
        ]).then(answer => {
            return connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.employeeFirst,
                    last_name: answer.employeeLast,
                    role_id: answer.rolesID
                },
                err => {
                    if (err) {
                        throw err;
                    }
                    console.log("Employee added sucessfully.");
                    return startMenu();
                }
            )
        })
    })
};

function viewDepartments() {

};

function viewRoles() {

};

function viewEmployees() {

};

function updateEmployeeRole() {

};