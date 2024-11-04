import { log } from "console";
import { Order } from "../model/order";
import CustomerDb from "./Customer.db";
import HouseDb from "./House.db";
import { modifyOrderById, orderInputWithHouseId } from "../types";

let currentId: number = 1;

const orders: Array<Order> = [
    new Order(currentId++, CustomerDb.customers[0], new Date('2023-01-01'), new Date('2025-01-10'), 1000, HouseDb.houses[0]),
    new Order(currentId++, CustomerDb.customers[1], new Date('2023-02-01'), new Date('2025-02-10'), 1500, HouseDb.houses[1]),
    new Order(currentId++, CustomerDb.customers[2], new Date('2023-03-01'), new Date('2025-03-10'), 2000, HouseDb.houses[2])
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

const getOrderById = (orderId: number): Order | undefined => {
    return orders.find(order => order.getId() === orderId);
}

const modifyOrderById = (orderData: modifyOrderById): Order | undefined => {
    let modifiedOrder: Order | undefined;

    // Iterate through the orders and modify the one with the matching ID
    orders.forEach(order => {
        if (order.getId() === orderData.orderId) {
            order.setOrderDate(orderData.orderDate);
            order.setStartDate(orderData.startDate);
            order.setPrice(orderData.price);
            // Assuming you have a way to set the house, you may need to add this too
            // order.setHouse(orderData.house); // Uncomment this if you have setHouse method
            modifiedOrder = order;
        }
    });

    return modifiedOrder;
};

export default {
    orders,
    getAllOrders,
    addOrder,
    getOrdersByCustomerId,
    getOrderById,
    modifyOrderById, 
};
