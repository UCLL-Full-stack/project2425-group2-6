import { Order } from "../../model/order";
import { Customer } from "../../model/customer";
import { House } from "../../model/house";
import { Room } from "../../model/room";
import { Employee } from "../../model/employee";

const customerId = 1;
const firstName = "John";
const lastName = "Doe";
const email = "john.doe@example.com";
const birthday = new Date("1990-01-01");
const password = "password123";
const customer = new Customer(firstName, lastName, email, birthday, password, new Date(), customerId);

const houseId = 1;
const houseNumber = "1";
const street = "Rue de la Loi";
const city = "Brussels";
const zip = "1000";
const type = "detached";
const house = new House(houseId, houseNumber, street, city, zip, type);

const orderId = 1;
const orderDate = new Date();
const startDate = new Date(orderDate.getTime() + 24 * 60 * 60 * 1000); // Start date is one day after order date
const price = 1000;
const employees: Employee[] = [];
const rooms: Room[] = [];

const order = new Order(orderId, customer, house, startDate, price, employees);

test("Create an order", () => {
  expect(order.getId()).toBe(orderId);
  expect(order.getCustomer()).toBe(customer);
  expect(order.getOrderDate()).toBeInstanceOf(Date);
  expect(order.getStartDate()).toBe(startDate);
  expect(order.getPrice()).toBe(price);
  expect(order.getHouse()).toBe(house);
  expect(order.getStatus()).toBe("pending");
  expect(order.getEmployees()).toEqual(employees);
});

test("Set and get status", () => {
  order.setStatus(1); // in progress
  expect(order.getStatus()).toBe("in progress");

  order.setStatus(2); // completed
  expect(order.getStatus()).toBe("completed");

  order.setStatus(0); // pending
  expect(order.getStatus()).toBe("pending");
});

test("Set and get employees", () => {
  const employee = new Employee("Jane", "Doe", "jane.doe@example.com", "password123", "worker", 5, "IT", "B", new Date(), 2);
  order.setEmployees([employee]);
  expect(order.getEmployees()).toEqual([employee]);
});

test("Set and get house", () => {
  const newHouse = new House(2, "2", "New Street", "New City", "2000", "apartment");
  order.setHouse(newHouse);
  expect(order.getHouse()).toBe(newHouse);
});

test("Set and get price", () => {
  order.setPrice(2000);
  expect(order.getPrice()).toBe(2000);
});

test("Set and get start date", () => {
  const newStartDate = new Date(orderDate.getTime() + 48 * 60 * 60 * 1000); // Start date is two days after order date
  order.setStartDate(newStartDate);
  expect(order.getStartDate()).toBe(newStartDate);
});

test("Set and get order date", () => {
  const newOrderDate = new Date(orderDate.getTime() - 24 * 60 * 60 * 1000); // Order date is one day before current order date
  order.setOrderDate(newOrderDate);
  expect(order.getOrderDate()).toBe(newOrderDate);
});

test("Set and get customer", () => {
  const newCustomer = new Customer("Jane", "Doe", "jane.doe@example.com", new Date("1995-01-01"), "password123", new Date(), 2);
  order.setCustomer(newCustomer);
  expect(order.getCustomer()).toBe(newCustomer);
});

test("Set and get ID", () => {
  order.setId(2);
  expect(order.getId()).toBe(2);
});

test("Order toString", () => {
  const orderString = `Order [id=${order.getId()}, customer=${order.getCustomer().toString()}, orderDate=${order.getOrderDate().toISOString()}, startDate=${order.getStartDate().toISOString()}, price=${order.getPrice()}}]`;
  expect(order.toString()).toBe(orderString);
});