import { Employee } from "../../model/employee";
import employeeService from "../../service/employee.service";
import EmployeeDb from "../../repository/Employee.db";
import bcrypt from 'bcrypt';
import { createEmployeeDto } from "../../types";

jest.mock("../../repository/Employee.db");
jest.mock('bcrypt');

const employee = new Employee("John", "Doe", "john.doe@example.com", "password123", "worker", 5, "Engineering", "B", new Date(), 1);
const employeeToAdd = new Employee("Jane", "Doe", "jane.doe@example.com", "password123", "worker", 3, "Marketing", "C", new Date(), 2);

beforeEach(() => {
    jest.clearAllMocks();
});

test("given: valid credentials, when: authenticate, then: return authentication response", async () => {
    const email = "john.doe@example.com";
    const password = "password123";

    (EmployeeDb.getEmployeeExists as jest.Mock).mockResolvedValue(employee);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await employeeService.authenticate(email, password);
    expect(result).toEqual({
        token: expect.any(String),
        email: employee.getEmail(),
        fullname: `${employee.getFirstName()} ${employee.getLastName()}`,
        role: employee.getRole(),
    });
});

test("given: non-existing Employee, when: authenticate, then: throw error", async () => {
    const email = "nonexistent@example.com";
    const password = "password123";

    (EmployeeDb.getEmployeeExists as jest.Mock).mockResolvedValue(null);

    await expect(employeeService.authenticate(email, password)).rejects.toThrow("Employee does not exist.");
});