import { Room } from "../../model/room";
import { House } from "../../model/house";
import { Order } from "../../model/order";
import { Customer } from "../../model/customer";
import { Employee } from "../../model/employee";
import { Role } from "../../types";

// Create a customer
const customerId = 1;
const firstName = "John";
const lastName = "Doe";
const email = "john.doe@example.com";
const birthday = new Date("1990-01-01");
const password = "password123";
const customer = new Customer(firstName, lastName, email, birthday, password, new Date(), customerId);

// Create a house
const houseId = 1;
const houseNumber = "1";
const street = "Rue de la Loi";
const city = "Brussels";
const zip = "1000";
const country = "Belgium";
const houseType = "detached";
const house = new House(houseId, houseNumber, street, city, zip, houseType, country, new Date());

// Create an order
const orderId = 1;
const startDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // Start date is one day after order date
const price = 1000;
const employees: Employee[] = [];
const order = new Order(orderId, customer, house, startDate, price, employees);

// Create a room
const roomId = 1;
const roomName = "Living Room";
const workDescription = "Painting";
const room = new Room(roomId, house, roomName, workDescription, order);

test("Create a room", () => {
  expect(room.getId()).toBe(roomId);
  expect(room.getHouse()).toBe(house);
  expect(room.getName()).toBe(roomName);
  expect(room.getWorkDescription()).toBe(workDescription);
  expect(room.getOrder()).toBe(order);
});

test('given: valid house, when: setHouse, then: set house', () => {
  const newHouse = new House(2, "2", "New Street", "Antwerp", "2000", "apartment", "Belgium", new Date());
  room.setHouse(newHouse);
  expect(room.getHouse()).toBe(newHouse);
});

test('given: valid name, when: setName, then: set name', () => {
  const newName = "Bedroom";
  room.setName(newName);
  expect(room.getName()).toBe(newName);
});

test('given: valid work description, when: setWorkDescription, then: set work description', () => {
  const newWorkDescription = "Flooring";
  room.setWorkDescription(newWorkDescription);
  expect(room.getWorkDescription()).toBe(newWorkDescription);
});

test('given: valid order, when: setOrder, then: set order', () => {
  const newOrder = new Order(2, customer, house, startDate, 2000, employees);
  room.setOrder(newOrder);
  expect(room.getOrder()).toBe(newOrder);
});