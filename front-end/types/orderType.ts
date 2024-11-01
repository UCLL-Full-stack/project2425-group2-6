import { CustomerInput } from './customerType.js';
import { houseInput } from './houseType.js';

export interface orderInput {
    customerId : number,
    orderDate : Date,
    startDate : Date,
    price : number,
    house : houseInput,
}