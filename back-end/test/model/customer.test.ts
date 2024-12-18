import { Customer } from "../../model/customer";

const id = 1;
const firstName = "John";
const lastName = "Doe";
const email = "john.doe@example.com";
const birthday = new Date("1990-01-01");
const password = "password123";
const createdAt = new Date();

const customer = new Customer(firstName, lastName, email, birthday, password, createdAt, id);

test("Create a customer", () => {
  expect(customer.getId()).toBe(id);
  expect(customer.getFirstName()).toBe(firstName);
  expect(customer.getLastName()).toBe(lastName);
  expect(customer.getEmail()).toBe(email);
  expect(customer.getBirthday()).toBe(birthday);
  expect(customer.getCreatedAt()).toBe(createdAt);
  expect(customer.getRole()).toBe('customer');
});

test('given: invalid firstName, when: setFirstName, then: throw error', () => {
  expect(() => new Customer("", lastName, email, birthday, password)).toThrow("First name must not be blank and must be at least 2 characters long.");
});

test('given: invalid lastName, when: setLastName, then: throw error', () => {
  expect(() => new Customer(firstName, "", email, birthday, password)).toThrow("Last name must not be blank and must be at least 2 characters long.");
});

test('given: invalid email, when: setEmail, then: throw error', () => {
  expect(() => new Customer(firstName, lastName, "invalid-email", birthday, password)).toThrow("Invalid email format.");
});

test('given: invalid password, when: setPassword, then: throw error', () => {
  expect(() => new Customer(firstName, lastName, email, birthday, "")).toThrow("Password cannot be empty!");
});

test('given: invalid createdAt, when: setCreatedAt, then: throw error', () => {
  expect(() => new Customer(firstName, lastName, email, birthday, password, new Date("invalid-date"))).toThrow("Created at is required and must be a valid date.");
});

test('given: invalid id, when: setId, then: throw error', () => {
  expect(() => new Customer(firstName, lastName, email, birthday, password, createdAt, -1)).toThrow("ID must be greater than 0.");
});