import { Employee } from "../../model/employee";
import employeeService from "../../service/employee.service";

const employee = new Employee(1, "John", "Doe", "john.doe@example.com", "password123", 5, "Engineering", "B");
const employeeToAdd = new Employee(2, "Jane", "Doe", "jane.doe@example.com", "password123", 3, "Marketing", "C");

let mockEmployeeGetAllEmployees: jest.Mock;

beforeEach(() => {
    mockEmployeeGetAllEmployees = jest.fn().mockReturnValue([employee]);

    employeeService.getAllEmployees = mockEmployeeGetAllEmployees;
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given: valid Employee, when: getAllEmployees, then: return all employees", async () => {
    const result = await employeeService.getAllEmployees();

    expect(result).toEqual([employee]);
    expect(mockEmployeeGetAllEmployees).toHaveBeenCalledTimes(1);
});