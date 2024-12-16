
import {
    Customer as CustomerPrisma
} from '@prisma/client';

import { Role } from '../types';

export class Customer {
    private id?: number;
    private firstName!: string;
    private lastName!: string;
    private email!: string;
    private birthday!: Date;
    private password!: string;
    private createdAt?: Date;
    private role? : Role = 'customer';

    constructor(firstName: string, lastName: string, email: string, birthday: Date, password: string, createdAt?: Date, id?: number, ) {
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setBirthday(birthday);
        this.setPassword(password);
        this.setCreatedAt(createdAt);
    }

    public getRole(): string {
        return this.role as string;
    }

    public setFirstName(firstName: string) {
        if (!firstName || firstName.trim().length < 2) {
            throw new Error("First name must not be blank and must be at least 2 characters long.");
        }
        this.firstName = firstName.trim();
    }

    public getFirstName(): string {
        return this.firstName!;
    }

    public setLastName(lastName: string) {
        if (!lastName || lastName.trim().length < 2) {
            throw new Error("Last name must not be blank and must be at least 2 characters long.");
        }
        this.lastName = lastName.trim();
    }

    public getLastName(): string {
        return this.lastName!;
    }

    public getCreatedAt(): Date {
        return this.createdAt!;
    }   

    public setCreatedAt(createdAt: Date | undefined) {
        if (!createdAt || isNaN(createdAt.getTime())) {
            throw new Error("Created at is required and must be a valid date.");
        }
        this.createdAt = createdAt;
    }

    public setEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        this.email = email.trim();
    }

    public getEmail(): string {
        return this.email!;
    }

    public setPassword(password: string) {
        if (!password?.trim()) {
            throw new Error("Password cannot be empty!");
        }
        this.password = password;
    }

    public getPassword(): string {
        return this.password!;
    }

    public setBirthday(birthday: Date) {
        this.birthday = birthday;
    }

    public getBirthday(): Date {
        return this.birthday!;
    }

    public setId(id: number | undefined) {

        if (id == undefined) {
            return;
        }

        if (id != undefined){
            if (id <= 0) {
                throw new Error("ID must be greater than 0.");
            }
        }

        if (id != undefined && id > 0) {
            this.id = id;
        }
    }

    public getId(): number {
        return this.id!;
    }

    public toString(): string {
        return `Customer [id=${this.id}, name=${this.firstName} ${this.lastName}, email=${this.email}]`;
    }

    static from ({
        id,
        firstName,
        lastName,
        email,
        role,
        birthday,
        password,
        createdAt
    }: CustomerPrisma) {
        return new Customer(firstName, lastName, email, birthday, password, createdAt, id);
    }
}
