import { log } from "console";
import { Customer } from "../model/customer";
import { Order } from "../model/order";
import { createCustomerDto } from "../types";
import OrderDb from "./Order.db";

let currentId = 1;

const customers: Array<Customer> = [
    new Customer(currentId++, "John", "Doe", "john.doe@example.com", new Date("1990-01-01"), "securePassword1"),
    new Customer(currentId++, "Jane", "Smith", "jane.smith@example.com", new Date("1985-05-15"), "securePassword2"),
    new Customer(currentId++, "Alice", "Johnson", "alice.johnson@example.com", new Date("1992-09-10"), "securePassword3"),
    new Customer(currentId++, "Bob", "Brown", "bobbrown@example.com", new Date("1980-12-25"), "securePassword4"),
];

customers.forEach(customer => {log(`${customer.toString()}\n\n`)});

const getAllCustomers = (): Array<Customer> => {
    return customers;
};

const getCustomerById = (id: number): Customer | Error => {
    return customers.find(customer => customer.getId() === id) ?? new Error("Customer not found.");
};

const getCustomerIndexById = (id: number): number => {
    return customers.findIndex(customer => customer.getId() === id);
};

const addCustomer = (customer: createCustomerDto) => {
    const newCustomer = new Customer(currentId++, customer.firstName, customer.lastName, customer.email, customer.birthDate, customer.password);
    customers.push(newCustomer);
    return newCustomer;
};

export default {
    getAllCustomers,
    getCustomerById,
    addCustomer,
    getCustomerIndexById,
};
