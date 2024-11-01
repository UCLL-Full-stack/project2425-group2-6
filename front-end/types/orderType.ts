import { CustomerInput } from './customerType.js';
import { houseInput } from './houseType.js';

export interface orderInput {
    customer : CustomerInput,
    orderDate : Date,
    startDate : Date,
    price : number,
    house : houseInput,
}