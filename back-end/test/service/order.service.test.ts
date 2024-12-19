import orderService from "../../service/order.service";
import OrderDb from "../../repository/Order.db";
import CustomerDb from "../../repository/Customer.db";
import HouseDb from "../../repository/House.db";
import RoomDb from "../../repository/Room.db";
import { prepOrderDto } from "../../types";
import roomService from "../../service/room.service";

jest.mock("../../repository/Order.db");
jest.mock("../../repository/Customer.db");
jest.mock("../../repository/House.db");
jest.mock("../../repository/Room.db");

const mockOrder = {
    id: 1,
    customer: { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
    house: { id: 1, houseNumber: "1", street: "Main St", city: "City", zip: "12345", country: "Country", type: "detached" },
    orderDate: new Date(),
    startDate: new Date(),
    price: 1000,
    status: "pending",
    employees: [{ id: 1, email: "john.doe@example.com", firstName: "John", lastName: "Doe" }],
    rooms: []
};

const mockCustomer = { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com" };
const mockHouse = { id: 1, houseNumber: "1", street: "Main St", city: "City", zip: "12345", country: "Country", type: "detached" };
const mockRoom = {
    id: 1,
    name: "Living Room",
    workDescription: "Painting",
    order: mockOrder,
    house: mockOrder.house
};

beforeEach(() => {
    jest.clearAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
});

test("getOrderByCustomerEmail should return orders for a given customer email", async () => {
    roomService.getRoomsByEmail = jest.fn().mockResolvedValue([mockRoom]);

    const result = await orderService.getOrderByCustomerEmail("john.doe@example.com");

    expect(result).toEqual([{
        orderId: mockOrder.id,
        orderDate: mockOrder.orderDate,
        status: mockOrder.status,
        startDate: mockOrder.startDate,
        price: mockOrder.price,
        house: {
            id: mockOrder.house.id,
            country: mockOrder.house.country,
            houseNumber: mockOrder.house.houseNumber,
            street: mockOrder.house.street,
            city: mockOrder.house.city,
            zip: mockOrder.house.zip,
            type: mockOrder.house.type,
        },
        rooms: [{
            roomId: mockRoom.id,
            roomName: mockRoom.name,
            workDescription: mockRoom.workDescription,
        }]
    }]);
    expect(roomService.getRoomsByEmail).toHaveBeenCalledWith("john.doe@example.com");
});

test("getAllOrders should return all orders for admin role", async () => {
    OrderDb.getAllOrders = jest.fn().mockResolvedValue([mockOrder]);

    const result = await orderService.getAllOrders({ email: "admin@example.com", role: "admin" });

    expect(result).toEqual([mockOrder]);
    expect(OrderDb.getAllOrders).toHaveBeenCalledTimes(1);
});

test("getOrderById should return an order by ID", async () => {
    const mockRooms = [
        {
            id: 1,
            name: "Living Room",
            workDescription: "Painting",
            order: mockOrder,
            house: mockOrder.house
        },
        {
            id: 2,
            name: "Bedroom",
            workDescription: "Renovation",
            order: mockOrder,
            house: mockOrder.house
        }
    ];

    OrderDb.getOrderById = jest.fn().mockResolvedValue(mockRooms);

    const result = await orderService.getOrderById(1);

    const expectedOrder = {
        orderId: mockOrder.id,
        orderDate: mockOrder.orderDate,
        status: mockOrder.status,
        startDate: mockOrder.startDate,
        price: mockOrder.price,
        house: {
            id: mockOrder.house.id,
            country: mockOrder.house.country,
            houseNumber: mockOrder.house.houseNumber,
            street: mockOrder.house.street,
            city: mockOrder.house.city,
            zip: mockOrder.house.zip,
            type: mockOrder.house.type,
        },
        rooms: mockRooms.map(room => ({
            id: room.id,
            name: room.name,
            workDescription: room.workDescription,
        })),
        customer: {
            firstName: mockOrder.customer.firstName,
            lastName: mockOrder.customer.lastName,
        },
        employees: mockOrder.employees.map(employee => ({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
        })),
    };

    expect(result).toEqual(expectedOrder);
    expect(OrderDb.getOrderById).toHaveBeenCalledWith(1);
});

test("createOrder should create a new order", async () => {
    const newOrder: prepOrderDto = {
        email: "john.doe@example.com",
        startDate: new Date(),
        budget: 1000,
        houseNumber: "1",
        street: "Main St",
        city: "City",
        zip: "12345",
        country: "Country",
        type: "detached",
        rooms: [{ roomName: "Living Room", workDescription: "Painting" }]
    };

    CustomerDb.getCustomerByEmail = jest.fn().mockResolvedValue({
        ...mockCustomer,
        getId: jest.fn().mockReturnValue(mockCustomer.id)
    });
    HouseDb.getHousesByCustomerId = jest.fn().mockResolvedValue([]);
    HouseDb.createHouse = jest.fn().mockResolvedValue({
        ...mockHouse,
        getId: jest.fn().mockReturnValue(mockHouse.id)
    });
    OrderDb.createOrder = jest.fn().mockResolvedValue({
        ...mockOrder,
        getId: jest.fn().mockReturnValue(mockOrder.id)
    });
    RoomDb.createRoom = jest.fn().mockResolvedValue({});

    const expectedOrder = {
        id: mockOrder.id,
        orderDate: mockOrder.orderDate,
        status: mockOrder.status,
        startDate: mockOrder.startDate,
        price: mockOrder.price,
        house: {
            id: mockOrder.house.id,
            country: mockOrder.house.country,
            houseNumber: mockOrder.house.houseNumber,
            street: mockOrder.house.street,
            city: mockOrder.house.city,
            zip: mockOrder.house.zip,
            type: mockOrder.house.type,
        },
        rooms: [],
        customer: {
            firstName: mockCustomer.firstName,
            lastName: mockCustomer.lastName,
            email: mockCustomer.email,
            id: mockCustomer.id,
        },
        employees: mockOrder.employees.map(employee => ({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            id: 1,
        })),
        getId: expect.any(Function),
    };

    const result = await orderService.createOrder(newOrder);

    expect(result).toEqual(expectedOrder);
    expect(CustomerDb.getCustomerByEmail).toHaveBeenCalledWith("john.doe@example.com");
    expect(HouseDb.createHouse).toHaveBeenCalledWith(expect.objectContaining({
        houseNumber: "1",
        street: "Main St",
        city: "City",
        zip: "12345",
        country: "Country",
        type: "detached"
    }));
    expect(OrderDb.createOrder).toHaveBeenCalledWith(mockCustomer.id, mockHouse.id, newOrder.startDate, newOrder.budget);
    expect(RoomDb.createRoom).toHaveBeenCalledWith(expect.objectContaining({
        roomName: "Living Room",
        workDescription: "Painting",
        houseId: mockHouse.id,
        startDate: newOrder.startDate,
        budget: newOrder.budget,
        orderId: mockOrder.id
    }));
});

test("getOrdersByEmployeeEmail should return orders for a given employee email", async () => {
    const mockRooms = [
        {
            id: 1,
            name: "Living Room",
            workDescription: "Painting",
            house: mockOrder.house,
            order: mockOrder
        },
        {
            id: 2,
            name: "Bedroom",
            workDescription: "Renovation",
            house: mockOrder.house,
            order: mockOrder
        }
    ];

    OrderDb.getOrdersByEmployeeEmail = jest.fn().mockResolvedValue(mockRooms);

    const result = await orderService.getOrdersByEmployeeEmail("john.doe@example.com");

    const expectedOrder = {
        orderId: mockOrder.id,
        status: mockOrder.status,
        price: mockOrder.price,
        orderDate: mockOrder.orderDate,
        startDate: mockOrder.startDate,
        customer: {
            id: mockOrder.customer.id,
            firstName: mockOrder.customer.firstName,
            lastName: mockOrder.customer.lastName,
            email: mockOrder.customer.email,
        },
        employees: mockOrder.employees.map(employee => ({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
        })),
        house: {
            id: mockOrder.house.id,
            houseNumber: mockOrder.house.houseNumber,
            street: mockOrder.house.street,
            city: mockOrder.house.city,
            zip: mockOrder.house.zip,
            country: mockOrder.house.country,
            type: mockOrder.house.type
        },
        rooms: mockRooms.map(room => ({
            id: room.id,
            name: room.name,
            workDescription: room.workDescription,
        }))
    };

    expect(result).toEqual([expectedOrder]);
    expect(OrderDb.getOrdersByEmployeeEmail).toHaveBeenCalledWith("john.doe@example.com");
});

test("toggleEmployeeAssignment should remove an employee from an order if already assigned", async () => {
    const mockOrderWithEmployee = {
        ...mockOrder,
        employees: [{ id: 1, email: "john.doe@example.com", firstName: "John", lastName: "Doe" }]
    };

    orderService.getOrderById = jest.fn().mockResolvedValue(mockOrderWithEmployee);
    OrderDb.toggleEmployeeAssignment = jest.fn().mockResolvedValue({});

    const result = await orderService.toggleEmployeeAssignment(1, "john.doe@example.com");

    expect(result).toEqual({
        message: "Employee with email john.doe@example.com has been removed from the order.",
        action: "remove"
    });
    expect(OrderDb.toggleEmployeeAssignment).toHaveBeenCalledWith(1, "john.doe@example.com", "remove");
});

test("toggleEmployeeAssignment should add an employee to an order if not already assigned", async () => {
    const mockOrderWithoutEmployee = {
        ...mockOrder,
        employees: []
    };

    orderService.getOrderById = jest.fn().mockResolvedValue(mockOrderWithoutEmployee);
    OrderDb.toggleEmployeeAssignment = jest.fn().mockResolvedValue({});

    const result = await orderService.toggleEmployeeAssignment(1, "new.employee@example.com");

    expect(result).toEqual({
        message: "Employee with email new.employee@example.com has been added to the order.",
        action: "add"
    });
    expect(OrderDb.toggleEmployeeAssignment).toHaveBeenCalledWith(1, "new.employee@example.com", "add");
});

test("deleteOrder should delete an order by ID", async () => {
    OrderDb.deleteOrder = jest.fn().mockResolvedValue("Successfully deleted order with ID 1");

    const result = await orderService.deleteOrder(1);

    expect(result).toEqual("Successfully deleted order with ID 1");
    expect(OrderDb.deleteOrder).toHaveBeenCalledWith(1);
});

test("modifyOrderStatus should update the status of an order", async () => {
    const updatedOrder = { ...mockOrder, status: "completed" };
    OrderDb.modifyOrderStatus = jest.fn().mockResolvedValue(updatedOrder);

    const result = await orderService.modifyOrderStatus(1, "completed");

    expect(result).toEqual(updatedOrder);
    expect(OrderDb.modifyOrderStatus).toHaveBeenCalledWith(1, "completed");
});