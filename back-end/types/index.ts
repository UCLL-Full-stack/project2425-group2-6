export type orderInput = {
    customerId : number,
    orderDate : Date,
    startDate : Date,
    price : number,
    house : houseInput,
}

export type modifyOrderById = {
    orderId : number,
    orderDate : Date,
    startDate : Date,
    price : number,
    house : houseInput,
}

export type orderInputWithHouseId = {
    customerId : number,
    orderDate : Date,
    startDate : Date,
    price : number,
    houseId : number,
}

export type houseInput = {
    address : string;
    type : string;
}

export type CreateCustomerDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type LoginCustomerDto = {
    email: string;
  password: string;
}