INSERT INTO departments(name)
VALUES  ("R&D"),
        ("Manufacturing"),
        ("Marketing"),
        ("HR"),
        ("Finance");

INSERT INTO roles(title, salary, dept_id)
VALUES  ("Jr. Software Engineer", 100000, 1),
        ("Sr. Software Engineer", 200000, 1),
        ("Manufacturing Engineer", 100000, 2),
        ("Sales Representive", 50000, 3),
        ("Sales Manager", 80000, 3),
        ("HR Manager", 50000, 4),
        ("Accountant", 60000, 5);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES  ("Peter", "Chen", 1, null),
        ("Sean", "Connery", 2, 1),
        ("Jim", "Carrey", 3, null),
        ("Taylor", "Swift", 4, null),
        ("Mariah", "Carey", 5, 4),
        ("Tom", "Hank", 6, null),
        ("Robert", "Downey", 7, 6);
