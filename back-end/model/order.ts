import { Customer } from "./customer";
import { House } from "./house";

export class Order {
    private id!: number;
    private customer!: Customer;
    private orderDate!: Date;
    private startDate!: Date;
    private price!: number;
    private house!: House;

    constructor(id: number, customer: Customer, orderDate: Date, startDate: Date, price: number, house: House) {
        this.setId(id);
        this.setCustomer(customer);
        this.setOrderDate(orderDate);
        this.setStartDate(startDate);
        this.setPrice(price);
        this.setHouse(house);
    }

    public getId(): number {
        return this.id;
    }

    public getCustomer(): Customer {
        return this.customer;
    }

    public getOrderDate(): Date {
        return this.orderDate;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public getPrice(): number {
        return this.price;
    }

    public getHouse(): House {
        return this.house;
    }

    public setId(id: number): this {
        if (id <= 0) {
            throw new Error("ID must be a positive number.");
        }
        this.id = id;
        return this;
    }

    public setCustomer(customer: Customer): this {
        this.customer = customer;
        return this;
    }

    setOrderDate(orderDate: Date): this {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight
        if (orderDate > today) {
            throw new Error("Order date cannot be in the future.");
        }
        this.orderDate = orderDate;
        return this;
    }

    setStartDate(startDate: Date): this {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight
        if (startDate <= today) {
            throw new Error("Start date must be in the future.");
        }
        this.startDate = startDate;
        return this;
    }

    public setPrice(price: number): this {
        if (price <= 0) {
            throw new Error("Price must be a positive number.");
        }
        this.price = price;
        return this;
    }

    public setHouse(house: House): this {
        this.house = house;
        return this;
    }

    public toString(): string {
        return `Order [id=${this.id}, customer=${this.customer.toString()}, orderDate=${this.orderDate.toISOString()}, startDate=${this.startDate.toISOString()}, price=${this.price}, house=${this.house.toString()}]`;
    }
}
