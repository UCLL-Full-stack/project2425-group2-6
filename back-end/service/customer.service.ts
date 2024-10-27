import { Customer } from "../model/customer";
import CustomerDb from "../repository/Customer.db";

const getAllCustomers = async () : Promise<Array<Customer>> => {
    return await CustomerDb.getAllCustomers();
}

const getCustomerById = async (id : number) : Promise<Customer | undefined> => {
    return await CustomerDb.getCustomerById(id);
}

export default {
    getAllCustomers, getCustomerById,
}