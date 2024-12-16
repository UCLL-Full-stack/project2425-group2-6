"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_1 = require("../../model/vehicle");
const vehicleId = 1;
const vehicleDomain = "Transport";
const vehicleName = "Truck";
const vehicle = new vehicle_1.Vehicle(vehicleId, vehicleDomain, vehicleName);
test("Create a vehicle", () => {
    expect(vehicle.getId()).toBe(vehicleId);
    expect(vehicle.getDomain()).toBe(vehicleDomain);
    expect(vehicle.getName()).toBe(vehicleName);
    expect(vehicle.getEmployee()).toBeNull();
});
test('given: valid id, when: setId, then: set id', () => {
    vehicle.setId(2);
    expect(vehicle.getId()).toBe(2);
});
test('given: valid domain, when: setDomain, then: set domain', () => {
    vehicle.setDomain("Logistics");
    expect(vehicle.getDomain()).toBe("Logistics");
});
test('given: valid name, when: setName, then: set name', () => {
    vehicle.setName("Van");
    expect(vehicle.getName()).toBe("Van");
});
