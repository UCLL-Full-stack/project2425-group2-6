import database from "../util/database";
import { Customer } from "./customer";
import { Employee } from "./employee";
import { House } from "./house";
import { Room } from "./room";

import {    
            Order as OrderPrisma,
            Customer as CustomerPrisma,
            House as HousePrisma,
            Employee as EmployeePrisma
 } from "@prisma/client";

export class Order {
    private id!: number;
    private customer!: Customer;
    private house!: House;
    private orderDate: Date = new Date();
    private startDate!: Date;
    private price!: number;
    private status: string = "pending";
    private employees: Array<Employee> = [];

    constructor(id: number, customer: Customer, house: House, startDate: Date, price: number, employees: Array<Employee>) {
        this.setId(id);
        this.setCustomer(customer);
        this.setHouse(house);
        this.setStartDate(startDate);
        this.setPrice(price);
        this.setStatus();
        this.setEmployees(employees);
    }

    public getEmployees(): Array<Employee> {
        return this.employees;
    }

    public setEmployees(employees: Array<Employee>) {
        this.employees = employees;
    }

    public getId(): number {
        return this.id;
    }

    getStatus(): string {
        return this.status;
    }

    public setHouse(house: House) {
        this.house = house;
    }

    public getHouse(): House {
        return this.house;
    }

    setStatus(status?: number): this {
        if (status != undefined) {
            const statusLevel = ["pending", "in progress", "completed"];
        this.status = statusLevel[status];
        }
        else{
            this.status = "pending";
        }
        return this;
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
        const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const orderDateWithoutTime = new Date(orderDate.getFullYear(), orderDate.getMonth(), orderDate.getDate());
    
        if (orderDateWithoutTime > todayWithoutTime) {
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

    public toString(): string {
        return `Order [id=${this.id}, customer=${this.customer.toString()}, orderDate=${this.orderDate.toISOString()}, startDate=${this.startDate.toISOString()}, price=${this.price}}]`;
    }

    static from({
    id,
    customer,
    house,
    orderDate,
    startDate,
    price,
    employees
}: OrderPrisma & { customer: CustomerPrisma } & { house: HousePrisma } & {employees : EmployeePrisma[]}): Order {
    //console.log("Mapping orderPrisma to Order:", { id, customer, house, orderDate, startDate, price });

    if (!customer || !house) {
        throw new Error("Missing customer or house data");
    }

    const mappedOrder = new Order(
        id,
        Customer.from(customer),
        House.from(house),
        startDate,
        price,
        employees.map(employee => Employee.from(employee))
    );

    //console.log("Mapped Order:", mappedOrder);
    return mappedOrder;
}

    
    
}
