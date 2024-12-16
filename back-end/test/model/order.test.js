"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../model/order");
const customer_1 = require("../../model/customer");
const house_1 = require("../../model/house");
const room_1 = require("../../model/room");
const address_1 = require("../../model/address");
const employee_1 = require("../../model/employee");
const customerId = 1;
const firstName = "John";
const lastName = "Doe";
const email = "john.doe@example.com";
const birthday = new Date("1990-01-01");
const password = "password123";
const customer = new customer_1.Customer(customerId, firstName, lastName, email, birthday, password);
const houseId = 1;
const houseNumber = 1;
const street = "Rue de la Loi";
const city = "Brussels";
const state = "Brussels Capital";
const zip = "1000";
const address = new address_1.Address(houseId, houseNumber, street, city, state, zip);
const type = "detached";
const house = new house_1.House(houseId, address, type);
const orderId = 1;
const orderDate = new Date();
const startDate = new Date(orderDate.getTime() + 24 * 60 * 60 * 1000); // Start date is one day after order date
const price = 1000;
const status = 0; // pending
const rooms = [];
const order = new order_1.Order(orderId, customer, orderDate, startDate, price, house);
test("Create an order", () => {
    expect(order.getId()).toBe(orderId);
    expect(order.getCustomer()).toBe(customer);
    expect(order.getOrderDate()).toBe(orderDate);
    expect(order.getStartDate()).toBe(startDate);
    expect(order.getPrice()).toBe(price);
    expect(order.getHouse()).toBe(house);
    expect(order.getStatus()).toBe("pending");
    expect(order.getRooms()).toEqual(rooms);
});
test('given: valid status, when: setStatus, then: set status', () => {
    order.setStatus(1); // in progress
    expect(order.getStatus()).toBe("in progress");
});
test('given: valid room, when: addRoom, then: add room', () => {
    const room = new room_1.Room(1, house, "Living Room", "Painting");
    order.addRoom(room);
    expect(order.getRooms()).toContain(room);
});
test('given: valid price, when: setPrice, then: set price', () => {
    order.setPrice(2000);
    expect(order.getPrice()).toBe(2000);
});
test('given: invalid order date, when: setOrderDate, then: throw error', () => {
    const futureDate = new Date(orderDate.getTime() + 24 * 60 * 60 * 1000); // One day in the future
    expect(() => {
        order.setOrderDate(futureDate);
    }).toThrow("Order date cannot be in the future.");
});
test('given: invalid start date, when: setStartDate, then: throw error', () => {
    const pastDate = new Date(orderDate.getTime() - 24 * 60 * 60 * 1000); // One day in the past
    expect(() => {
        order.setStartDate(pastDate);
    }).toThrow("Start date must be in the future.");
});
test('given: valid employee, when: addEmployee, then: add employee', () => {
    const employee = new employee_1.Employee(1, "Jane", "Doe", "jane.doe@example.com", "password123", 5, "Engineering", "B");
    order.addEmployee(employee);
    expect(order.getEmployee()).toContain(employee);
});
