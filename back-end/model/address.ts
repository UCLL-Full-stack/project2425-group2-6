export class Address {
    private id!: number;
    private street!: string;
    private city!: string;
    private state!: string;
    private zip!: string;
    private houseNumber! : number;
    private country: string = "Belgium";

    constructor(id: number, houseNumber : number, street: string, city: string, state: string, zip: string) {
        this.setId(id);
        this.setHouseNumber(houseNumber);
        this.setStreet(street);
        this.setCity(city);
        this.setState(state);
        this.setZip(zip);
    }

    public setId(id: number): void {
        if (id <= 0) {
            throw new Error("ID must be a positive integer.");
        }
        this.id = id;
    }

    setHouseNumber(houseNumber: number) {
        this.houseNumber = houseNumber;
    }

    getHouseNumber() {
        return this.houseNumber;
    }

    public getId(): number {
        return this.id;
    }

    public getStreet(): string {
        return this.street;
    }

    public setStreet(street: string): void {
        if (!street) {
            throw new Error("Street must not be blank : " + street);
        }
        this.street = street.trim();
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        if (!city || city.trim().length < 3) {
            throw new Error("City must not be blank and should be at least 3 characters long.");
        }
        this.city = city.trim();
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string): void {
        if (!state) {
            throw new Error("State must not be blank and should be at least 3 characters long.");
        }
        this.state = state.trim();
    }

    public getZip(): string {
        return this.zip;
    }

    public setZip(zip: string): void {
        if (!zip || zip.trim().length < 4) {
            throw new Error("Zip code must not be blank and should be at least 4 characters long.");
        }
        this.zip = zip.trim();
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        if (!country || country.trim().length < 3) {
            throw new Error("Country must not be blank and should be at least 3 characters long.");
        }
        this.country = country.trim();
    }

    public toString(): string {
        return `Address [id=${this.id}, street=${this.street}, city=${this.city}, state=${this.state}, zip=${this.zip}, country=${this.country}]`;
    }
}