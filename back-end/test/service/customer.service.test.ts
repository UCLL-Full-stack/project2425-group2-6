import { mock } from "node:test";
import { Customer } from "../../model/customer";
import { User } from "../../model/user";

import customerService from "../../service/customer.service";
import { createCustomerDto } from "../../types";

const customer = new Customer(1, "John", "Doe", "johndoe@gmail.com", new Date("1990-01-01"), "password123");
const customerToAdd = new Customer(2, "Jane", "Doe", "janedoe@gmail.com", new Date("1990-01-01"), "password123");

let mockCustomerGetAllCustomers: jest.Mock;
let mockCustomerGetCustomerById: jest.Mock;
let mockCustomerAddCustomer: jest.Mock;

beforeEach(() => {
    mockCustomerGetAllCustomers = jest.fn().mockReturnValue(customer);
    mockCustomerGetCustomerById = jest.fn().mockReturnValue(customer);
    mockCustomerAddCustomer = jest.fn();

    customerService.getAllCustomers = mockCustomerGetAllCustomers;
    customerService.getCustomerById = mockCustomerGetCustomerById;
    customerService.addCustomer = mockCustomerAddCustomer;
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given: valid Customer, when: getAllCustomers, then: return all customers", () => {
    const result = customerService.getAllCustomers();

    expect(result).toEqual(customer);
});

test("given: valid id, when: getCustomerById, then: return customer with given id", () => {
    const result = customerService.getCustomerById(1);

    expect(result).toEqual(customer);
});

test("given: valid Customer, when: addCustomer, then: add customer", () => {
    const customerDto: createCustomerDto = {
        firstName: customerToAdd.getFirstName(),
        lastName: customerToAdd.getLastName(),
        email: customerToAdd.getEmail(),
        birthDate: customerToAdd.getbirthday(),
        password: customerToAdd.getPassword()
    };
    customerService.addCustomer(customerDto);

    expect(mockCustomerAddCustomer).toHaveBeenCalledWith(customerDto);
    expect(mockCustomerAddCustomer).toHaveBeenCalledTimes(1);
});
