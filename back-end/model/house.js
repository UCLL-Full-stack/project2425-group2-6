"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
class House {
    constructor(id, houseNumber, street, city, zip, type, country = "Belgium", createdAt = new Date()) {
        this.country = "Belgium";
        this.setId(id);
        this.setHouseNumber(houseNumber);
        this.setStreet(street);
        this.setCity(city);
        this.setZip(zip);
        this.setType(type);
        this.setCountry(country);
    }
    // ID
    setId(id) {
        if (id <= 0) {
            throw new Error("ID must be a positive integer.");
        }
        this.id = id;
    }
    getId() {
        return this.id;
    }
    // House Number
    setHouseNumber(houseNumber) {
        if (!houseNumber || houseNumber.trim() === "") {
            throw new Error("House number is required.");
        }
        this.houseNumber = houseNumber;
    }
    getHouseNumber() {
        return this.houseNumber;
    }
    // Street
    setStreet(street) {
        if (!street || street.trim() === "") {
            throw new Error("Street is required.");
        }
        this.street = street;
    }
    getStreet() {
        return this.street;
    }
    // City
    setCity(city) {
        if (!city || city.trim() === "") {
            throw new Error("City is required.");
        }
        this.city = city;
    }
    getCity() {
        return this.city;
    }
    // ZIP Code
    setZip(zip) {
        if (!zip || zip.trim() === "") {
            throw new Error("ZIP code is required.");
        }
        this.zip = zip;
    }
    getZip() {
        return this.zip;
    }
    // Country
    setCountry(country) {
        if (!country || country.trim() === "") {
            throw new Error("Country is required.");
        }
        this.country = country;
    }
    getCountry() {
        return this.country;
    }
    // Created At
    setCreatedAt(createdAt) {
        if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
            throw new Error("Created date must be a valid date.");
        }
        this.createdAt = createdAt;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    // Type
    setType(type) {
        const validTypes = ["apartment", "detached", "semi-detached", "terraced", "bungalow", "townhouse"];
        if (!type || !validTypes.includes(type.toLowerCase())) {
            throw new Error(`Type must be one of the following: ${validTypes.join(", ")}.`);
        }
        this.type = type.toLowerCase();
    }
    getType() {
        return this.type;
    }
    // Utility method for string representation
    toString() {
        return `House [id=${this.id}, houseNumber=${this.houseNumber}, street=${this.street}, city=${this.city}, zip=${this.zip}, country=${this.country}, createdAt=${this.createdAt}, type=${this.type}]`;
    }
    // Static method to create a House instance from plain data
    static from({ id, houseNumber, street, city, zip, country, createdAt, type, }) {
        return new House(id, houseNumber, street, city, zip, type, country || "Belgium", createdAt || new Date());
    }
}
exports.House = House;
