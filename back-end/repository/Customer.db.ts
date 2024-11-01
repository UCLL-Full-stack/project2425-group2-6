import { Customer } from "../model/customer";

let currentId = 1;

const customers: Array<Customer> = [
    new Customer(currentId++, "John", "Doe", "john.doe@example.com", "1"),
    new Customer(currentId++, "Jane", "Smith", "jane.smith@example.com", "1"),
    new Customer(currentId++, "Alice", "Johnson", "alice.johnson@example.com", "1")
];

const addCustomer = (firstName: string, lastName: string, email: string, password : string): Customer => {
    const newCustomer = new Customer(currentId++, firstName, lastName, email, password);
    customers.push(newCustomer);
    return newCustomer;
}

const getAllCustomers = () : Array<Customer> => {
    return customers;
}

const getCustomerById = (id : number) : Customer | [] => {
    return customers.find(customer => customer.getId() === id) ??  [];
}

export default {
    getAllCustomers, getCustomerById, customers, addCustomer,
}