"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const house_1 = require("./house");
class Room {
    // private employees: Array<Employee> = [];
    // private tools: Array<Tool> = [];
    // private materials: Array<Material> = [];
    constructor(id, house, name, workDescription) {
        this.id = id;
        this.setHouse(house);
        this.setName(name);
        this.setWorkDescription(workDescription);
    }
    getId() {
        return this.id;
    }
    getHouse() {
        return this.house;
    }
    getName() {
        return this.name;
    }
    getWorkDescription() {
        return this.workDescription;
    }
    setId(id) {
        this.id = id;
    }
    setHouse(house) {
        this.house = house;
    }
    setName(name) {
        this.name = name;
    }
    setWorkDescription(workDescription) {
        this.workDescription = workDescription;
    }
    toString() {
        return `Room [id=${this.id}, house=${this.house}, name=${this.name}, workDescription=${this.workDescription}]`;
    }
    static from({ id, house, name, workDescription }) {
        return new Room(id, house_1.House.from(house), name, workDescription);
    }
}
exports.Room = Room;
