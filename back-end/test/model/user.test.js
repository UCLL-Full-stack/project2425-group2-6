"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../model/user");
const userId = 1;
const firstName = "John";
const lastName = "Doe";
const email = "john.doe@example.com";
const birthday = new Date("1990-01-01");
const isEmployee = false;
const password = "password123";
const user = new user_1.User(userId, firstName, lastName, email, birthday, isEmployee, password);
test("Create a user", () => {
    expect(user.getId()).toBe(userId);
    expect(user.getFirstName()).toBe(firstName);
    expect(user.getLastName()).toBe(lastName);
    expect(user.getEmail()).toBe(email);
    expect(user.getbirthday()).toBe(birthday);
    expect(user.getIsEmployee()).toBe(isEmployee);
    expect(user.getPassword()).toBe(password);
});
test('given: invalid firstName, when: setFirstName, then: throw error', () => {
    expect(() => {
        user.setFirstName("");
    }).toThrow("First name must not be blank and must be at least 2 characters long.");
});
test('given: valid firstName, when: setFirstName, then: set firstName', () => {
    user.setFirstName("Jane");
    expect(user.getFirstName()).toBe("Jane");
});
test('given: invalid lastName, when: setLastName, then: throw error', () => {
    expect(() => {
        user.setLastName("");
    }).toThrow("Last name must not be blank and must be at least 2 characters long.");
});
test('given: valid lastName, when: setLastName, then: set lastName', () => {
    user.setLastName("Smith");
    expect(user.getLastName()).toBe("Smith");
});
test('given: invalid email, when: setEmail, then: throw error', () => {
    expect(() => {
        user.setEmail("invalid-email");
    }).toThrow("Invalid email format.");
});
test('given: valid email, when: setEmail, then: set email', () => {
    user.setEmail("jane.smith@example.com");
    expect(user.getEmail()).toBe("jane.smith@example.com");
});
test('given: invalid password, when: setPassword, then: throw error', () => {
    expect(() => {
        user.setPassword("short");
    }).toThrow("Password must be at least 8 characters long.");
});
test('given: valid password, when: setPassword, then: set password', () => {
    user.setPassword("newpassword123");
    expect(user.getPassword()).toBe("newpassword123");
});
test('given: invalid birthday, when: setbirthday, then: throw error', () => {
    expect(() => {
        user.setbirthday(new Date("invalid-date"));
    }).toThrow("Birth date is required and must be a valid date.");
});
test('given: valid birthday, when: setbirthday, then: set birthday', () => {
    const newBirthday = new Date("1995-05-15");
    user.setbirthday(newBirthday);
    expect(user.getbirthday()).toBe(newBirthday);
});
test('given: invalid id, when: setId, then: throw error', () => {
    expect(() => {
        user.setId(-1);
    }).toThrow("ID must be a positive number.");
});
test('given: valid id, when: setId, then: set id', () => {
    user.setId(2);
    expect(user.getId()).toBe(2);
});
test('given: invalid isEmployee, when: setIsEmployee, then: throw error', () => {
    expect(() => {
        user.setIsEmployee(null);
    }).toThrow("Employee status must be provided.");
});
test('given: valid isEmployee, when: setIsEmployee, then: set isEmployee', () => {
    user.setIsEmployee(true);
    expect(user.getIsEmployee()).toBe(true);
});
