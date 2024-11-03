import { Customer } from "../../model/customer";
import { House } from "../../model/house";
import { Order } from "../../model/order";

describe('Order Class', () => {
    let order: Order;
    let customer: Customer;
    let house: House;

    beforeEach(() => {
        customer = new Customer(1, "Jane", "Doe", "jane.doe@example.com", "securePassword123");
        house = new House(1, "123 Main St", "apartment"); 
        order = new Order(1, customer, new Date(), new Date(Date.now() + 86400000), 1000, house); // Order date is today, start date is tomorrow
    });

    // Happy Path Tests
    test('should create an Order instance with valid properties', () => {
        expect(order.getId()).toBe(1);
        expect(order.getCustomer()).toBe(customer);
        expect(order.getPrice()).toBe(1000);
        expect(order.getHouse()).toBe(house);
    });

    test('should update orderDate with today\'s date', () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight
        order.setOrderDate(today);
        expect(order.getOrderDate()).toEqual(today);
    });

    test('should update orderDate with a past date', () => {
        const pastDate = new Date(Date.now() - 86400000); // Yesterday
        order.setOrderDate(pastDate);
        expect(order.getOrderDate()).toEqual(pastDate);
    });

    test('should throw error if setting orderDate to a future date', () => {
        const futureDate = new Date(Date.now() + 86400000); // Tomorrow
        expect(() => order.setOrderDate(futureDate)).toThrow("Order date cannot be in the future.");
    });

    test('should update startDate with valid future input', () => {
        const futureStartDate = new Date(Date.now() + 172800000); // Two days later
        order.setStartDate(futureStartDate);
        expect(order.getStartDate()).toEqual(futureStartDate);
    });

    test('should throw error if setting startDate to today', () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight
        expect(() => order.setStartDate(today)).toThrow("Start date must be in the future.");
    });

    test('should throw error if setting startDate to a past date', () => {
        const pastDate = new Date(Date.now() - 86400000); // Yesterday
        expect(() => order.setStartDate(pastDate)).toThrow("Start date must be in the future.");
    });
});
