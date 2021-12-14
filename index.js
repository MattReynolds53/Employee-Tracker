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
      }
    });
}

async function viewEmployees() {
  connection.query("SELECT * FROM departments INNER JOIN employee ON role_id = departments.id INNER JOIN role ON department_id = employee.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    startProgram();
  });
}

async function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "Which Department will this employee be working in?"
        }

    ]).then(depAnswers => {
        connection.query("INSERT into departments SET ?;",
            {
                dep_name : depAnswers.newDepartment
            }
        )
        inquirer.prompt([
            {
                type:"input",
            }
        ])
    })
}

async function updateRole() {
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employeedb",
  });
  // query database
  const data = await connection.execute("select * from employee;");

  data.map((employee) => ({ name: employee.name, value: employee }));

  console.log(newChoices);

  const { choice } = await inquirer.prompt([
    {
      name: "choice",
      type: "list",
      message: "Which employee role do you want to update?",
      chocies: newChoices,
    },
  ]);
}

async function viewRoles() {
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employeedb",
  });
  // query database
  const data = await connection.execute("select * from employee;");

  data.map((employee) => ({ name: employee.name, value: employee }));

  console.table(data);

  console.log(newChoices);

  const { choice } = await inquirer.prompt([
    {
      name: "choice",
      type: "list",
      message: "Which employee role do you want to update?",
      chocies: newChoices,
    },
  ]);
}

async function addRole() {
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employeedb",
  });
  // query database
  const data = await connection.execute("select * from employee;");

  data.map((employee) => ({ name: employee.name, value: employee }));

  console.log(newChoices);

  const { choice } = await inquirer.prompt([
    {
      name: "choice",
      type: "list",
      message: "Which employee role do you want to update?",
      chocies: newChoices,
    },
  ]);
}

async function viewDepartments() {
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employeedb",
  });
  // query database
  const data = await connection.execute("select * from employee;");

  data.map((employee) => ({ name: employee.name, value: employee }));

  // Added view table function for view [blank] choices
  console.table(data);

  console.log(newChoices);

  const { choice } = await inquirer.prompt([
    {
      name: "choice",
      type: "list",
      message: "Which employee role do you want to update?",
      chocies: newChoices,
    },
  ]);
}

async function addDepartment() {
  // create the connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employeedb",
  });
  // query database
  const data = await connection.execute("select * from employee;");

  data.map((employee) => ({ name: employee.name, value: employee }));

  console.log(newChoices);

  const { choice } = await inquirer.prompt([
    {
      name: "choice",
      type: "list",
      message: "Which employee role do you want to update?",
      chocies: newChoices,
    },
  ]);
}
