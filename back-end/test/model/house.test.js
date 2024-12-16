"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const house_1 = require("../../model/house");
const address_1 = require("../../model/address");
const id = 1;
const houseNumber = 1;
const street = "Rue de la Loi";
const city = "Brussels";
const state = "Brussels Capital";
const zip = "1000";
const address = new address_1.Address(id, houseNumber, street, city, state, zip);
const type = "detached";
const house = new house_1.House(id, address, type);
test("Create a house", () => {
    expect(house.getId()).toBe(id);
    expect(house.getAddress()).toBe(address);
    expect(house.getType()).toBe(type);
});
test('given: invalid type, when: setType, then: throw error', () => {
    const house = () => new house_1.House(id, address, "invalid-type");
    expect(house).toThrow("Type must be one of the following: apartment, detached, semi-detached, terraced, bungalow, townhouse.");
});
test('given: valid type, when: setType, then: set type', () => {
    house.setType("apartment");
    expect(house.getType()).toBe("apartment");
});
test('given: invalid address, when: setAddress, then: throw error', () => {
    const invalidAddress = () => new address_1.Address(id, houseNumber, "", city, state, zip);
    expect(invalidAddress).toThrow("Street must not be blank : ");
});
test('given: valid address, when: setAddress, then: set address', () => {
    const newAddress = new address_1.Address(id, houseNumber, "New Street", city, state, zip);
    house.setAddress(newAddress);
    expect(house.getAddress()).toBe(newAddress);
});
