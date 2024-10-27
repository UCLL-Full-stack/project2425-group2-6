import { Customer } from "../model/customer";

let currentId = 0;

const customers: Array<Customer> = [
    new Customer(currentId++, "John", "Doe", "john.doe@example.com"),
    new Customer(currentId++, "Jane", "Smith", "jane.smith@example.com"),
    new Customer(currentId++, "Alice", "Johnson", "alice.johnson@example.com")
];

const getAllCustomers = () : Array<Customer> => {
    return customers;
}

const getCustomerById = (id : number) : Customer | undefined => {
    return customers.find(customer => customer.getId() === id);
}

export default {
    getAllCustomers, getCustomerById,
}