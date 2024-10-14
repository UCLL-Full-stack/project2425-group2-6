import { House } from "./house";

export class Room{
    private id : number;
    private house : House;
    private name : string;
    private workDescription : string;

    constructor(id : number, house : House, name : string, workDescription : string){
        this.id = id;
        this.house = house;
        this.name = name;
        this.workDescription = workDescription;
    }

    public getId() : number {
        return this.id;
    }

    public getHouse() : House {
        return this.house;
    }

    public getName() : string {
        return this.name;
    }

    public getWorkDescription() : string {
        return this.workDescription;
    }

    public setId(id : number) {
        this.id = id;
    }

    public setHouse(house : House) {
        this.house = house;
    }

    public setName(name : string) {
        this.name = name;
    }

    public setWorkDescription(workDescription : string) {
        this.workDescription = workDescription;
    }

    public toString() : string {
        return "Room [id=" + this.id + ", house=" + this.house + ", name=" + this.name + ", workDescription=" + this.workDescription + "]";
    }
}