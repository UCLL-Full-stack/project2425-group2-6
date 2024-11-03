export class House {
    private id!: number;
    private address!: string;
    private type!: string;

    constructor(id: number, address: string, type: string) {
        this.setId(id);
        this.setAddress(address);
        this.setType(type);
    }

    public setAddress(address: string): void {
        if (!address || address.trim().length < 5) { // Ensuring at least 5 characters
            throw new Error("Address must not be blank and should be at least 5 characters long.");
        }
        this.address = address.trim();
    }

    public setId(id: number): void {
        if (id <= 0) {
            throw new Error("ID must be a positive integer."); // This is the current message
        }
        this.id = id;
    }

    // Getters
    public getId(): number {
        return this.id;
    }

    public getAddress(): string {
        return this.address;
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
