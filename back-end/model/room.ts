import { Employee } from "./employee";
import { House } from "./house";
import { Material } from "./material";
import { Tool } from "./tool";

import { House as HousePrisma, Room as RoomPrisma } from "@prisma/client";
export class Room {
    private id: number;
    private house!: House; 
    private name!: string;
    private workDescription!: string;
    // private employees: Array<Employee> = [];
    // private tools: Array<Tool> = [];
    // private materials: Array<Material> = [];

    constructor(id: number, house: House, name: string, workDescription: string) {
        this.id = id;
        this.setHouse(house); 
        this.setName(name);
        this.setWorkDescription(workDescription);
    }

    public getId(): number {
        return this.id;
    }

    public getHouse(): House {
        return this.house;
    }

    public getName(): string {
        return this.name;
    }

    public getWorkDescription(): string {
        return this.workDescription;
    }

    public setId(id: number) {
        this.id = id;
    }

    public setHouse(house: House) {
        this.house = house;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setWorkDescription(workDescription: string) {
        this.workDescription = workDescription;
    }

    public toString(): string {
        return `Room [id=${this.id}, house=${this.house}, name=${this.name}, workDescription=${this.workDescription}]`;
    }

    static from ({
        id,
        house,
        name,
        workDescription
    }: RoomPrisma & {house: HousePrisma}): Room {
        return new Room(id, House.from(house), name, workDescription);
    }
}
