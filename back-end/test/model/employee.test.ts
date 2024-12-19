import { Employee } from "../../model/employee";
import { Role } from "../../types";

const id = 1;
const firstName = "Jane";
const lastName = "Doe";
const email = "jane.doe@example.com";
const password = "password123";
const experience = 5;
const domain = "Engineering";
const licenseType = "B";
const role: Role = "worker";
const createdOn = new Date();

const employee = new Employee(firstName, lastName, email, password, role, experience, domain, licenseType, createdOn, id);

test("Create an employee", () => {
  expect(employee.getId()).toBe(id);
  expect(employee.getFirstName()).toBe(firstName);
  expect(employee.getLastName()).toBe(lastName);
  expect(employee.getEmail()).toBe(email);
  expect(employee.getPassword()).toBe(password);
  expect(employee.getExperience()).toBe(experience);
  expect(employee.getDomain()).toBe(domain);
  expect(employee.getLicenseType()).toBe(licenseType);
  expect(employee.getRole()).toBe(role);
  expect(employee.getCreatedOn()).toBe(createdOn);
});

test('given: invalid firstName, when: setFirstName, then: throw error', () => {
  expect(() => new Employee("", lastName, email, password, role, experience, domain, licenseType, createdOn)).toThrow("First name must not be blank and must be at least 2 characters long.");
});

test('given: invalid lastName, when: setLastName, then: throw error', () => {
  expect(() => new Employee(firstName, "", email, password, role, experience, domain, licenseType, createdOn)).toThrow("Last name must not be blank and must be at least 2 characters long.");
});

test('given: invalid email, when: setEmail, then: throw error', () => {
  expect(() => new Employee(firstName, lastName, "invalid-email", password, role, experience, domain, licenseType, createdOn)).toThrow("Invalid email format.");
});

test('given: invalid password, when: setPassword, then: throw error', () => {
  expect(() => new Employee(firstName, lastName, email, "", role, experience, domain, licenseType, createdOn)).toThrow("Password must be at least 8 characters long.");
});

test('given: invalid experience, when: setExperience, then: throw error', () => {
  expect(() => new Employee(firstName, lastName, email, password, role, -1, domain, licenseType, createdOn)).toThrow("Experience must be a non-negative number.");
});

test('given: invalid domain, when: setDomain, then: throw error', () => {
  expect(() => new Employee(firstName, lastName, email, password, role, experience, "", licenseType, createdOn)).toThrow("Domain must not be empty.");
});

test('given: invalid licenseType, when: setLicenseType, then: throw error', () => {
  expect(() => new Employee(firstName, lastName, email, password, role, experience, domain, "", createdOn)).toThrow("License type must not be empty.");
});

test('given: invalid createdOn, when: setCreatedOn, then: throw error', () => {
  expect(() => new Employee(firstName, lastName, email, password, role, experience, domain, licenseType, new Date("invalid-date"))).toThrow("Created must be a valid date.");
});

test('given: invalid id, when: setId, then: throw error', () => {
  expect(() => new Employee(firstName, lastName, email, password, role, experience, domain, licenseType, createdOn, -1)).toThrow("ID must be greater than 0.");
});