import { Customer } from "../../model/customer";
import { Order } from "../../model/order";
import OrderDb from "../../repository/Order.db";
import houseService from "../../service/house.service";
import orderService from "../../service/order.service";
import { modifyOrderById, orderInput, orderInputWithHouseId } from "../../types";
import { House } from "../../model/house";

// Mocking the dependencies
jest.mock("../../repository/Order.db");
jest.mock("../../service/house.service");

describe("Order Service", () => {
    const mockOrderData: orderInput = {
        customerId: 1,
        startDate: new Date(),
        orderDate: new Date(),
        price: 1000,
        house: { address: "123 Main St", type: "apartment" }
    };

    const mockHouseId = 2;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should get all orders", async () => {
        const mockCustomer = new Customer(1, "Jane", "Doe", "jane.doe@example.com", "securePassword");
        const mockHouse = new House(mockHouseId, "123 Main St", "apartment");
        const mockOrders: Order[] = [
            new Order(1, mockCustomer, new Date(), new Date(), 1000, mockHouse)
        ];
        (OrderDb.getAllOrders as jest.Mock).mockReturnValue(mockOrders);

        const orders = await orderService.getAllOrders();
        expect(orders).toEqual(mockOrders);
        expect(OrderDb.getAllOrders).toHaveBeenCalledTimes(1);
    });

    test("should create a new order", async () => {
        const mockCustomer = new Customer(1, "Jane", "Doe", "jane.doe@example.com", "securePassword");
        const mockHouse = new House(mockHouseId, "123 Main St", "apartment");
        (houseService.addHouse as jest.Mock).mockResolvedValue(mockHouse);
        const mockNewOrder: orderInputWithHouseId = { ...mockOrderData, houseId: mockHouseId };
        (OrderDb.addOrder as jest.Mock).mockResolvedValue(new Order(1, mockCustomer, mockOrderData.orderDate, mockOrderData.startDate, mockOrderData.price, mockHouse));

        const newOrder = await orderService.createOrder(mockOrderData);
        expect(newOrder).toBeInstanceOf(Order);
        expect(newOrder.getCustomer().getId()).toBe(mockOrderData.customerId);
        expect(OrderDb.addOrder).toHaveBeenCalledWith(mockNewOrder);
        expect(houseService.addHouse).toHaveBeenCalledWith(mockOrderData.house.address, mockOrderData.house.type);
    });

    test("should modify an existing order by ID", async () => {
        const mockCustomer = new Customer(1, "Jane", "Doe", "jane.doe@example.com", "securePassword");
        const originalOrder = new Order(1, mockCustomer, new Date(), new Date(), 1000, new House(mockHouseId, "123 Main St", "apartment"));
        
        // Mocking existing orders in OrderDb
        (OrderDb.getAllOrders as jest.Mock).mockReturnValue([originalOrder]);
    
        const orderDataToUpdate: modifyOrderById = {
            orderId: 1,
            orderDate: new Date(),
            startDate: new Date(),
            price: 1200,
            house: { address: "123 Main St", type: "apartment" } // Example house input
        };
    
        // Mock the modifyOrderById method
        (OrderDb.modifyOrderById as jest.Mock).mockReturnValue(new Order(1, mockCustomer, orderDataToUpdate.orderDate, orderDataToUpdate.startDate, orderDataToUpdate.price, new House(mockHouseId, "123 Main St", "apartment")));
    
        const updatedOrder = await orderService.modifyOrderById(orderDataToUpdate);
    
        // Check if updatedOrder is not undefined
        expect(updatedOrder).toBeDefined();
        if (updatedOrder) {
            expect(updatedOrder).toBeInstanceOf(Order);
            expect(updatedOrder.getPrice()).toBe(1200);
        }
        expect(OrderDb.modifyOrderById).toHaveBeenCalledWith(orderDataToUpdate);
    });
});
