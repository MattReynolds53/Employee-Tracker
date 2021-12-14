const { rosybrown } = require('color-name');
const inquirer = require('inquirer');
const mysql = require('mysql2/promises');

startProgram();

async function startProgram() {
    const {choice} = await inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
    }])
    console.log(choice);
}

async function showDepartments() {

    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employeedb'});
    // query database
    const data = await connection.execute("select * from employee;");
    
    console.table(data);
}

async function updateRole() {
    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'employeedb'});
    // query database
    const data = await connection.execute("select * from employee;");

    data.map(employee => ({name:employee.name, value:employee}))

    console.log(newChoices)

    const {choice} = await inquirer.prompt ([{
        name: "choice",
        type: "list",
        message: "Which employee role do you want to update?",
        chocies: newChoices,
    }])

    
}