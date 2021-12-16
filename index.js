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
  connection.query("SELECT * FROM departments INNER JOIN employee ON role_id = departments.id INNER JOIN role ON department_id = employee.id", (err, res) => {
    if (err) throw err;
    console.table(res);
    startProgram();
  });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "Which Department will this employee be working in?"
        }

    ]).then(depAnswers => {
        connection.query("INSERT INTO departments SET ?;",
            {
                dep_name: depAnswers.newDepartment
            }
        )
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            }
        ]).then(employeeFirst => {
            connection.query("INSERT INTO employee SET ?;",
                {
                    first_name: employeeFirst.firstName
                }
            )
            inquirer.prompt([
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the employee's last name?"
                }
            ]).then(employeeLast => {
                connection.query("INSERT INTO employee SET ?;",
                    {
                        last_name: employeeLast.lastName
                    }
                )
                inquirer.prompt([
                    {
                        type: "input",
                        name: "roleID",
                        message: "What is the employee's role?"
                    }
                ]).then(employeeRole => {
                    connection.query("INSERT INTO employee SET ?;",
                        {
                            role_id: employeeRole.roleID
                        }
                    )
                    // inquirer.prompt([
                    //     {
                    //         type: "input",
                    //         name: "managerID",
                    //         message: "What is the employee's manager ID?"
                    //     }
                    // ]).then(employeeManager => {
                    //     connection.query("INSERT into employee SET ?;",
                    //         {
                    //             manager_id: employeeManager.managerID
                    //         }
                    //     )
                    // })
                    startProgram();
                })
            })
        })
        
    })
    
}

function updateEmployeeRole() {
  inquirer.prompt([
      {
          type: "list",
          name: "employeeChoice",
          message: "Which employee would you like to select?",
          choices: ["1", "2", "3", "4", "5"],
      },
      {
          type: "input",
          name: "employeeUpdate",
          message: "What is this employee's updated role?"
      }
  ]).then(employeeUpdate => {
      connection.query("INSERT INTO role SET ?;",
        {
            title: employeeUpdate.employeeUpdate
        }
      )
      startProgram();
  })
}

function viewRoles() {
    connection.query("SELECT title, id, department_id, salary FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        startProgram();
      });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What is the name of this role?",
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is this role's salary?"
        },
        {
            type: "input",
            name: "roleDepartment",
            message: "What departments does this role belong to?"
        },
    ]).then(role => {
        connection.query("INSERT INTO role SET ?;",
          {
              role_id: role.newRole,
              salary: role.roleSalary,
              dep_name: role.roleDepartment
            
          }
        )
        startProgram();
    })
}

function viewDepartments() {
    connection.query("SELECT id, dep_name FROM departments", (err, res) => {
        if (err) throw err;
        console.table(res);
        startProgram();
      });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the new department?",
        },
    ]).then(addDepartment => {
        connection.query("INSERT INTO departments SET ?;",
          {
              dep_name: addDepartment.newDepartment
          }
        )
        startProgram();
    })
}



// create the connection
// const connection = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "employeedb",
//   });
//   // query database
//   const data = await connection.execute("select * from employee;");

//   data.map((employee) => ({ name: employee.name, value: employee }));

//   console.log(newChoices);

//   const { choice } = await inquirer.prompt([
//     {
//       name: "choice",
//       type: "list",
//       message: "Which employee role do you want to update?",
//       chocies: newChoices,
//     },
//   ]);


// "INNER JOIN role ON department_id = employee.id"
// "INNER JOIN departments ON department_id = departments.dep_name"