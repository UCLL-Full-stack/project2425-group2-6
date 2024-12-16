import { Employee } from "../model/employee";
import EmployeeDb from "../repository/Employee.db"
import { AuthenticationResponse, createEmployeeDto } from "../types";
import generateJwtToken from "../util/jwt";
import bcrypt from 'bcrypt';

const getAllEmployees = async () : Promise<Array<Employee>> => {
    return await EmployeeDb.getAllEmployees();
}

const createEmployee = async (createCustomerDto: createEmployeeDto) : Promise<Employee> => {
    const exists = await EmployeeDb.getEmployeeExists(createCustomerDto.email);

    if (exists) {
        throw new Error(`Employee with email ${createCustomerDto.email} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 12);
    
    const employee = new Employee(
        createCustomerDto.firstName,
        createCustomerDto.lastName,
        createCustomerDto.email,
        hashedPassword,
        createCustomerDto.role,
        createCustomerDto.experience,
        createCustomerDto.domain,
        createCustomerDto.licenseType,
        new Date() // createdOn
        // id is optional and not provided here
    );
    
    return await EmployeeDb.createEmployee(employee);
}

const authenticate = async (email: string, password: string): Promise<AuthenticationResponse> => {
    try {
        const employee = await EmployeeDb.getEmployeeExists(email);

        if (!employee) {
            throw new Error("Employee does not exist.");
        }

        const isValidPassword = await bcrypt.compare(password, employee.getPassword());

        console.log(`comparing password ${password} with ${employee.getPassword()}`);
        console.log(`isValidPassword: ${isValidPassword}`);
        if (!isValidPassword) {
            throw new Error("Invalid password.");
        }

        return {
            token: generateJwtToken({ email: employee.getEmail(), role: employee.getRole() }),
            email: employee.getEmail(),
            fullname: `${employee.getFirstName()} ${employee.getLastName()}`,
            role: employee.getRole()
        };
    } catch (error) {
        throw new Error("Error authenticating employee: " + error);
    }
}

const getEmployeeExists = async (email: string): Promise<Employee | null> => {
    return await EmployeeDb.getEmployeeExists(email);
};

export default {
    getEmployeeExists,
    authenticate,
    createEmployee,
    getAllEmployees,
}