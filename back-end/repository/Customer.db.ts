import { log } from "console";
import { Customer } from "../model/customer";
import { Order } from "../model/order";
import { createCustomerDto } from "../types";
import OrderDb from "./Order.db";
import database from "../util/database";
import { House } from "@prisma/client";

const getAllCustomers = async (): Promise<Array<Customer>> => {
    const customersPrisma = await database.customer.findMany({});
    return customersPrisma.map((customerPrisma) => Customer.from(customerPrisma));
};

const createCustomer = async (customer: Customer): Promise<Customer> => {
    try {
        const customerPrisma = await database.customer.create({
            data: {
                firstName: customer.getFirstName(),
                lastName: customer.getLastName(),
                email: customer.getEmail(),
                role: customer.getRole(),
                birthday: customer.getBirthday(),
                password: customer.getPassword(),
                createdAt: customer.getCreatedAt(),
            },
        });
        return Customer.from(customerPrisma);
    } catch (error) {
        //console.error("Error creating customer:", error);
        throw new Error("Error creating customer: " + error);
    }
};

const getCustomerExists = async (email: string): Promise<Customer | null> => {
    const customer = await database.customer.findUnique({
        where: {
            email: email,
        },
    });

    if (!customer) {
        return null;
    }

    return Customer.from(customer);
};

const getCustomerHouses = async (customerId: number): Promise<Array<House>> => {
    const orders = await OrderDb.getOrderByCustomerId(customerId);
    
    const houses = orders.map((order) => order.getHouse());

    return houses.map((house) => ({
        id: house.getId(),
        houseNumber: house.getHouseNumber(),
        street: house.getStreet(),
        city: house.getCity(),
        zip: house.getZip(),
        country: house.getCity(),
        type: house.getType(),
        createdAt: house.getCreatedAt(),
    }));

};

const getCustomerById = async (id: number): Promise<Customer | null> => {
    const customer = await database.customer.findUnique({
        where: {
            id: id,
        },
    });

    if (!customer) {
        return null;
    }

    return Customer.from(customer);
};

const getCustomerByEmail = async (email: string): Promise<Customer | null> => {
    const customer = await database.customer.findUnique({
        where: {
            email: email,
        },
    });

    if (!customer) {
        return null;
    }

    return Customer.from(customer);
};

export default {
    getAllCustomers,
    createCustomer,
    getCustomerExists,
    getCustomerHouses,
    getCustomerById,
    getCustomerByEmail,
};