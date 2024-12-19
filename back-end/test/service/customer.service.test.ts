import { Customer } from "../../model/customer";
import customerService from "../../service/customer.service";
import CustomerDb from "../../repository/Customer.db";
import bcrypt from 'bcrypt';
import { createCustomerDto } from "../../types/index";

jest.mock("../../repository/Customer.db");
jest.mock('bcrypt');

const customer = new Customer("John", "Doe", "johndoe@gmail.com", new Date("1990-01-01"), "password123", new Date(), 1);
const customerToAdd = new Customer("Jane", "Doe", "janedoe@gmail.com", new Date("1990-01-01"), "password123", new Date(), 2);

beforeEach(() => {
    jest.clearAllMocks();
});

test("given: valid Customer, when: getAllCustomers, then: return all customers", async () => {
    (CustomerDb.getAllCustomers as jest.Mock).mockResolvedValue([customer]);
    const result = await customerService.getAllCustomers();
    expect(result).toEqual([customer]);
});

test("given: valid Customer, when: createCustomer, then: return created customer", async () => {
    const createCustomerDto: createCustomerDto = {
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
        birthday: new Date("1990-01-01"),
        password: "password123",
        createdAt: new Date()
    };

    (CustomerDb.getCustomerExists as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    (CustomerDb.createCustomer as jest.Mock).mockResolvedValue(customerToAdd);

    const result = await customerService.createCustomer(createCustomerDto);
    expect(result).toEqual(customerToAdd);
});

test("given: existing Customer, when: createCustomer, then: throw error", async () => {
    const createCustomerDto: createCustomerDto = {
        firstName: "Jane",
        lastName: "Doe",
        email: "janedoe@gmail.com",
        birthday: new Date("1990-01-01"),
        password: "password123",
        createdAt: new Date()
    };

    (CustomerDb.getCustomerExists as jest.Mock).mockResolvedValue(customerToAdd);

    await expect(customerService.createCustomer(createCustomerDto)).rejects.toThrow(`Customer with email ${createCustomerDto.email} already exists.`);
});

// test("given: valid credentials, when: authenticate, then: return authentication response", async () => {
//     const email = "johndoe@gmail.com";
//     const password = "password123";

//     (CustomerDb.getCustomerByEmail as jest.Mock).mockResolvedValue(customer);
//     (bcrypt.compare as jest.Mock).mockResolvedValue(true);

//     const result = await customerService.authenticate(email, password);
//     expect(result).toEqual({
//         token: expect.any(String),
//         email: customer.getEmail(),
//         fullname: `${customer.getFirstName()} ${customer.getLastName()}`,
//         role: customer.getRole(),
//     });
// });

// test("given: non-existing Customer, when: authenticate, then: throw error", async () => {
//     const email = "nonexistent@gmail.com";
//     const password = "password123";

//     (CustomerDb.getCustomerByEmail as jest.Mock).mockResolvedValue(null);

//     await expect(customerService.authenticate(email, password)).rejects.toThrow("Customer does not exist.");
// });

test("given: valid customerId, when: getCustomerHouses, then: return houses", async () => {
    const customerId = 1;
    const houses = [
        { id: 1, houseNumber: "1", street: "Rue de la Loi", city: "Brussels", zip: "1000", country: "Belgium", type: "detached", createdAt: new Date() }
    ];

    (CustomerDb.getCustomerHouses as jest.Mock).mockResolvedValue(houses);

    const result = await customerService.getCustomerHouses(customerId);
    expect(result).toEqual(houses);
});