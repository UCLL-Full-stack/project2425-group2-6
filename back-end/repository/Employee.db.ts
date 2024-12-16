import { Employee } from "../model/employee";
import { createEmployeeDto } from "../types";
import database from "../util/database";

const getAllEmployees = async (): Promise<Array<Employee>> => {
    const employees = await database.employee.findMany();

    return employees.map((employee) => Employee.from(employee));
};

const createEmployee = async (employee: Employee): Promise<Employee> => {
    const newEmployee = await database.employee.create({
        data: {
            firstName: employee.getFirstName(),
            lastName: employee.getLastName(),
            email: employee.getEmail(),
            password: employee.getPassword(),
            role: employee.getRole(),
            experience: employee.getExperience(),
            domain: employee.getDomain(),
            licenseType: employee.getLicenseType(),
            workPosition: employee.getWorkPosition(),
            createdOn: employee.getCreatedOn(),
            birthday: employee.getBirthday(),
        },
    });

    return Employee.from(newEmployee);
};

const getEmployeeExists = async (email: string): Promise<Employee | null> => {
    const employee = await database.employee.findUnique({
        where: {
            email: email,
        },
    });

    if (!employee) {
        return null;
    }

    return Employee.from(employee);
};

export default {
    getAllEmployees,
    getEmployeeExists,
    createEmployee,
};
