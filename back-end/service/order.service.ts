import { log } from "console";
import { Order } from "../model/order";
import OrderDb from "../repository/Order.db"
import { orderInput, orderInputWithHouseId } from "../types/orderDto";
import houseService from "./house.service";

const getAllOrders = () : Array<Order> => {
    return OrderDb.getAllOrders();
}

const createOrder = async (orderData: orderInput): Promise<Order> => {
    log(`\nService`);
    log(orderData);
    const house = await houseService.addHouse(orderData.house.address, orderData.house.type);
    const newOrderData : orderInputWithHouseId = {customerId: orderData.customerId, startDate: orderData.startDate, orderDate: orderData.orderDate, price: orderData.price, houseId: house.getId()}; 
    return OrderDb.addOrder(newOrderData);
}

export default {
    getAllOrders, createOrder,
}