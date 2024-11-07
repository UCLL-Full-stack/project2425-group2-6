import { Room } from "./room";
import { Tool } from "./tool";

export class Material {
    private id : number;
    private name : string;
    private quantity : number;

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

    public setId(id : number) {
        this.id = id;
    }

    public setName(name : string) {
        this.name = name;
    }

    public setQuantity(quantity : number) {
        this.quantity = quantity;
    }

    public toString() : string {
        return "Material [id=" + this.id + ", name=" + this.name + ", quantity=" + this.quantity + "]";
    }
}