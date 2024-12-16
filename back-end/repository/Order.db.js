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
const order_1 = require("../model/order");
const House_db_1 = __importDefault(require("./House.db"));
const Customer_db_1 = __importDefault(require("./Customer.db"));
const database_1 = __importDefault(require("../util/database"));
let currentId = 1;
const orders = [
// new Order(currentId++, CustomerDb.getAllCustomers()[0], new Date("2021-01-01"), new Date("2025-02-01"), 1000, HouseDb.getAllHouses()[0]),
// new Order(currentId++, CustomerDb.getAllCustomers()[1], new Date("2021-02-01"), new Date("2025-03-01"), 2000, HouseDb.getAllHouses()[1]),
// new Order(currentId++, CustomerDb.getAllCustomers()[2], new Date("2021-03-01"), new Date("2025-04-01"), 3000, HouseDb.getAllHouses()[2]),
// new Order(currentId++, CustomerDb.getAllCustomers()[0], new Date("2021-04-01"), new Date("2025-05-01"), 4000, HouseDb.getAllHouses()[3]),
];
//orders.forEach(order => {log(`${order.toString()}\n\n`)});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const ordersPrisma = yield database_1.default.order.findMany({
        include: {
            customer: true,
            house: true
        }
    });
    return ordersPrisma.map((orderPrisma) => order_1.Order.from(orderPrisma));
});
const getOrderByCustomerEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching customer by email:", email);
    const customer = yield Customer_db_1.default.getCustomerByEmail(email);
    console.log("Customer fetched:", customer);
    if (!customer) {
        throw new Error("Customer not found");
    }
    console.log("Fetching orders for customer ID:", customer.getId());
    const ordersPrisma = yield database_1.default.order.findMany({
        where: {
            customerId: customer.getId()
        },
        include: {
            customer: true,
            house: true,
            // rooms : true
        }
    });
    console.log("Orders fetched from database:", ordersPrisma);
    const orders = ordersPrisma.map((orderPrisma) => order_1.Order.from(orderPrisma));
    console.log("Orders mapped to Order class instances:", orders);
    return orders;
});
const getOrderByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const ordersPrisma = yield database_1.default.order.findMany({
        where: {
            customerId: customerId
        },
        include: {
            customer: true,
            house: true
        }
    });
    return ordersPrisma.map((orderPrisma) => order_1.Order.from(orderPrisma));
});
const getOrderById = (id) => {
    return orders.find(order => order.getId() === id) || [];
};
const createOrder = (customerId, houseId, startDate, budget) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting createOrder function");
    console.log("Fetching customer with ID:", customerId);
    const customer = yield Customer_db_1.default.getCustomerById(customerId);
    console.log("Customer fetched:", customer);
    console.log("Fetching house with ID:", houseId);
    const house = yield House_db_1.default.getHouseById(houseId);
    console.log("House fetched:", house);
    if (!customer) {
        throw new Error("Customer not found");
    }
    if (!house) {
        throw new Error("House not found");
    }
    console.log("Creating order with data:", {
        customerId,
        houseId,
        startDate,
        budget,
        status: "pending"
    });
    const orderPrisma = yield database_1.default.order.create({
        data: {
            customer: {
                connect: { id: customerId }
            },
            house: {
                connect: { id: houseId }
            },
            employee: {
                connect: { id: 2 } // Assuming employee ID 2 is valid
            },
            startDate: startDate,
            price: budget,
            status: "pending" // Default status
        },
        include: {
            customer: true,
            house: true
        },
    });
    console.log("Order created in database:", orderPrisma);
    const order = order_1.Order.from(orderPrisma);
    console.log("Order mapped to Order class instance:", order);
    return order;
});
exports.default = {
    orders,
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByCustomerId,
    getOrderByCustomerEmail
};
