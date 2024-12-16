"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(firstName, lastName, email, birthday, password, createdAt, id) {
        this.role = 'customer';
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setBirthday(birthday);
        this.setPassword(password);
        this.setCreatedAt(createdAt);
    }
    getRole() {
        return this.role;
    }
    setFirstName(firstName) {
        if (!firstName || firstName.trim().length < 2) {
            throw new Error("First name must not be blank and must be at least 2 characters long.");
        }
        this.firstName = firstName.trim();
    }
    getFirstName() {
        return this.firstName;
    }
    setLastName(lastName) {
        if (!lastName || lastName.trim().length < 2) {
            throw new Error("Last name must not be blank and must be at least 2 characters long.");
        }
        this.lastName = lastName.trim();
    }
    getLastName() {
        return this.lastName;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(createdAt) {
        if (!createdAt || isNaN(createdAt.getTime())) {
            throw new Error("Created at is required and must be a valid date.");
        }
        this.createdAt = createdAt;
    }
    setEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        this.email = email.trim();
    }
    getEmail() {
        return this.email;
    }
    setPassword(password) {
        if (!(password === null || password === void 0 ? void 0 : password.trim())) {
            throw new Error("Password cannot be empty!");
        }
        this.password = password;
    }
    getPassword() {
        return this.password;
    }
    setBirthday(birthday) {
        this.birthday = birthday;
    }
    getBirthday() {
        return this.birthday;
    }
    setId(id) {
        if (id == undefined) {
            return;
        }
        if (id != undefined) {
            if (id <= 0) {
                throw new Error("ID must be greater than 0.");
            }
        }
        if (id != undefined && id > 0) {
            this.id = id;
        }
    }
    getId() {
        return this.id;
    }
    toString() {
        return `Customer [id=${this.id}, name=${this.firstName} ${this.lastName}, email=${this.email}]`;
    }
    static from({ id, firstName, lastName, email, role, birthday, password, createdAt }) {
        return new Customer(firstName, lastName, email, birthday, password, createdAt, id);
    }
}
exports.Customer = Customer;
