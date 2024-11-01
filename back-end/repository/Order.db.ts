import { Order } from "../model/order";
import { orderInput } from "../types/orderDto";
import CustomerDb from "./Customer.db";
import HouseDb from "./House.db";

let currentId: number = 1;

const orders: Array<Order> = [
    new Order(currentId++, CustomerDb.customers[0], new Date('2023-01-01'), new Date('2023-01-10'), 1000, HouseDb.houses[0]),
    new Order(currentId++, CustomerDb.customers[1], new Date('2023-02-01'), new Date('2023-02-10'), 1500, HouseDb.houses[1]),
    new Order(currentId++, CustomerDb.customers[2], new Date('2023-03-01'), new Date('2023-03-10'), 2000, HouseDb.houses[2])
];

const getAllOrders = () => {
    return orders;
}

const addOrder = (orderData : orderInput) => {
    const newOrder = new Order(currentId++, CustomerDb.customers[orderData.customerId], orderData.checkIn, orderData.checkOut, orderData.price, HouseDb.houses[orderData.houseId]);
    orders.push(newOrder);
    return newOrder;
}

export default {
    orders,
    getAllOrders,
    addOrder,
};
