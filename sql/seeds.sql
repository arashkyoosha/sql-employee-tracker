USE mainDB;

INSERT INTO department (name)
VALUE ("Sales"),
("Development"),
("IT"),
("CustomerSuccess");

INSERT INTO role (title, salary, department_id)
VALUE ("BDR", 65000, 101),
("Software Engineer", 90000, 201),
("Senior Software Engineer", 115000, 201),
("IT Manager", 105000, 301),
("Cusomer Success Specialist", 60000, 401);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brian", "Clark", 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Jackson", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kate", "Miller", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Martin", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sheri", "Barton", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Lewis", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Tucker", 4, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kristin", "Garret", 1, 2);
