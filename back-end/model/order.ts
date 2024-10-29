import { Customer } from "./customer";
import { House } from "./house";

export class Order{
    private id : number;
    private customer! : Customer;
    private orderDate : Date;
    private startDate : Date;
    private price : number;
    private house : House;

    constructor(id : number, customer : Customer, orderDate : Date, startDate : Date, price : number, house : House) {
        this.id = id;
        this.customer = customer;
        this.orderDate = orderDate;
        this.startDate = startDate;
        this.price = price;
        this.house = house;
    }

    public getId() : number {
        return this.id;
    }

    public getCustomer() : Customer {
        return this.customer;
    }

    public getOrderDate() : Date {
        return this.orderDate;
    }

    public getStartDate() : Date {
        return this.startDate;
    }

    public getPrice() : number {
        return this.price;
    }

    public getHouse() : House {
        return this.house;
    }

    public setId(id : number) {
        this.id = id;
    }

    public setCustomer(customer : Customer) {
        this.customer = customer;
    }

    public setOrderDate(orderDate : Date) {
        this.orderDate = orderDate;
    }

    public setStartDate(startDate : Date) {
        this.startDate = startDate;
    }

    public setPrice(price : number) {
        this.price = price;
    }

    public setHouse(house : House) {
        this.house = house;
    }

    public toString() : string {
        return "Order [id=" + this.id + ", customer=" + this.customer + ", orderDate=" + this.orderDate + ", startDate=" + this.startDate + ", price=" + this.price + ", house=" + this.house + "]";
    }
}