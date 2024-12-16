"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../model/order");
const address_1 = require("../../model/address");
const house_1 = require("../../model/house");
const customer_1 = require("../../model/customer");
const order_service_1 = __importDefault(require("../../service/order.service"));
const Order_db_1 = __importDefault(require("../../repository/Order.db"));
jest.mock("../../repository/Order.db");
const address = new address_1.Address(1, 1, "Rue de la Loi", "Brussels", "Brussels Capital", "1000");
const house = new house_1.House(1, address, "detached");
const customer = new customer_1.Customer(1, "John", "Doe", "johndoe@gmail.com", new Date("1990-01-01"), "password123");
const order = new order_1.Order(1, customer, new Date(), new Date(), 1000, house);
const newAddress = {
    houseNumber: 2,
    street: "Avenue Louise",
    city: "Brussels",
    state: "Brussels Capital",
    zip: "1050"
};
const newHouse = {
    addressId: 1,
    type: "semi-detached"
};
const newOrder = {
    customerId: 1,
    startDate: new Date("01-01-2027"),
    price: 2000,
    orderDate: new Date("11-13-2024"),
    houseId: 6
};
const newRoom = {
    houseId: 1,
    name: "Bedroom",
    workDescription: "Cleaning"
};
let mockOrderGetAllOrders;
let mockOrderGetOrderById;
let mockOrderAddOrder;
beforeEach(() => {
    mockOrderGetAllOrders = jest.fn().mockResolvedValue([order]);
    mockOrderGetOrderById = jest.fn().mockResolvedValue(order);
    mockOrderAddOrder = jest.fn().mockResolvedValue(order);
    Order_db_1.default.getAllOrders = mockOrderGetAllOrders;
    Order_db_1.default.getOrderById = mockOrderGetOrderById;
    Order_db_1.default.addOrder = mockOrderAddOrder;
});
afterEach(() => {
    jest.clearAllMocks();
});
test("given: valid Order, when: getAllOrders, then: return all orders", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.default.getAllOrders();
    expect(result).toEqual([order]);
    expect(mockOrderGetAllOrders).toHaveBeenCalledTimes(1);
}));
test("given: valid id, when: getOrderById, then: return order with given id", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.default.getOrderById(1);
    expect(result).toEqual(order);
    expect(mockOrderGetOrderById).toHaveBeenCalledWith(1);
    expect(mockOrderGetOrderById).toHaveBeenCalledTimes(1);
}));
test("given: valid Order, when: addOrder, then: add order", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.default.addOrder(newAddress, [newRoom], newHouse, newOrder);
    expect(result).toEqual(order);
    expect(mockOrderAddOrder).toHaveBeenCalledWith(expect.objectContaining({
        customerId: newOrder.customerId,
        orderDate: expect.any(Date),
        startDate: expect.any(Date),
        price: newOrder.price,
        houseId: expect.any(Number)
    }));
    expect(mockOrderAddOrder).toHaveBeenCalledTimes(1);
}));
