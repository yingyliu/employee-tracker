INSERT INTO department(dept_name)
VALUES  ("R&D"), --1
        ("Manufacturing"), --2
        ("Marketing"), --3
        ("HR"), --4 
        ("Finance"); --5

INSERT INTO role(title, salary, department_id)
VALUES  ("Jr. Software Engineer", 100000, 1), --role_id 1
        ("Sr. Software Engineer", 200000, 1), --role_id 2
        ("Manufacturing Engineer", 100000, 2), --role_id 3
        ("Sales Representive", 50000, 3), --role_id 4
        ("Sales Manager", 80000, 3), --role_id 5
        ("HR Manager", 50000, 4), --role_id 6
        ("Accountant", 60000, 5); --role_id 7

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Sean", "Connery", 1, 2), --jr. soft eng. (R&D)
        ("Peter", "Chen", 2, null), --sr. soft eng. (R&D)
        ("Jim", "Carrey", 3, null), --manufacturing
        ("Taylor", "Swift", 4, 5), --sales rep. (Marketing)
        ("Mariah", "Carey", 5, null), --sales manager (Marketing)
        ("Tom", "Hank", 6, 6), --hr
        ("Robert", "Downey", 7, 7); --finance
