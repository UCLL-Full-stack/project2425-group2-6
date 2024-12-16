import { Room } from "./room";

import { Room as RoomsPrisma } from "@prisma/client";

export class House {
    private id!: number;
    private houseNumber!: string;
    private street!: string;
    private city!: string;
    private zip!: string;
    private country: string = "Belgium";
    private createdAt!: Date;
    private type!: string;

    constructor(
        id: number,
        houseNumber: string,
        street: string,
        city: string,
        zip: string,
        type: string,
        country: string = "Belgium",
        createdAt: Date = new Date(),
    ) {
        this.setId(id);
        this.setHouseNumber(houseNumber);
        this.setStreet(street);
        this.setCity(city);
        this.setZip(zip);
        this.setType(type);
        this.setCountry(country);
    }

    // ID
    public setId(id: number): void {
        if (id <= 0) {
            throw new Error("ID must be a positive integer.");
        }
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    // House Number
    public setHouseNumber(houseNumber: string): void {
        if (!houseNumber || houseNumber.trim() === "") {
            throw new Error("House number is required.");
        }
        this.houseNumber = houseNumber;
    }

    public getHouseNumber(): string {
        return this.houseNumber;
    }

    // Street
    public setStreet(street: string): void {
        if (!street || street.trim() === "") {
            throw new Error("Street is required.");
        }
        this.street = street;
    }

    public getStreet(): string {
        return this.street;
    }

    // City
    public setCity(city: string): void {
        if (!city || city.trim() === "") {
            throw new Error("City is required.");
        }
        this.city = city;
    }

    public getCity(): string {
        return this.city;
    }

    // ZIP Code
    public setZip(zip: string): void {
        if (!zip || zip.trim() === "") {
            throw new Error("ZIP code is required.");
        }
        this.zip = zip;
    }

    public getZip(): string {
        return this.zip;
    }

    // Country
    public setCountry(country: string): void {
        if (!country || country.trim() === "") {
            throw new Error("Country is required.");
        }
        this.country = country;
    }

    public getCountry(): string {
        return this.country;
    }

    // Created At
    public setCreatedAt(createdAt: Date): void {
        if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
            throw new Error("Created date must be a valid date.");
        }
        this.createdAt = createdAt;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    // Type
    public setType(type: string): void {
        const validTypes = ["apartment", "detached", "semi-detached", "terraced", "bungalow", "townhouse"];
        if (!type || !validTypes.includes(type.toLowerCase())) {
            throw new Error(`Type must be one of the following: ${validTypes.join(", ")}.`);
        }
        this.type = type.toLowerCase();
    }

    public getType(): string {
        return this.type;
    }

    // Utility method for string representation
    public toString(): string {
        return `House [id=${this.id}, houseNumber=${this.houseNumber}, street=${this.street}, city=${this.city}, zip=${this.zip}, country=${this.country}, createdAt=${this.createdAt}, type=${this.type}]`;
    }

    // Static method to create a House instance from plain data
    static from({
        id,
        houseNumber,
        street,
        city,
        zip,
        country,
        createdAt,
        type,
    }: {
        id: number;
        houseNumber: string;
        street: string;
        city: string;
        zip: string;
        country?: string;
        createdAt?: Date;
        type: string;
    }): House {
        return new House(
            id,
            houseNumber,
            street,
            city,
            zip,
            type,
            country || "Belgium",
            createdAt || new Date(),
        );
    }
}
