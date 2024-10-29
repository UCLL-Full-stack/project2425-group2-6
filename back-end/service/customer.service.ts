import { Customer } from "../model/customer";
import CustomerDb from "../repository/Customer.db";
import OrderDb from "../repository/Order.db";

const getAllCustomers = async () : Promise<Array<Customer>> => {
    return await CustomerDb.getAllCustomers();
}

const getCustomerById = async (id : number) : Promise<Customer | []> => {
    if (isNaN(id)){
        throw new Error("invalid format for id");
    }
    return await CustomerDb.getCustomerById(id);
}

const getCustomerOrderById = async (id : number) => {
    const data = await OrderDb.getAllOrders();
    const filtered = data.filter(order => order.getCustomer().getId() === id);
    return filtered;
}

export default {
    getAllCustomers, getCustomerById, getCustomerOrderById,
}