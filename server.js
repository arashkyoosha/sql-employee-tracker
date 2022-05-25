const mysql = require("mysql2");
const inquirer = require("inquirer");
const constable = require("console.table");

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mainDB",
});

dbConnection.connect(function (err) {
  if (err) throw err;

  mainMenu();
});

const mainMenu = () => {
    inquirer
        .prompt({
            type: "list",
            name: "option",
            message: "Please select an option below:",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Exit",
            ],
        })
        .then( ({ option }) => {
            switch (option) {
                case "View All Employees":
                    viewEmployee();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "View All Roles":
                    viewRole();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "View All Departments":
                    viewDepartmet();
                    break;

                case "Exit":
                    dbConnection.end();
                    break;
            }
        });
}

const viewEmployee = () => {
    var query = `SELECT * FROM employee`;

    dbConnection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);

        mainMenu();
    });
}

const viewDepartmet = () => {
    var query = `SELECT * FROM department`;

    dbConnection.query(query, function (err, res) {
      if (err) throw err;

      console.table(res);

      mainMenu();
    });
}

const viewRole = () => {
    var query = `SELECT * FROM role`;

    dbConnection.query(query, function (err, res) {
      if (err) throw err;

      console.table(res);

      mainMenu();
    });
}

const addEmployee = () => {
    var query = `SELECT r.id, r.title, r.salary
      FROM role r`;

    dbConnection.query(query, function (err, res) {
      if (err) throw err;

      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id,
        title: `${title}`,
        salary: `${salary}`,
      }));

      console.table(res);

      promptInsert(roleChoices);
    });
}

const promptInsert = (roleChoices) => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleChoices,
            },
        ])
        .then( (answer) => {
            console.log(answer);

            var query = `INSERT INTO employee SET ?`;

            dbConnection.query(
              query,
              {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.roleId,
                manager_id: answer.managerId,
              },
              function (err, res) {
                if (err) throw err;

                console.table(res);

                mainMenu();
              }
            );
        });
}

const updateEmployeeRole = () => {
    employeeArray();
}

const employeeArray = () => {
    var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`;

    dbConnection.query(query, function (err, res) {
      if (err) throw err;

      const employeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${first_name} ${last_name}`,
      }));

      console.table(res);

      roleArray(employeeChoices);
    });
}

const roleArray = (employeeChoices) => {
    var query = `SELECT r.id, r.title, r.salary
  FROM role r`;
    let roleChoices;

    dbConnection.query(query, function (err, res) {
      if (err) throw err;

      roleChoices = res.map(({ id, title, salary }) => ({
        value: id,
        title: `${title}`,
        salary: `${salary}`,
      }));

      console.table(res);

      promptEmployeeRole(employeeChoices, roleChoices);
    });
}

const promptEmployeeRole = (employeeChoices, roleChoices) => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Which employee do you want to set with the role?",
                choices: employeeChoices,
            },
            {
                type: "list",
                name: "roleId",
                message: "Which role do you want to update?",
                choices: roleChoices,
            },
        ])
        .then( (answer) => {
            var query = `UPDATE employee SET role_id = ? WHERE id = ?`;

            dbConnection.query(
              query,
              [answer.roleId, answer.employeeId],
              function (err, res) {
                if (err) throw err;

                console.table(res);

                mainMenu();
              }
            );
        });
}

const addRole = () => {
    var query = `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`;

    dbConnection.query(query, function (err, res) {
      if (err) throw err;

      const departmentChoices = res.map(({ id, name }) => ({
        value: id,
        name: `${id} ${name}`,
      }));

      console.table(res);
      console.log("Department array!");

      promptAddRole(departmentChoices);
    });
}

const promptAddRole = (departmentChoices) => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "Role title?",
            },
            {
                type: "input",
                name: "roleSalary",
                message: "Role Salary",
            },
            {
                type: "list",
                name: "departmentId",
                message: "Department?",
                choices: departmentChoices,
            },
        ])
        .then( (answer) => {
            var query = `INSERT INTO role SET ?`;

            dbConnection.query(
              query,
              {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentId,
              },
              function (err, res) {
                if (err) throw err;

                console.table(res);

                mainMenu();
              }
            );
        });
}
