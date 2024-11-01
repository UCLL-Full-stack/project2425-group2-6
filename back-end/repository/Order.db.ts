import { log } from "console";
import { Order } from "../model/order";
import { orderInput, orderInputWithHouseId } from "../types/orderDto";
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

const addOrder = (orderData: orderInputWithHouseId): Order => {
    log("\nRepository")
    const newOrder = new Order(
        currentId++,
        CustomerDb.customers[CustomerDb.getCustomerIndexById(orderData.customerId)],
        orderData.orderDate,
        orderData.startDate,
        orderData.price,
        HouseDb.houses[orderData.houseId - 1]
    );
    log(newOrder);
    orders.push(newOrder);
    return newOrder;
}

const getOrdersByCustomerId = (customerId: number): Array<Order> => {
    return orders.filter(order => order.getCustomer().getId() === customerId);
}

export default {
    orders,
    getAllOrders,
    addOrder,
    getOrdersByCustomerId
};
