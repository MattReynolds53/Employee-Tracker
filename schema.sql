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
    salaray INT NOT NULL,
    department_id INT
);

CREATE TABLE employee (
    id int NOT NULL primary key auto_increment,
    first_name varchar(40),
    last_name varchar(40),
    role_id int
);