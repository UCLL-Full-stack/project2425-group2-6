import { Room } from "./room";
import { Tool } from "./tool";

export class Material {
    private id : number;
    private name : string;
    private quantity : number;
    private rooms : Array<Room> = [];
    private tools : Array<Tool> = [];

    constructor(id : number, name : string, quantity : number){
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }

    public getId() : number {
        return this.id;
    }

    public getName() : string {
        return this.name;
    }

    public getQuantity() : number {
        return this.quantity;
    }

    public getRooms() : Array<Room> {
        return this.rooms;
    }

    public getTools() : Array<Tool> {
        return this.tools;
    }

    public setId(id : number) {
        this.id = id;
    }

    public setName(name : string) {
        this.name = name;
    }

    public setQuantity(quantity : number) {
        this.quantity = quantity;
    }

    public setRooms(rooms : Array<Room>) {
        this.rooms = rooms;
    }

    public setTools(tools : Array<Tool>) {
        this.tools = tools;
    }

    public addRoom(room : Room) {
        this.rooms.push(room);
    }

    public addTool(tool : Tool) {
        this.tools.push(tool);
    }

    public toString() : string {
        return "Material [id=" + this.id + ", name=" + this.name + ", quantity=" + this.quantity + "]";
    }
}