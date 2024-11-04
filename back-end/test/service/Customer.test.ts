import { Customer } from "../../model/customer";
import { House } from "../../model/house";
import { Order } from "../../model/order";
import { CreateCustomerDto, LoginCustomerDto } from "../../types";
import CustomerDb from "../../repository/Customer.db";
import OrderDb from "../../repository/Order.db";
import CustomerService from "../../service/customer.service";

// Mocking the dependencies
jest.mock("../../repository/Customer.db");
jest.mock("../../repository/Order.db");

describe("Customer Service", () => {
    const mockCustomerData: Customer = new Customer(1, "John", "Doe", "john@example.com", "password123");
    const mockCustomers: Customer[] = [mockCustomerData];
    const mockOrders: Order[] = [new Order(1, mockCustomerData, new Date(), new Date(), 100, new House(10, "123 Main St", "apartment"))];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should get all customers", async () => {
        (CustomerDb.getAllCustomers as jest.Mock).mockResolvedValue(mockCustomers);
        
        const customers = await CustomerService.getAllCustomers();
        expect(customers).toEqual(mockCustomers);
        expect(CustomerDb.getAllCustomers).toHaveBeenCalledTimes(1);
    });

    test("should get customer by ID", async () => {
        (CustomerDb.getCustomerById as jest.Mock).mockResolvedValue(mockCustomerData);
        
        const customer = await CustomerService.getCustomerById(1);
        expect(customer).toEqual(mockCustomerData);
        expect(CustomerDb.getCustomerById).toHaveBeenCalledWith(1);
    });

    test("should throw an error for invalid ID format", async () => {
        await expect(CustomerService.getCustomerById(NaN)).rejects.toThrow("invalid format for id");
    });

    test("should get customer orders by customer ID", async () => {
        const futureDate = new Date(Date.now() + 86400000); // Tomorrow
        const mockOrders: Order[] = [new Order(1, mockCustomerData, futureDate, futureDate, 100, new House(10, "123 Main St", "apartment"))];
    
        (OrderDb.getAllOrders as jest.Mock).mockResolvedValue(mockOrders);
        
        const orders = await CustomerService.getCustomerOrderById(1);
        expect(orders).toEqual(mockOrders);
        expect(OrderDb.getAllOrders).toHaveBeenCalledTimes(1);
    });
    

    test("should create a customer", async () => {
        const customerData: CreateCustomerDto = {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane@example.com",
            password: "password456"
        };
        
        (CustomerDb.addCustomer as jest.Mock).mockResolvedValue(mockCustomerData);
        
        const customer = await CustomerService.createCustomer(customerData);
        expect(customer).toEqual(mockCustomerData);
        expect(CustomerDb.addCustomer).toHaveBeenCalledWith(
            customerData.firstName,
            customerData.lastName,
            customerData.email,
            customerData.password
        );
    });

    test("should sign in a customer with valid credentials", async () => {
        (CustomerDb.getAllCustomers as jest.Mock).mockResolvedValue(mockCustomers);
        
        const loginData: LoginCustomerDto = { email: "john@example.com", password: "password123" };
        const customer = await CustomerService.attemptSignin(loginData);
        
        expect(customer).toEqual(mockCustomerData);
    });

    test("should return an error for invalid email or password during sign in", async () => {
        (CustomerDb.getAllCustomers as jest.Mock).mockResolvedValue(mockCustomers);
        
        const loginData: LoginCustomerDto = { email: "wrong@example.com", password: "wrongPassword" };
        const customer = await CustomerService.attemptSignin(loginData);
        
        expect(customer).toBeInstanceOf(Error);
        expect((customer as Error).message).toBe("Invalid email or password");
    });

    test("should get customer index by ID", async () => {
        (CustomerDb.getAllCustomers as jest.Mock).mockResolvedValue(mockCustomers);
        
        const index = await CustomerService.getCustomerIndexById(1);
        expect(index).toBe(0);
    });

    test("should return -1 if customer ID does not exist", async () => {
        (CustomerDb.getAllCustomers as jest.Mock).mockResolvedValue(mockCustomers);
        
        const index = await CustomerService.getCustomerIndexById(2);
        expect(index).toBe(-1);
    });
});
