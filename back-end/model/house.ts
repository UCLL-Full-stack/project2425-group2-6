import { Order } from "./order";
import { Room } from "./room";

export class House{
    private id : number;
    private address : string;
    private type : string;
    private orders : Array<Order> = [];
    private rooms : Array<Room> = [];

    constructor(id : number, address : string, type : string){
        this.id = id;
        this.address = address;
        this.type = type;
    }

    public getId() : number {
        return this.id;
    }

    public getAddress() : string {
        return this.address;
    }

    public getType() : string {
        return this.type;
    }

    public getOrders() : Array<Order> {
        return this.orders;
    }

    public getRooms() : Array<Room> {
        return this.rooms;
    }

    public setId(id : number) {
        this.id = id;
    }

    public setAddress(address : string) {
        this.address = address;
    }

    public setType(type : string) {
        this.type = type;
    }

    public setOrders(orders : Array<Order>) {
        this.orders = orders;
    }

    public setRooms(rooms : Array<Room>) {
        this.rooms = rooms;
    }

    public addOrder(order : Order) {
        this.orders.push(order);
    }

    public addRoom(room : Room) {
        this.rooms.push(room);
    }

    public toString() : string {
        return "House [id=" + this.id + ", address=" + this.address + ", type=" + this.type + "]";
    }
}