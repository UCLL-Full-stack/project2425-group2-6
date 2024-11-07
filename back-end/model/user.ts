export class User {
    private id?: number;
    private firstName?: string;
    private lastName?: string;
    private email?: string;
    private birthday?: Date;
    private isEmployee?: boolean = false;
    private password?: string;

    constructor(id: number, firstName: string, lastName: string, email: string, birthday: Date, isEmployee: boolean, password: string) {
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setbirthday(birthday);
        this.setIsEmployee(isEmployee);
        this.setPassword(password);
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

    public setbirthday(birthday: Date) {
        if (!birthday || isNaN(birthday.getTime())) {
            throw new Error("Birth date is required and must be a valid date.");
        }
        this.birthday = birthday;
    }

    public getbirthday(): Date {
        return this.birthday!;
    }

    public setIsEmployee(employee: boolean) {
        if (employee === undefined || employee === null) {
            throw new Error("Employee status must be provided.");
        }
        this.isEmployee = employee;
    }

    public getIsEmployee(): boolean {
        return this.isEmployee!;
    }

    public setId(id: number) {
        if (!id || id <= 0) {
            throw new Error("ID must be a positive number.");
        }
        this.id = id;
    }

    public getId(): number {
        return this.id!;
    }

    public toString(): string {
        return `User [id=${this.id}, firstName=${this.firstName}, lastName=${this.lastName}, email=${this.email}, birthday=${this.birthday}, employee=${this.isEmployee}]`;
    }
}
