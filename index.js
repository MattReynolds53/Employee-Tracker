const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employeedb",
  port: 3306,
});

connection.connect(function (err) {
  if (err) throw err;
  startProgram();
});

function startProgram() {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then((answer) => {
      if (answer.choice === "View All Employees") {
        viewEmployees();
      } else if (answer.choice === "Add Employee") {
        addEmployee();
      } else if (answer.choice === "Update Employee Role") {
        updateEmployeeRole();
      } else if (answer.choice === "View All Roles") {
        viewRoles();
      } else if (answer.choice === "Add Role") {
        addRole();
      } else if (answer.choice === "View All Departments") {
        viewDepartments();
      } else {
        addDepartment();
      }
    });
}

function viewEmployees() {
  connection.query(
    // `SELECT first_name, last_name, title, dep_name, salary, manager_id FROM employee
    // left join role on role.id = employee.role_id
    // left join departments on departments.id = role.department_id;`
    "SELECT * FROM departments INNER JOIN employee ON role_id = departments.id INNER JOIN role ON department_id = employee.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startProgram();
    }
  );
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleID",
        message:
          "What is the employee's role ID (this must be the same as the department ID)?",
      },
      {
        type: "input",
        name: "managerID",
        message: "What is the employee's manager ID?",
      },
    ])
    .then((employeeInfo) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
        [
          employeeInfo.firstName,
          employeeInfo.lastName,
          employeeInfo.roleID,
          employeeInfo.managerID,
        ]
      );
      addDepartment();
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeUpdateID",
        message: "What is this employee's role ID",
      },
      {
        type: "input",
        name: "employeeUpdate",
        message: "What is this employee's updated role title?",
      },
    ])
    .then((employeeUpdate) => {
      connection.query(
        "UPDATE role SET ? WHERE ?;",
        {
          title: employeeUpdate.employeeUpdate,
        },
        {
          department_id: employeeUpdate.employeeUpdateID,
        }
      );
      startProgram();
    });
}

function viewRoles() {
  connection.query(
    "SELECT title, id, department_id, salary FROM role",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startProgram();
    }
  );
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "What is the name of this role?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is this role's salary?",
      },
      {
        type: "input",
        name: "departmentID",
        message:
          "What is the department ID (this must be the same as the role ID)?",
      },
    ])
    .then((role) => {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
        [role.newRole, role.roleSalary, role.departmentID]
      );
      startProgram();
    });
}

function viewDepartments() {
  connection.query("SELECT id, dep_name FROM departments", (err, res) => {
    if (err) throw err;
    console.table(res);
    startProgram();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the new department?",
      },
    ])
    .then((addDepartment) => {
      connection.query("INSERT INTO departments(dep_name) VALUES (?);", [
        addDepartment.newDepartment,
      ]);
      addRole();
    });
}
