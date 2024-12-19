
import { House } from "./house";
import { Order } from "./order";

import { House as HousePrisma, Order as OrderPrisma, Room as RoomPrisma, Customer as CustomerPrisma, Employee as EmployeePrisma } from "@prisma/client";
export class Room {
    private id: number;
    private house!: House; 
    private name!: string;
    private workDescription!: string;
    private order! : Order;

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
        if (!order) {
            throw new Error("Order is required.");
        }

        if (!(order instanceof Order)) {
            throw new Error("Invalid order data.");
        }

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

    public setId(id: number): this {
        if (id <= 0) {
            throw new Error("ID must be a positive number.");
        }
        this.id = id;
        return this;
    }

    public setHouse(house: House) {
        if (!house) {
            throw new Error("House is required.");
        }

        if (!(house instanceof House)) {
            throw new Error("Invalid house data.");
        }

        this.house = house;
    }

    public setName(name: string) {
        if (!name || name.trim() === "") {
            throw new Error("Name is required.");
        }
        this.name = name;
    }

    public setWorkDescription(workDescription: string) {
        if (!workDescription || workDescription.trim() === "") {
            throw new Error("Work description is required.");
        }
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
    }: RoomPrisma & {house: HousePrisma} & { order: OrderPrisma & { customer: CustomerPrisma; employees: EmployeePrisma[], house: HousePrisma } }): Room {
        return new Room(id, House.from(house), name, workDescription, Order.from(order));
    }
}
