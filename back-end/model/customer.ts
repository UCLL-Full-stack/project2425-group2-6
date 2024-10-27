import { Order } from "./order";

export class Customer {
    private id : number;
    private firstName : string;
    private lastName : string;
    private email : string;
    private orders: Array<Order> = [];

    constructor(id: number, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public getId() : number {
        return this.id;
    }

    public getFirstName() : string {
        return this.firstName;
    }

    public getLastName() : string {
        return this.lastName;
    }

    public getEmail() : string {
        return this.email;
    }

    public getOrders() : Array<Order> {
        return this.orders;
    }

    public setId(id: number) {
        this.id = id;
    }

    public setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    public setLastName(lastName: string) {
        this.lastName = lastName;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public setOrders(order : Array<Order>) {
        this.orders = order;
    }

    public addOrder(order : Order) {
        this.orders.push(order);
    }

    public toString() : string {
        return "Customer [id=" + this.id + ", name=" + `${this.firstName} ${this.lastName} ` + ", email=" + this.email + "]";
    }
}