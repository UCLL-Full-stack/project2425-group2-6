"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(id, firstName, lastName, email, password, role, experience, domain, licenseType, createdOn) {
        this.role = "worker";
        this.experience = 1;
        this.workPosition = "worker";
        this.createdOn = new Date();
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setBirthday(new Date()); // Default to current date
        this.setPassword(password);
        this.setRole(role);
        this.setExperience(experience);
        this.setDomain(domain);
        this.setLicenseType(licenseType);
        this.setCreatedOn(createdOn);
    }
    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }
    setFirstName(firstName) {
        if (!firstName || firstName.trim().length < 2) {
            throw new Error("First name must not be blank and must be at least 2 characters long.");
        }
        this.firstName = firstName.trim();
    }
    getFirstName() {
        return this.firstName ? this.firstName : "";
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
        if (!password || password.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
        }
        this.password = password;
    }
    getPassword() {
        return this.password;
    }
    setBirthday(birthday) {
        if (!birthday || isNaN(birthday.getTime())) {
            throw new Error("Birth date is required and must be a valid date.");
        }
        this.birthday = birthday;
    }
    getBirthday() {
        return this.birthday;
    }
    setId(id) {
        if (!id || id <= 0) {
            throw new Error("ID must be a positive number.");
        }
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setExperience(experience) {
        if (experience < 0) {
            throw new Error("Experience must be a non-negative number.");
        }
        this.experience = experience;
    }
    getExperience() {
        return this.experience;
    }
    setDomain(domain) {
        if (!domain || domain.trim().length === 0) {
            throw new Error("Domain must not be empty.");
        }
        this.domain = domain;
    }
    getDomain() {
        return this.domain;
    }
    setLicenseType(licenseType) {
        if (!licenseType || licenseType.trim().length === 0) {
            throw new Error("License type must not be empty.");
        }
        this.licenseType = licenseType;
    }
    getLicenseType() {
        return this.licenseType;
    }
    setWorkPosition(position) {
        this.workPosition = position;
    }
    getWorkPosition() {
        return this.workPosition;
    }
    setCreatedOn(createdOn) {
        if (!createdOn || isNaN(createdOn.getTime())) {
            throw new Error("Created on date is required and must be a valid date.");
        }
        this.createdOn = createdOn;
    }
    getCreatedOn() {
        return this.createdOn;
    }
    toString() {
        return `Employee [id=${this.id}, name=${this.firstName} ${this.lastName}, email=${this.email}, experience=${this.experience}, domain=${this.domain}, licenseType=${this.licenseType}, workPosition=${this.workPosition}]`;
    }
    static from({ id, firstName, lastName, email, birthday, password, role, experience, domain, licenseType, workPosition, createdOn }) {
        return new Employee(id, firstName, lastName, email, password, role, experience, domain, licenseType, createdOn);
    }
}
exports.Employee = Employee;
