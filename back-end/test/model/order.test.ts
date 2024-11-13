import { Order } from "../../model/order";
import { Customer } from "../../model/customer";
import { House } from "../../model/house";
import { Room } from "../../model/room";
import { Address } from "../../model/address";
import { Employee } from "../../model/employee";

const customerId = 1;
const firstName = "John";
const lastName = "Doe";
const email = "john.doe@example.com";
const birthday = new Date("1990-01-01");
const password = "password123";
const customer = new Customer(customerId, firstName, lastName, email, birthday, password);

const houseId = 1;
const houseNumber = 1;
const street = "Rue de la Loi";
const city = "Brussels";
const state = "Brussels Capital";
const zip = "1000";
const address = new Address(houseId, houseNumber, street, city, state, zip);
const type = "detached";
const house = new House(houseId, address, type);

const orderId = 1;
const orderDate = new Date();
const startDate = new Date(orderDate.getTime() + 24 * 60 * 60 * 1000); // Start date is one day after order date
const price = 1000;
const status = 0; // pending
const rooms: Room[] = [];

const order = new Order(orderId, customer, orderDate, startDate, price, house);

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
    const room = new Room(1, house, "Living Room", "Painting");
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
    const employee = new Employee(1, "Jane", "Doe", "jane.doe@example.com", "password123", 5, "Engineering", "B");
    order.addEmployee(employee);
    expect(order.getEmployee()).toContain(employee);
});