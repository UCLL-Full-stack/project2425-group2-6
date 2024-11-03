import { log } from "console";
import { Customer } from "../model/customer";
import { Order } from "../model/order";
import CustomerDb from "../repository/Customer.db";
import OrderDb from "../repository/Order.db";
import { CreateCustomerDto, LoginCustomerDto } from "../types";

const getAllCustomers = async () : Promise<Array<Customer>> => {
    return await CustomerDb.getAllCustomers();
}

const getCustomerById = async (id : number) : Promise<Customer | []> => {
    if (isNaN(id)){
        throw new Error("invalid format for id");
    }
    return await CustomerDb.getCustomerById(id);
}

const getCustomerOrderById = async (id: number): Promise<Array<Order>> => {
    const data = await OrderDb.getAllOrders();
    const filtered = data.filter(order => order.getCustomer().getId() === id);
    log("getCustomerOrderById")
    log(filtered);
    return filtered || []; // Use || instead of | to ensure it defaults to an array
};


const createCustomer = async (customerData: CreateCustomerDto): Promise<Customer> => {
    return CustomerDb.addCustomer(customerData.firstName, customerData.lastName, customerData.email, customerData.password);
};

const attemptSignin = async (attemptedCustomer : LoginCustomerDto): Promise<Customer | Error> => {
    const response = await getAllCustomers();
    for (const customer of response) {
        if (customer.getEmail() === attemptedCustomer.email && customer.getPassword() === attemptedCustomer.password) {
            return customer;
        }
    }
    return new Error("Invalid email or password");
}

const getCustomerIndexById = async (id: number): Promise<number> => {
    const customers = await getAllCustomers();
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].getId() === id) {
            return i;
        }
    }
    return -1;
};


export default {
    getAllCustomers, getCustomerById, getCustomerOrderById, createCustomer, attemptSignin, getCustomerIndexById
}