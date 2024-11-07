import { log } from "console";
import { Customer } from "../model/customer";
import { House } from "../model/house";
import { Order } from "../model/order";
import { createOrderDto } from "../types";
import HouseDb from "./House.db";
import CustomerDb from "./Customer.db";
import { Room } from "../model/room";
import RoomDb from "./Room.db";

let currentId : number = 1;

const orders : Array<Order> = [
    new Order(currentId++, CustomerDb.getAllCustomers()[0], new Date("2021-01-01"), new Date("2025-02-01"), 1000, HouseDb.getAllHouses()[0]),
    new Order(currentId++, CustomerDb.getAllCustomers()[1], new Date("2021-02-01"), new Date("2025-03-01"), 2000, HouseDb.getAllHouses()[1]),
    new Order(currentId++, CustomerDb.getAllCustomers()[2], new Date("2021-03-01"), new Date("2025-04-01"), 3000, HouseDb.getAllHouses()[2]),
    new Order(currentId++, CustomerDb.getAllCustomers()[0], new Date("2021-04-01"), new Date("2025-05-01"), 4000, HouseDb.getAllHouses()[3]),
];

orders.forEach(order => {log(`${order.toString()}\n\n`)});

const getAllOrders = () => {
    return orders;
}

const getOrderByCustomerId = (id : number) : Array<Order> | [] => {
    return orders.filter(order => order.getCustomer().getId() === id);
}

const getOrderById = (id : number) : Order | [] => {
    return orders.find(order => order.getId() === id) || [];
}

const addOrder = (order : createOrderDto) : Order => {
    const customer : Customer | Error = CustomerDb.getCustomerById(order.customerId);

    if (customer instanceof Error) {
        throw customer;
    }

    const house : House |Error = HouseDb.getHouseById(order.houseId);

    if (house instanceof Error) {
        throw house;
    }

    const newOrder : Order = new Order(currentId++, customer, order.orderDate, order.startDate, order.price, house);
    orders.push(newOrder);
    return newOrder;

}

export default {
    orders,
    addOrder,
    getAllOrders,
    getOrderById,
    getOrderByCustomerId,
}   