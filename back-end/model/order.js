"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const customer_1 = require("./customer");
const house_1 = require("./house");
class Order {
    constructor(id, customer, house, startDate, price) {
        this.orderDate = new Date();
        this.status = "pending";
        this.setId(id);
        this.setCustomer(customer);
        this.setHouse(house);
        this.setStartDate(startDate);
        this.setPrice(price);
        this.setStatus();
    }
    getId() {
        return this.id;
    }
    getStatus() {
        return this.status;
    }
    setHouse(house) {
        this.house = house;
    }
    getHouse() {
        return this.house;
    }
    setStatus(status) {
        if (status != undefined) {
            const statusLevel = ["pending", "in progress", "completed"];
            this.status = statusLevel[status];
        }
        else {
            this.status = "pending";
        }
        return this;
    }
    getCustomer() {
        return this.customer;
    }
    getOrderDate() {
        return this.orderDate;
    }
    getStartDate() {
        return this.startDate;
    }
    getPrice() {
        return this.price;
    }
    setId(id) {
        if (id <= 0) {
            throw new Error("ID must be a positive number.");
        }
        this.id = id;
        return this;
    }
    setCustomer(customer) {
        this.customer = customer;
        return this;
    }
    setOrderDate(orderDate) {
        const today = new Date();
        const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const orderDateWithoutTime = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());
        if (orderDateWithoutTime > todayWithoutTime) {
            throw new Error("Order date cannot be in the future.");
        }
        this.orderDate = orderDate;
        return this;
    }
    setStartDate(startDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight
        if (startDate <= today) {
            throw new Error("Start date must be in the future.");
        }
        this.startDate = startDate;
        return this;
    }
    setPrice(price) {
        if (price <= 0) {
            throw new Error("Price must be a positive number.");
        }
        this.price = price;
        return this;
    }
    toString() {
        return `Order [id=${this.id}, customer=${this.customer.toString()}, orderDate=${this.orderDate.toISOString()}, startDate=${this.startDate.toISOString()}, price=${this.price}}]`;
    }
    static from({ id, customer, house, orderDate, startDate, price, }) {
        console.log("Mapping orderPrisma to Order:", { id, customer, house, orderDate, startDate, price });
        if (!customer || !house) {
            throw new Error("Missing customer or house data");
        }
        const mappedOrder = new Order(id, customer_1.Customer.from(customer), house_1.House.from(house), startDate, price);
        console.log("Mapped Order:", mappedOrder);
        return mappedOrder;
    }
}
exports.Order = Order;
