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
VALUE ("Brian", "Clark", 1, 3),
("Jane", "Jackson", 2, 1),
("Kate", "Miller", 3, null),
("Alex", "Martin", 4, 3),
("Sheri", "Barton", 5, null),
("Gary", "Lewis", 2, null),
("Tom", "Tucker", 4, 7),
("Kristin", "Garret", 1, 2);
