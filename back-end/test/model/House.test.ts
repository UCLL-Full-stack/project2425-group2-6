import { House } from "../../model/house";

describe('House Class', () => {
    let house: House;

    beforeEach(() => {
        house = new House(1, "123 Main St", "apartment");
    });

    // Happy Path Tests
    test('should create a House instance with valid properties', () => {
        expect(house.getId()).toBe(1);
        expect(house.getAddress()).toBe("123 Main St");
        expect(house.getType()).toBe("apartment");
    });

    test('should update address with valid input', () => {
        house.setAddress("456 Another St");
        expect(house.getAddress()).toBe("456 Another St");
    });

    test('should update type with valid input', () => {
        house.setType("bungalow");
        expect(house.getType()).toBe("bungalow");
    });

    // Unhappy Path Tests
    test('should throw error if setting address to an empty string', () => {
        expect(() => house.setAddress("")).toThrow("Address must not be blank and should be at least 5 characters long.");
    });

    test('should throw error if setting address to less than 5 characters', () => {
        expect(() => house.setAddress("1234")).toThrow("Address must not be blank and should be at least 5 characters long.");
    });

    test('should throw error if setting type to an invalid type', () => {
        expect(() => house.setType("invalid-type")).toThrow("Type must be one of the following: apartment, detached, semi-detached, terraced, bungalow, townhouse.");
    });

    test('should throw error if setting type to an empty string', () => {
        expect(() => house.setType("")).toThrow("Type must be one of the following: apartment, detached, semi-detached, terraced, bungalow, townhouse.");
    });

    test('should throw error if ID is set to a non-positive number', () => {
        expect(() => house.setId(-1)).toThrow("ID must be a positive integer.");
    });
});
