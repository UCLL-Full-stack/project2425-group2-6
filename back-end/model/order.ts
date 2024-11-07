import { Customer } from "./customer";
import { Employee } from "./employee";
import { House } from "./house";
import { Room } from "./room";

export class Order {
    private id!: number;
    private customer!: Customer;
    private orderDate!: Date;
    private startDate!: Date;
    private price!: number;
    private house!: House;
    private rooms: Array<Room> = [];
    private Employee! : Array<Employee>;
    private status: string = "pending";

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

    getRooms(): Array<Room> {
        return this.rooms;
    }

    addRoom(room: Room): this {
        this.rooms.push(room);
        return this;
    }

    getStatus(): string {
        return this.status;
    }

    setStatus(status: number): this {
        const statusLevel = ["pending", "in progress", "completed"];
        this.status = statusLevel[status];
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

    public setHouse(house: House): this {
        this.house = house;
        return this;
    }

    getEmployee(): Array<Employee> {
        return this.Employee;
    }

    setEmployee(employee: Array<Employee>): this {
        this.Employee = employee;
        return this;
    }

    addEmployee(employee: Employee): this {
        if (!this.Employee) {
            this.Employee = [];
        }
        this.Employee.push(employee);
        return this;
    }

    public toString(): string {
        return `Order [id=${this.id}, customer=${this.customer.toString()}, orderDate=${this.orderDate.toISOString()}, startDate=${this.startDate.toISOString()}, price=${this.price}, house=${this.house.toString()}]`;
    }
}
