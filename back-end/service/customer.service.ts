
import { Customer } from "../model/customer";
import CustomerDb from "../repository/Customer.db";
import { AuthenticationResponse, createCustomerDto } from "../types";
import bcrypt from 'bcrypt';
import exp from "constants";
import generateJwtToken from "../util/jwt";
import { House } from "@prisma/client";


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

const authenticate = async (email: string, password: string): Promise<AuthenticationResponse> => {
    try {
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
            role: customer.getRole()
        };
    } catch (error) {
        throw new Error("Error authenticating customer: " + error);
    }
}

const getCustomerHouses = async (customerId: number) : Promise<Array<House>> => {
    return await CustomerDb.getCustomerHouses(customerId);
};

export default {
    getAllCustomers, 
    createCustomer,
    authenticate,
    getCustomerHouses
}