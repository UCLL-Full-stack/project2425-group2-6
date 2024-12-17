import { Employee } from "./employee";
import { House } from "./house";
import { Material } from "./material";
import { Order } from "./order";
import { Tool } from "./tool";

import { House as HousePrisma, Order as OrderPrisma, Room as RoomPrisma, Customer as CustomerPrisma, Employee as EmployeePrisma } from "@prisma/client";
export class Room {
    private id: number;
    private house!: House; 
    private name!: string;
    private workDescription!: string;
    private order! : Order;
    // private employees: Array<Employee> = [];
    // private tools: Array<Tool> = [];
    // private materials: Array<Material> = [];

    constructor(id: number, house: House, name: string, workDescription: string, order: Order) {
        this.id = id;
        this.setHouse(house); 
        this.setName(name);
        this.setWorkDescription(workDescription);
        this.setOrder(order);
    }

    public getOrder(): Order {
        return this.order;
    }

    public setOrder(order: Order) {
        this.order = order;
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
        workDescription,
        order
    }: RoomPrisma & {house: HousePrisma} & { order: OrderPrisma & { customer: CustomerPrisma; employee: EmployeePrisma, house: HousePrisma } }): Room {
        return new Room(id, House.from(house), name, workDescription, Order.from(order));
    }
}
