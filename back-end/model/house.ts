import { Address } from "./address";
import { Room } from "./room";

export class House {
    private id!: number;
    private address!: Address;
    private type!: string;
    private rooms: Array<Room> = [];

    constructor(id: number, address: Address, type: string, rooms: Array<Room> = []) {
        this.setId(id);
        this.setAddress(address);
        this.setType(type);

        if (rooms.length > 0) {
            this.setRooms(rooms);
        }
    }

    public setId(id: number): void {
        if (id <= 0) {
            throw new Error("ID must be a positive integer."); 
        }
        this.id = id;
    }

    getRooms(): Array<Room> {
        return this.rooms;
    }

    setRooms(rooms: Array<Room>): void {
        this.rooms = rooms;
    }

    addRoom(room: Room): void {
        this.rooms.push(room);
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getAddress(): Address {
        return this.address;
    }

    public setAddress(address: Address): void {
        if (!address) { 
            throw new Error("Address is required.");
        }
        this.address = address;
    }

    public getType(): string {
        return this.type;
    }

    // Setters with validation

    public setType(type: string): void {
        const validTypes = ["apartment", "detached", "semi-detached", "terraced", "bungalow", "townhouse"];
        if (!type || !validTypes.includes(type.toLowerCase())) {
            throw new Error(`Type must be one of the following: ${validTypes.join(", ")}.`);
        }
        this.type = type.toLowerCase();
    }

    // Utility method for string representation
    public toString(): string {
        return `House [id=${this.id}, address=${this.address}, type=${this.type}]`;
    }
}
