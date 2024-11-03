import { log } from "console";
import { Order } from "../model/order";
import OrderDb from "../repository/Order.db";
import houseService from "./house.service";
import { modifyOrderById, orderInput, orderInputWithHouseId } from "../types";

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

const modifyOrderById = async (orderData: modifyOrderById): Promise<Order | undefined> => {
    return await OrderDb.modifyOrderById(orderData);
};

export default {
    getAllOrders, createOrder, modifyOrderById
}