import { log } from "console";
import { Customer } from "../model/customer";
import { Order } from "../model/order";
import CustomerDb from "../repository/Customer.db";
import { createCustomerDto } from "../types";
import OrderDb from "../repository/Order.db";

const getAllCustomers = async () : Promise<Array<Customer>> => {
    return await CustomerDb.getAllCustomers();
}

const getCustomerById = async (id: number): Promise<Customer | Error> => {
    return await CustomerDb.getCustomerById(id);
}

const addCustomer = async (customer: createCustomerDto): Promise<Customer> => {
    return await CustomerDb.addCustomer(customer);
}

// const attemptSignin = async (attemptedCustomer : LoginCustomerDto): Promise<Customer | Error> => {
//     const response = await getAllCustomers();
//     for (const customer of response) {
//         if (customer.getEmail() === attemptedCustomer.email && customer.getPassword() === attemptedCustomer.password) {
//             return customer;
//         }
//     }
//     return new Error("Invalid email or password");
// }

const getCustomerIndexById = async (id: number): Promise<number> => {
    const customers = await getAllCustomers();
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].getId() === id) {
            return i;
        }
    }
    return -1;
};

const getCustomerOrderById = async (id: number): Promise<Array<Order> | []> => {
    return await OrderDb.getOrderByCustomerId(id);
};


export default {
    getAllCustomers, 
    getCustomerIndexById, 
    getCustomerById, 
    addCustomer,
    getCustomerOrderById
}