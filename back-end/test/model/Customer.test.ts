import { Customer } from "../../model/customer";


describe('Customer Class', () => {
    let customer: Customer;

    beforeEach(() => {
        customer = new Customer(1, "John", "Doe", "john.doe@example.com", "securePassword123");
    });

    // Happy Path Tests
    test('should create a Customer instance with valid properties', () => {
        expect(customer.getId()).toBe(1);
        expect(customer.getFirstName()).toBe("John");
        expect(customer.getLastName()).toBe("Doe");
        expect(customer.getEmail()).toBe("john.doe@example.com");
        expect(customer.getPassword()).toBe("securePassword123");
    });

    test('should update firstName with valid input', () => {
        customer.setFirstName("Jane");
        expect(customer.getFirstName()).toBe("Jane");
    });

    test('should update lastName with valid input', () => {
        customer.setLastName("Smith");
        expect(customer.getLastName()).toBe("Smith");
    });

    test('should update email with valid input', () => {
        customer.setEmail("jane.smith@example.com");
        expect(customer.getEmail()).toBe("jane.smith@example.com");
    });

    test('should update password with valid input', () => {
        customer.setPassword("newSecurePassword123");
        expect(customer.getPassword()).toBe("newSecurePassword123");
    });

    // Unhappy Path Tests
    test('should throw error if setting firstName to an empty string', () => {
        expect(() => customer.setFirstName("")).toThrow("First name must not be blank and must be at least 2 characters long.");
    });

    test('should throw error if setting lastName to an empty string', () => {
        expect(() => customer.setLastName("")).toThrow("Last name must not be blank and must be at least 2 characters long.");
    });

    test('should throw error if setting email to an invalid format', () => {
        expect(() => customer.setEmail("invalid-email")).toThrow("Invalid email format.");
    });

    test('should throw error if setting password to less than 8 characters', () => {
        expect(() => customer.setPassword("short")).toThrow("Password must be at least 8 characters long.");
    });

    test('should throw error if ID is set to a non-positive number', () => {
        expect(() => customer.setId(-1)).toThrow("ID must be a positive number.");
    });

    test('should throw error if setting email to empty', () => {
        expect(() => customer.setEmail("")).toThrow("Invalid email format.");
    });
});
