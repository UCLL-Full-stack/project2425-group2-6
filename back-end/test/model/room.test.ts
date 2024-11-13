import { Room } from "../../model/room";
import { House } from "../../model/house";
import { Address } from "../../model/address";
import { Employee } from "../../model/employee";
import { Tool } from "../../model/tool";
import { Material } from "../../model/material";

const houseId = 1;
const houseNumber = 1;
const street = "Rue de la Loi";
const city = "Brussels";
const state = "Brussels Capital";
const zip = "1000";
const address = new Address(houseId, houseNumber, street, city, state, zip);
const type = "detached";
const house = new House(houseId, address, type);

const roomId = 1;
const roomName = "Living Room";
const workDescription = "Painting";

const room = new Room(roomId, house, roomName, workDescription);

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
    const employee = new Employee(1, "Jane", "Doe", "jane.doe@example.com", "password123", 5, "Engineering", "B");
    room.addEmployee(employee);
    expect(room.getEmployees()).toContain(employee);
});

test('given: valid tool, when: addTool, then: add tool', () => {
    const tool = new Tool(1, "Hammer", 10);
    room.addTool(tool);
    expect(room.getTools()).toContain(tool);
});

test('given: valid material, when: addMaterial, then: add material', () => {
    const material = new Material(1, "Wood", 20);
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