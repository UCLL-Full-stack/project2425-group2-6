import { log } from "console";
import { Customer } from "../model/customer";
import { House } from "../model/house";
import { Order } from "../model/order";
import HouseDb from "./House.db";
import CustomerDb from "./Customer.db";
import { Room } from "../model/room";
import RoomDb from "./Room.db";
import database from "../util/database";

let currentId : number = 1;

const orders : Array<Order> = [
    // new Order(currentId++, CustomerDb.getAllCustomers()[0], new Date("2021-01-01"), new Date("2025-02-01"), 1000, HouseDb.getAllHouses()[0]),
    // new Order(currentId++, CustomerDb.getAllCustomers()[1], new Date("2021-02-01"), new Date("2025-03-01"), 2000, HouseDb.getAllHouses()[1]),
    // new Order(currentId++, CustomerDb.getAllCustomers()[2], new Date("2021-03-01"), new Date("2025-04-01"), 3000, HouseDb.getAllHouses()[2]),
    // new Order(currentId++, CustomerDb.getAllCustomers()[0], new Date("2021-04-01"), new Date("2025-05-01"), 4000, HouseDb.getAllHouses()[3]),
];

//orders.forEach(order => {log(`${order.toString()}\n\n`)});

const getAllOrders = async (): Promise<Array<Order>> => {
    const ordersPrisma = await database.order.findMany({
        include: {
            customer: true,
            house: true
        }
    });
    return ordersPrisma.map((orderPrisma) => Order.from(orderPrisma));
}

const getOrderByCustomerEmail = async (email: string): Promise<Array<Order>> => {
    console.log("Fetching customer by email:", email);
    const customer = await CustomerDb.getCustomerByEmail(email);
    console.log("Customer fetched:", customer);

    if (!customer) {
        throw new Error("Customer not found");
    }

    console.log("Fetching orders for customer ID:", customer.getId());
    const ordersPrisma = await database.order.findMany({
        where: {
            customerId: customer.getId()
        },
        include: {
            customer: true,
            house: true,
        }
    });
    console.log("Orders fetched from database:", ordersPrisma);

    const orders = ordersPrisma.map((orderPrisma) => Order.from(orderPrisma));
    console.log("Orders mapped to Order class instances:", orders);

    return orders;
};

const getOrderByCustomerId = async (customerId: number): Promise<Array<Order>> => {
    const ordersPrisma = await database.order.findMany({
        where: {
            customerId: customerId
        },
        include: {
            customer: true,
            house: true
        }
    });
    return ordersPrisma.map((orderPrisma) => Order.from(orderPrisma));
};
const getOrderById = (id : number) : Order | [] => {
    return orders.find(order => order.getId() === id) || [];
}

const createOrder = async (customerId: number, houseId: number, startDate: Date, budget: number): Promise<Order> => {
    console.log("Starting createOrder function");
    console.log("Fetching customer with ID:", customerId);
    const customer = await CustomerDb.getCustomerById(customerId);
    console.log("Customer fetched:", customer);

    console.log("Fetching house with ID:", houseId);
    const house = await HouseDb.getHouseById(houseId);
    console.log("House fetched:", house);

    if (!customer) {
        throw new Error("Customer not found");
    }

    if (!house) {
        throw new Error("House not found");
    }

    console.log("Creating order with data:", {
        customerId,
        houseId,
        startDate,
        budget,
        status: "pending"
    });

    const orderPrisma = await database.order.create({
        data: {
            customer: {
                connect: { id: customerId }
            },
            house: {
                connect: { id: houseId }
            },
            employee: {
                connect: { id: 2 } // Assuming employee ID 2 is valid
            },
            startDate: startDate,
            price: budget,
            status: "pending" // Default status
        },
        include: {
            customer: true,
            house: true
        },
    });

    console.log("Order created in database:", orderPrisma);

    const order = Order.from(orderPrisma);
    console.log("Order mapped to Order class instance:", order);

    return order;
};

export default {
    orders,
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByCustomerId,
    getOrderByCustomerEmail
}   