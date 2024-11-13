import { Order } from "../../model/order";
import { Address } from "../../model/address";
import { House } from "../../model/house";
import { Room } from "../../model/room";
import { Customer } from "../../model/customer";
import orderService from "../../service/order.service";
import OrderDb from "../../repository/Order.db";
import { createAddressDto, createHouseDto, createOrderDto, createRoomDto } from "../../types";

jest.mock("../../repository/Order.db");

const address = new Address(1, 1, "Rue de la Loi", "Brussels", "Brussels Capital", "1000");
const house = new House(1, address, "detached");
const customer = new Customer(1, "John", "Doe", "johndoe@gmail.com", new Date("1990-01-01"), "password123");
const order = new Order(1, customer, new Date(), new Date(), 1000, house);

const newAddress: createAddressDto = {
    houseNumber: 2,
    street: "Avenue Louise",
    city: "Brussels",
    state: "Brussels Capital",
    zip: "1050"
};

const newHouse: createHouseDto = {
    addressId: 1,
    type: "semi-detached"
};

const newOrder: createOrderDto = {
    customerId: 1,
    startDate: new Date("01-01-2027"),
    price: 2000,
    orderDate: new Date("11-13-2024"),
    houseId: 6
};

const newRoom: createRoomDto = {
    houseId: 1,
    name: "Bedroom",
    workDescription: "Cleaning"
};

let mockOrderGetAllOrders: jest.Mock;
let mockOrderGetOrderById: jest.Mock;
let mockOrderAddOrder: jest.Mock;

beforeEach(() => {
    mockOrderGetAllOrders = jest.fn().mockResolvedValue([order]);
    mockOrderGetOrderById = jest.fn().mockResolvedValue(order);
    mockOrderAddOrder = jest.fn().mockResolvedValue(order);

    OrderDb.getAllOrders = mockOrderGetAllOrders;
    OrderDb.getOrderById = mockOrderGetOrderById;
    OrderDb.addOrder = mockOrderAddOrder;
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given: valid Order, when: getAllOrders, then: return all orders", async () => {
    const result = await orderService.getAllOrders();

    expect(result).toEqual([order]);
    expect(mockOrderGetAllOrders).toHaveBeenCalledTimes(1);
});

test("given: valid id, when: getOrderById, then: return order with given id", async () => {
    const result = await orderService.getOrderById(1);

    expect(result).toEqual(order);
    expect(mockOrderGetOrderById).toHaveBeenCalledWith(1);
    expect(mockOrderGetOrderById).toHaveBeenCalledTimes(1);
});

test("given: valid Order, when: addOrder, then: add order", async () => {
    const result = await orderService.addOrder(newAddress, [newRoom], newHouse, newOrder);

    expect(result).toEqual(order);
    expect(mockOrderAddOrder).toHaveBeenCalledWith(expect.objectContaining({
        customerId: newOrder.customerId,
        orderDate: expect.any(Date),
        startDate: expect.any(Date),
        price: newOrder.price,
        houseId: expect.any(Number)
    }));
    expect(mockOrderAddOrder).toHaveBeenCalledTimes(1);
});