"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_1 = require("../../model/room");
const house_1 = require("../../model/house");
const address_1 = require("../../model/address");
const employee_1 = require("../../model/employee");
const tool_1 = require("../../model/tool");
const material_1 = require("../../model/material");
const houseId = 1;
const houseNumber = 1;
const street = "Rue de la Loi";
const city = "Brussels";
const state = "Brussels Capital";
const zip = "1000";
const address = new address_1.Address(houseId, houseNumber, street, city, state, zip);
const type = "detached";
const house = new house_1.House(houseId, address, type);
const roomId = 1;
const roomName = "Living Room";
const workDescription = "Painting";
const room = new room_1.Room(roomId, house, roomName, workDescription);
test("Create a room", () => {
    expect(room.getId()).toBe(roomId);
    expect(room.getHouse()).toBe(house);
    expect(room.getName()).toBe(roomName);
    expect(room.getWorkDescription()).toBe(workDescription);
    expect(room.getEmployees()).toEqual([]);
    expect(room.getTools()).toEqual([]);
    expect(room.getMaterials()).toEqual([]);
});
test('given: valid employee, when: addEmployee, then: add employee', () => {
    const employee = new employee_1.Employee(1, "Jane", "Doe", "jane.doe@example.com", "password123", 5, "Engineering", "B");
    room.addEmployee(employee);
    expect(room.getEmployees()).toContain(employee);
});
test('given: valid tool, when: addTool, then: add tool', () => {
    const tool = new tool_1.Tool(1, "Hammer", 10);
    room.addTool(tool);
    expect(room.getTools()).toContain(tool);
});
test('given: valid material, when: addMaterial, then: add material', () => {
    const material = new material_1.Material(1, "Wood", 20);
    room.addMaterial(material);
    expect(room.getMaterials()).toContain(material);
});
test('given: valid name, when: setName, then: set name', () => {
    room.setName("Bedroom");
    expect(room.getName()).toBe("Bedroom");
});
test('given: valid work description, when: setWorkDescription, then: set work description', () => {
    room.setWorkDescription("Cleaning");
    expect(room.getWorkDescription()).toBe("Cleaning");
});
