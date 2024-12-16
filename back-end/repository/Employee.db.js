"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let currentId = 1;
const employees = [
// new Employee(currentId++, "John", "Doe", "john.doe@example.com", "securePassword1", 5, "Engineering", "Class A"),
// new Employee(currentId++, "Jane", "Smith", "jane.smith@example.com", "securePassword2", 3, "Marketing", "Class B"),
// new Employee(currentId++, "Alice", "Johnson", "alice.johnson@example.com", "securePassword3", 7, "Finance", "Class C")
];
employees.forEach(employee => { console.log(`${employee.toString()}\n\n`); });
const getAllEmployees = () => {
    return employees;
};
const getEmployeeById = (id) => {
    var _a;
    return (_a = employees.find(employee => employee.getId() === id)) !== null && _a !== void 0 ? _a : null;
};
exports.default = {
    getAllEmployees,
    getEmployeeById,
};
