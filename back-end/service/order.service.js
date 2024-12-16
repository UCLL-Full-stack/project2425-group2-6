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
const House_db_1 = __importDefault(require("../repository/House.db"));
const Order_db_1 = __importDefault(require("../repository/Order.db"));
const Customer_db_1 = __importDefault(require("../repository/Customer.db"));
const Room_db_1 = __importDefault(require("../repository/Room.db"));
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_db_1.default.getAllOrders();
    return orders;
});
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting createOrder function");
    const customer = yield Customer_db_1.default.getCustomerByEmail(order.email);
    console.log("Customer fetched:", customer);
    if (!customer) {
        throw new Error("Customer not found");
    }
    const houses = yield House_db_1.default.getHousesByCustomerId(customer.getId());
    console.log("Houses fetched for customer:", houses);
    let house;
    let houseExists = false;
    for (const houseItem of houses) {
        console.log(`Comparing ${houseItem.getHouseNumber()} with ${order.houseNumber}`);
        console.log(`Comparing ${houseItem.getStreet()} with ${order.street}`);
        console.log(`Comparing ${houseItem.getCity()} with ${order.city}`);
        console.log(`Comparing ${houseItem.getZip()} with ${order.zip}`);
        console.log(`Comparing ${houseItem.getCountry()} with ${order.country}`);
        console.log(`Comparing ${houseItem.getType()} with ${order.type}`);
        if (houseItem.getHouseNumber() == order.houseNumber &&
            houseItem.getStreet() == order.street &&
            houseItem.getCity() == order.city &&
            houseItem.getZip() == order.zip &&
            houseItem.getCountry() == order.country &&
            houseItem.getType() == order.type) {
            house = houseItem;
            houseExists = true;
            console.log("Matching house found:", house);
            break;
        }
    }
    if (!houseExists) {
        console.log("No matching house found, creating new house");
        const newHouse = {
            houseNumber: order.houseNumber,
            street: order.street,
            city: order.city,
            zip: order.zip,
            country: order.country,
            type: order.type,
        };
        house = yield House_db_1.default.createHouse(newHouse);
        console.log("New house created:", house);
    }
    if (!house) {
        throw new Error("House not found");
    }
    console.log("Prepping room data for new room creation");
    const newRoom = {
        name: order.roomName,
        workDescription: order.workDescription,
        houseId: house.getId(),
    };
    console.log("Creating new room with data:", newRoom);
    const roomPrisma = yield Room_db_1.default.createRoom(newRoom);
    const newOrder = yield Order_db_1.default.createOrder(customer.getId(), house.getId(), order.startDate, order.budget);
    console.log("New order created:", newOrder);
    return newOrder;
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_db_1.default.getOrderById(id);
    return order;
});
const getOrderByCustomerEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_db_1.default.getOrderByCustomerEmail(email);
    return orders;
});
exports.default = {
    getOrderByCustomerEmail,
    getAllOrders,
    getOrderById,
    createOrder,
};
