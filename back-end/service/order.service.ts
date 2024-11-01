import OrderDb from "../repository/Order.db"
import { orderInput } from "../types/orderDto";

const getAllOrders = () => {
    return OrderDb.getAllOrders();
}

const createOrder = (orderData : orderInput) => {
    return OrderDb.addOrder(orderData);
};

export default {
    getAllOrders, createOrder
}