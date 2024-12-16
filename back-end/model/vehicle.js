"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
class Vehicle {
    constructor(id, domain, name) {
        this.employee = null;
        this.id = id;
        this.domain = domain;
        this.name = name;
    }
    getId() {
        return this.id;
    }
    getDomain() {
        return this.domain;
    }
    getName() {
        return this.name;
    }
    getEmployee() {
        return this.employee;
    }
    setId(id) {
        this.id = id;
    }
    setDomain(domain) {
        this.domain = domain;
    }
    setName(name) {
        this.name = name;
    }
    toString() {
        return "Vehicle [id=" + this.id + ", domain=" + this.domain + ", name=" + this.name + "]";
    }
}
exports.Vehicle = Vehicle;
