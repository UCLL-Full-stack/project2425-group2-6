"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("../../model/address");
const houseNumber = 1;
const street = "Rue de la Loi";
const city = "Brussels";
const state = "Brussels Capital";
const zip = "1000";
const address = new address_1.Address(1, houseNumber, street, city, state, zip);
test("Create an address", () => {
    expect(address.getHouseNumber()).toBe(houseNumber);
    expect(address.getStreet()).toBe(street);
    expect(address.getCity()).toBe(city);
    expect(address.getState()).toBe(state);
    expect(address.getZip()).toBe(zip);
});
test('given: invalid street, when: setStreet, then: throw error', () => {
    const address = () => new address_1.Address(1, houseNumber, "", city, state, zip);
    expect(address).toThrow("Street must not be blank : ");
});
test('given: invalid city, when: setCity, then: throw error', () => {
    const address = () => new address_1.Address(1, houseNumber, street, "", state, zip);
    expect(address).toThrow("City must not be blank and should be at least 3 characters long.");
});
test('given: invalid state, when: setState, then: throw error', () => {
    const address = () => new address_1.Address(1, houseNumber, street, city, "", zip);
    expect(address).toThrow("State must not be blank and should be at least 3 characters long.");
});
test('given: invalid zip, when: setZip, then: throw error', () => {
    const address = () => new address_1.Address(1, houseNumber, street, city, state, "");
    expect(address).toThrow("Zip code must not be blank and should be at least 4 characters long.");
});
