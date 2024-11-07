import { User } from "./user";

export class Customer extends User {
    constructor(id: number, firstName: string, lastName: string, email: string, birthday: Date, password: string) {
        super(id, firstName, lastName, email, birthday, false, password);
    }

    public toString(): string {
        return `Customer [id=${this.getId()}, name=${this.getFirstName()} ${this.getLastName()}, email=${this.getEmail()}]`;
    }
}
