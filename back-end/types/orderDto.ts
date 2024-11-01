import { CreateCustomerDto } from "./createCustomerDto";
import { houseInput } from "./houseDto";

export interface orderInput {
    customerId : number,
    orderDate : Date,
    startDate : Date,
    price : number,
    house : houseInput,
}

export interface orderInputWithHouseId {
    customerId : number,
    orderDate : Date,
    startDate : Date,
    price : number,
    houseId : number,
}

