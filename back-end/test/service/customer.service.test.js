"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../../model/customer");
const customer_service_1 = __importDefault(require("../../service/customer.service"));
const customer = new customer_1.Customer(1, "John", "Doe", "johndoe@gmail.com", new Date("1990-01-01"), "password123");
const customerToAdd = new customer_1.Customer(2, "Jane", "Doe", "janedoe@gmail.com", new Date("1990-01-01"), "password123");
let mockCustomerGetAllCustomers;
let mockCustomerGetCustomerById;
let mockCustomerAddCustomer;
beforeEach(() => {
    mockCustomerGetAllCustomers = jest.fn().mockReturnValue(customer);
    mockCustomerGetCustomerById = jest.fn().mockReturnValue(customer);
    mockCustomerAddCustomer = jest.fn();
    customer_service_1.default.getAllCustomers = mockCustomerGetAllCustomers;
    customer_service_1.default.getCustomerById = mockCustomerGetCustomerById;
    customer_service_1.default.addCustomer = mockCustomerAddCustomer;
});
afterEach(() => {
    jest.clearAllMocks();
});
test("given: valid Customer, when: getAllCustomers, then: return all customers", () => {
    const result = customer_service_1.default.getAllCustomers();
    expect(result).toEqual(customer);
});
test("given: valid id, when: getCustomerById, then: return customer with given id", () => {
    const result = customer_service_1.default.getCustomerById(1);
    expect(result).toEqual(customer);
});
test("given: valid Customer, when: addCustomer, then: add customer", () => {
    const customerDto = {
        firstName: customerToAdd.getFirstName(),
        lastName: customerToAdd.getLastName(),
        email: customerToAdd.getEmail(),
        birthDate: customerToAdd.getbirthday(),
        password: customerToAdd.getPassword()
    };
    customer_service_1.default.addCustomer(customerDto);
    expect(mockCustomerAddCustomer).toHaveBeenCalledWith(customerDto);
    expect(mockCustomerAddCustomer).toHaveBeenCalledTimes(1);
});
