import { CustomerInput } from './customerType.js';
import { houseInput } from './houseType.js';

export type orderInput =  {
    customerId : number,
    orderDate : Date,
    startDate : Date,
    price : number,
    houseId : number,
}