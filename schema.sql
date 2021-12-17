DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dep_name VARCHAR(40) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(40) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id int NOT NULL primary key auto_increment,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    role_id INT NOT NULL,
    manager_id INT NOT NULL
);

-- CREATE TABLE manager (
--     id int NOT NULL primary key auto_increment,
--     employee_id INT NOT NULL,

-- )