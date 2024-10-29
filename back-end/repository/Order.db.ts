import { Order } from "../model/order";
import CustomerDb from "./Customer.db";
import HouseDb from "./House.db";

const orders: Array<Order> = [
    new Order(1, CustomerDb.customers[0], new Date('2023-01-01'), new Date('2023-01-10'), 1000, HouseDb.houses[0]),
    new Order(2, CustomerDb.customers[1], new Date('2023-02-01'), new Date('2023-02-10'), 1500, HouseDb.houses[1]),
    new Order(3, CustomerDb.customers[2], new Date('2023-03-01'), new Date('2023-03-10'), 2000, HouseDb.houses[2])
];

const getAllOrders = () => {
    return orders;
}

export default {
    orders,
    getAllOrders
};
