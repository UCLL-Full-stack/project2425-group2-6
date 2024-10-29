import { Employee } from "../model/employee";

let currentId = 1;

const employees: Array<Employee> = [
    new Employee(currentId++, "John", "Doe", "john.doe@example.com", 5, "Engineering", "Class A"),
    new Employee(currentId++, "Jane", "Smith", "jane.smith@example.com", 3, "Marketing", "Class B"),
    new Employee(currentId++, "Alice", "Johnson", "alice.johnson@example.com", 7, "Finance", "Class C")
];

const getAllEmployees = () => {
    return employees;
}

const getEmployeeById = (id: number): Employee | [] => {
    return employees.find(employee => employee.getId() === id) ?? [];
}

export default {
    getAllEmployees,
    getEmployeeById,
}