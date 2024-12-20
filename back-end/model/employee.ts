
import {
    Employee as EmployeePrisma  
} from '@prisma/client';
import { Role } from '../types';
export class Employee {
    private id?: number;
    private firstName?: string;
    private lastName?: string;
    private email?: string;
    private birthday?: Date;
    private password?: string;
    private role? : Role = "worker";
    private experience: number = 1;
    private domain?: string;
    private licenseType?: string;
    private workPosition: string = "worker";
    private createdOn: Date = new Date();

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role : Role,
        experience: number,
        domain: string,
        licenseType: string,
        createdOn: Date,
        id?: number,
    ) {
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setBirthday(new Date());  // Default to current date
        this.setPassword(password);
        this.setRole(role);
        this.setExperience(experience);
        this.setDomain(domain);
        this.setLicenseType(licenseType);
        this.setCreatedOn(createdOn);
        this.setId(id);
    }

    public getRole(): string {
        return this.role as string;
    }

    public setRole(role: Role) {
        if (!role.toLowerCase() || role.trim().length === 0 || role === undefined || role === null) {
            throw new Error("Role must not be empty.");
        }

        if (role.toLowerCase() !== "worker" && role.toLowerCase() !== "admin") {
            throw new Error("Role must be either worker or admin.");
        }

        if (role.toLowerCase() === "worker" || role.toLowerCase() === "admin") {
            this.role = role.toLowerCase() as Role;
        }

    }

    public setFirstName(firstName: string) {
        if (!firstName || firstName.trim().length < 2) {
            throw new Error("First name must not be blank and must be at least 2 characters long.");
        }
        this.firstName = firstName.trim();
    }

    public getFirstName(): string {
        return this.firstName? this.firstName : "";
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
        if (!password || password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }
        this.password = password;
    }

    public getPassword(): string {
        return this.password!;
    }

    public setBirthday(birthday: Date) {
        if (!birthday){
            throw new Error("Birthday must not be empty.");
        }


        this.birthday = birthday
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

    public setExperience(experience: number) {
        if (experience < 0) {
            throw new Error("Experience must be a non-negative number.");
        }
        this.experience = experience;
    }

    public getExperience(): number {
        return this.experience;
    }

    public setDomain(domain: string) {
        if (!domain || domain.trim().length === 0) {
            throw new Error("Domain must not be empty.");
        }
        this.domain = domain;
    }

    public getDomain(): string {
        return this.domain!;
    }

    public setLicenseType(licenseType: string) {
        if (!licenseType || licenseType.trim().length === 0) {
            throw new Error("License type must not be empty.");
        }
        this.licenseType = licenseType;
    }

    public getLicenseType(): string {
        if (!this.licenseType) {
            throw new Error("License type must not be empty.");
        }

        return this.licenseType;
    }

    public setWorkPosition(position: string) {
        if (!position || position.trim().length === 0) {
            throw new Error("Work position must not be empty.");
        }
        this.workPosition = position;
    }

    public getWorkPosition(): string {
        return this.workPosition;
    }

    public setCreatedOn(createdOn: Date) {
        if (!createdOn || isNaN(createdOn.getTime())) {
            throw new Error("Created must be a valid date.");
        }
        this.createdOn = createdOn;
    }

    public getCreatedOn(): Date {
        return this.createdOn;
    }

    public toString(): string {
        return `Employee [id=${this.id}, name=${this.firstName} ${this.lastName}, email=${this.email}, experience=${this.experience}, domain=${this.domain}, licenseType=${this.licenseType}, workPosition=${this.workPosition}]`;
    }

    static from ({
        id,
        firstName,
        lastName,
        email,
        birthday,
        password,
        role,
        experience,
        domain,
        licenseType,
        workPosition,
        createdOn
    } : EmployeePrisma ) {
        return new Employee(
            firstName,
            lastName,
            email,
            password,
            role as Role,
            experience,
            domain,
            licenseType,
            createdOn,
            id,
        );
    }
}
