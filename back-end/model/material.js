"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
class Material {
    constructor(id, name, quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getQuantity() {
        return this.quantity;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }
    toString() {
        return "Material [id=" + this.id + ", name=" + this.name + ", quantity=" + this.quantity + "]";
    }
}
exports.Material = Material;
