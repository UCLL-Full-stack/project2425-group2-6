"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../../model/customer");
const id = 1;
const firstName = "John";
const lastName = "Doe";
const email = "john.doe@example.com";
const birthday = new Date("1990-01-01");
const password = "password123";
const customer = new customer_1.Customer(id, firstName, lastName, email, birthday, password);
test("Create a customer", () => {
    expect(customer.getId()).toBe(id);
    expect(customer.getFirstName()).toBe(firstName);
    expect(customer.getLastName()).toBe(lastName);
    expect(customer.getEmail()).toBe(email);
    expect(customer.getbirthday()).toBe(birthday);
});
test('given: invalid firstName, when: setFirstName, then: throw error', () => {
    const customer = () => new customer_1.Customer(id, "", lastName, email, birthday, password);
    expect(customer).toThrow("First name must not be blank and must be at least 2 characters long.");
});
test('given: invalid lastName, when: setLastName, then: throw error', () => {
    const customer = () => new customer_1.Customer(id, firstName, "", email, birthday, password);
    expect(customer).toThrow("Last name must not be blank and must be at least 2 characters long.");
});
test('given: invalid email, when: setEmail, then: throw error', () => {
    const customer = () => new customer_1.Customer(id, firstName, lastName, "invalid-email", birthday, password);
    expect(customer).toThrow("Invalid email format.");
});
test('given: invalid password, when: setPassword, then: throw error', () => {
    const customer = () => new customer_1.Customer(id, firstName, lastName, email, birthday, "short");
    expect(customer).toThrow("Password must be at least 8 characters long.");
});
test('given: invalid birthday, when: setBirthday, then: throw error', () => {
    const customer = () => new customer_1.Customer(id, firstName, lastName, email, undefined, password);
    expect(customer).toThrow("Birth date is required and must be a valid date.");
});
