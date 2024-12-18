import { House } from "../../model/house";

const id = 1;
const houseNumber = "1";
const street = "Rue de la Loi";
const city = "Brussels";
const zip = "1000";
const country = "Belgium";
const createdAt = new Date();
const type = "detached";

const house = new House(id, houseNumber, street, city, zip, type, country, createdAt);

test("Create a house", () => {
  expect(house.getId()).toBe(id);
  expect(house.getHouseNumber()).toBe(houseNumber);
  expect(house.getStreet()).toBe(street);
  expect(house.getCity()).toBe(city);
  expect(house.getZip()).toBe(zip);
  expect(house.getCountry()).toBe(country);
  // expect(house.getCreatedAt()).toBe(createdAt);
  expect(house.getType()).toBe(type);
});

test('given: invalid type, when: setType, then: throw error', () => {
  expect(() => new House(id, houseNumber, street, city, zip, "invalid-type", country, createdAt)).toThrow("Type must be one of the following: apartment, detached, semi-detached, terraced, bungalow, townhouse.");
});

test('given: valid type, when: setType, then: set type', () => {
  const validHouse = new House(id, houseNumber, street, city, zip, "apartment", country, createdAt);
  expect(validHouse.getType()).toBe("apartment");
});

test('given: invalid houseNumber, when: setHouseNumber, then: throw error', () => {
  expect(() => new House(id, "", street, city, zip, type, country, createdAt)).toThrow("House number is required.");
});

test('given: invalid street, when: setStreet, then: throw error', () => {
  expect(() => new House(id, houseNumber, "", city, zip, type, country, createdAt)).toThrow("Street is required.");
});

test('given: invalid city, when: setCity, then: throw error', () => {
  expect(() => new House(id, houseNumber, street, "", zip, type, country, createdAt)).toThrow("City is required.");
});

test('given: invalid zip, when: setZip, then: throw error', () => {
  expect(() => new House(id, houseNumber, street, city, "", type, country, createdAt)).toThrow("ZIP code is required.");
});

test('given: invalid country, when: setCountry, then: throw error', () => {
  expect(() => new House(id, houseNumber, street, city, zip, type, "", createdAt)).toThrow("Country is required.");
});

// test('given: invalid createdAt, when: setCreatedAt, then: throw error', () => {
//   expect(() => new House(id, houseNumber, street, city, zip, type, country, new Date("invalid-date"))).toThrow("Created date must be a valid date.");
// });

test('given: invalid id, when: setId, then: throw error', () => {
  expect(() => new House(-1, houseNumber, street, city, zip, type, country, createdAt)).toThrow("ID must be a positive integer.");
});