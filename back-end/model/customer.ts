export class Customer {
    private id!: number;
    private firstName!: string;
    private lastName!: string;
    private email!: string;
    private password!: string;

    constructor(id: number, firstName: string, lastName: string, email: string, password: string) {
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setPassword(password);
    }

    public getId(): number {
        return this.id;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getEmail(): string {
        return this.email;
    }
    
    public getPassword(): string {
        return this.password;
    }

    public setId(id: number) {
        if (id <= 0) {
            throw new Error("ID must be a positive number.");
        }
        this.id = id;
    }

    public setFirstName(firstName: string) {
        if (!firstName || firstName.trim().length < 2) {
            throw new Error("First name must not be blank and must be at least 2 characters long.");
        }
        this.firstName = firstName.trim();
    }

    public setLastName(lastName: string) {
        if (!lastName || lastName.trim().length < 2) {
            throw new Error("Last name must not be blank and must be at least 2 characters long.");
        }
        this.lastName = lastName.trim();
    }

    public setEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        this.email = email.trim();
    }

    public setPassword(password: string) {
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }
        this.password = password;
    }

    public toString(): string {
        return "Customer [id=" + this.id + ", name=" + `${this.firstName} ${this.lastName}` + ", email=" + this.email + "]";
    }
}
