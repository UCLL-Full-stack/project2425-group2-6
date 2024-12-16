import { CustomerInput } from './customerType.js';
import { houseInput } from './houseType.js';

export type prepOrderDto = {
    email: string,
    startDate: Date,
    budget: number,
    
    houseNumber: string,
    street: string,
    city: string,
    zip: string,
    country: string,
    type: string,
  
  };