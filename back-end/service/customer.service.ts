
import { Customer } from "../model/customer";
import CustomerDb from "../repository/Customer.db";
import { authenticateDTO, AuthenticationResponse, createCustomerDto } from "../types";
import bcrypt from 'bcrypt';
import exp from "constants";
import generateJwtToken from "../util/jwt";
import { House } from "@prisma/client";
import EmployeeDb from "../repository/Employee.db";
import employeeService from "./employee.service";


const getAllCustomers = async () : Promise<Array<Customer>> => {
    return await CustomerDb.getAllCustomers();
}

const createCustomer = async (createCustomerDto: createCustomerDto) : Promise<Customer> => {
    const exists = await CustomerDb.getCustomerExists(createCustomerDto.email);

    if (exists) {
        throw new Error(`Customer with email ${createCustomerDto.email} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 12);

    const customer = new Customer(
        createCustomerDto.firstName,
        createCustomerDto.lastName,
        createCustomerDto.email,
        createCustomerDto.birthday,
        hashedPassword,
        new Date()  
    );

    return await CustomerDb.createCustomer(customer);
}

const authenticate = async (credentials: authenticateDTO): Promise<AuthenticationResponse> => {
    
    const {email, password} = credentials;
    
    try {
        // Check if the user is an employee first
        const isEmployee = await employeeService.getEmployeeExists(email);
        if (isEmployee) {
            // Delegate employee authentication to employee service
            return await employeeService.authenticate(email, password);
        }

        // If not an employee, proceed with customer authentication
        const customer = await CustomerDb.getCustomerExists(email);

        if (!customer) {
            throw new Error("Customer does not exist.");
        }

        const isValidPassword = await bcrypt.compare(password, customer.getPassword());
        if (!isValidPassword) {
            throw new Error("Invalid password.");
        }

        return {
            token: generateJwtToken({ email: customer.getEmail(), role: customer.getRole() }),
            email: customer.getEmail(),
            fullname: `${customer.getFirstName()} ${customer.getLastName()}`,
            role: customer.getRole(),
        };
    } catch (error) {
        // Rethrow error to ensure the function explicitly fails
        if (error instanceof Error) {
            throw new Error("Error authenticating user: " + error.message);
        }
        // If we somehow get here (non-Error throw), throw a generic error
        throw new Error("Unknown error occurred during authentication.");
    }
};



const getCustomerHouses = async (customerId: number) : Promise<Array<House>> => {
    return await CustomerDb.getCustomerHouses(customerId);
};

export default {
    getAllCustomers, 
    createCustomer,
    authenticate,
    getCustomerHouses
}