import { Room } from "./room";
import { Tool } from "./tool";
import { User } from "./user";
import { Vehicle } from "./vehicle";

export class Employee extends User {
    private experience: number = 1;
    private domain?: string;
    private licenseType?: string;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        experience: number,
        domain: string,
        licenseType: string
    ) {
        super(id, firstName, lastName, email, new Date(), true, password);
        this.setExperience(experience);
        this.setDomain(domain);
        this.setLicenseType(licenseType);
    }

    public getExperience(): number {
        return this.experience;
    }

    public setExperience(experience: number) {
        if (experience < 0) {
            throw new Error("Experience must be a non-negative number.");
        }
        this.experience = experience;
    }

    public getDomain(): string {
        return this.domain!;
    }

    public setDomain(domain: string) {
        if (!domain || domain.trim().length === 0) {
            throw new Error("Domain must not be empty.");
        }
        this.domain = domain;
    }

    public getLicenseType(): string {
        return this.licenseType!;
    }

    public setLicenseType(licenseType: string) {
        if (!licenseType || licenseType.trim().length === 0) {
            throw new Error("License type must not be empty.");
        }
        this.licenseType = licenseType;
    }

    public toString(): string {
        return `Employee [id=${this.getId()}, name=${this.getFirstName()} ${this.getLastName()}, email=${this.getEmail()}, experience=${this.experience}, domain=${this.domain}, licenseType=${this.licenseType}]`;
    }
}
