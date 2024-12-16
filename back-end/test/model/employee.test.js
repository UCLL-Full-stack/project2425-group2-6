"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../../model/employee");
const id = 1;
const firstName = "Jane";
const lastName = "Doe";
const email = "jane.doe@example.com";
const password = "password123";
const experience = 5;
const domain = "Engineering";
const licenseType = "B";
const employee = new employee_1.Employee(id, firstName, lastName, email, password, experience, domain, licenseType);
test("Create an employee", () => {
    expect(employee.getId()).toBe(id);
    expect(employee.getFirstName()).toBe(firstName);
    expect(employee.getLastName()).toBe(lastName);
    expect(employee.getEmail()).toBe(email);
    expect(employee.getPassword()).toBe(password);
    expect(employee.getExperience()).toBe(experience);
    expect(employee.getDomain()).toBe(domain);
    expect(employee.getLicenseType()).toBe(licenseType);
});
test('given: invalid firstName, when: setFirstName, then: throw error', () => {
    const employee = () => new employee_1.Employee(id, "", lastName, email, password, experience, domain, licenseType);
    expect(employee).toThrow("First name must not be blank and must be at least 2 characters long.");
});
test('given: invalid lastName, when: setLastName, then: throw error', () => {
    const employee = () => new employee_1.Employee(id, firstName, "", email, password, experience, domain, licenseType);
    expect(employee).toThrow("Last name must not be blank and must be at least 2 characters long.");
});
test('given: invalid email, when: setEmail, then: throw error', () => {
    const employee = () => new employee_1.Employee(id, firstName, lastName, "invalid-email", password, experience, domain, licenseType);
    expect(employee).toThrow("Invalid email format.");
});
test('given: invalid password, when: setPassword, then: throw error', () => {
    const employee = () => new employee_1.Employee(id, firstName, lastName, email, "short", experience, domain, licenseType);
    expect(employee).toThrow("Password must be at least 8 characters long.");
});
test('given: invalid experience, when: setExperience, then: throw error', () => {
    const employee = () => new employee_1.Employee(id, firstName, lastName, email, password, -1, domain, licenseType);
    expect(employee).toThrow("Experience must be a non-negative number.");
});
test('given: invalid domain, when: setDomain, then: throw error', () => {
    const employee = () => new employee_1.Employee(id, firstName, lastName, email, password, experience, "", licenseType);
    expect(employee).toThrow("Domain must not be empty.");
});
test('given: invalid licenseType, when: setLicenseType, then: throw error', () => {
    const employee = () => new employee_1.Employee(id, firstName, lastName, email, password, experience, domain, "");
    expect(employee).toThrow("License type must not be empty.");
});
