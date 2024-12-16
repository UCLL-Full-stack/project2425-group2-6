import { Employee } from "../model/employee";

let currentId = 1;

const employees: Array<Employee> = [
    // new Employee(currentId++, "John", "Doe", "john.doe@example.com", "securePassword1", 5, "Engineering", "Class A"),
    // new Employee(currentId++, "Jane", "Smith", "jane.smith@example.com", "securePassword2", 3, "Marketing", "Class B"),
    // new Employee(currentId++, "Alice", "Johnson", "alice.johnson@example.com", "securePassword3", 7, "Finance", "Class C")
];

employees.forEach(employee => {console.log(`${employee.toString()}\n\n`)});

const getAllEmployees = (): Array<Employee> => {
    return employees;
}

const getEmployeeById = (id: number): Employee | null => {
    return employees.find(employee => employee.getId() === id) ?? null;
}

export default {
    getAllEmployees,
    getEmployeeById,
};
