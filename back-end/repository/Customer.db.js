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
const customer_1 = require("../model/customer");
const Order_db_1 = __importDefault(require("./Order.db"));
const database_1 = __importDefault(require("../util/database"));
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const customersPrisma = yield database_1.default.customer.findMany({});
    return customersPrisma.map((customerPrisma) => customer_1.Customer.from(customerPrisma));
});
const createCustomer = (customer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerPrisma = yield database_1.default.customer.create({
            data: {
                firstName: customer.getFirstName(),
                lastName: customer.getLastName(),
                email: customer.getEmail(),
                role: customer.getRole(),
                birthday: customer.getBirthday(),
                password: customer.getPassword(),
                createdAt: customer.getCreatedAt(),
            },
        });
        return customer_1.Customer.from(customerPrisma);
    }
    catch (error) {
        console.error("Error creating customer:", error);
        throw new Error("Error creating customer: " + error);
    }
});
const getCustomerExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield database_1.default.customer.findUnique({
        where: {
            email: email,
        },
    });
    if (!customer) {
        return null;
    }
    return customer_1.Customer.from(customer);
});
const getCustomerHouses = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_db_1.default.getOrderByCustomerId(customerId);
    const houses = orders.map((order) => order.getHouse());
    return houses.map((house) => ({
        id: house.getId(),
        houseNumber: house.getHouseNumber(),
        street: house.getStreet(),
        city: house.getCity(),
        zip: house.getZip(),
        country: house.getCity(),
        type: house.getType(),
        createdAt: house.getCreatedAt(),
    }));
});
const getCustomerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield database_1.default.customer.findUnique({
        where: {
            id: id,
        },
    });
    if (!customer) {
        return null;
    }
    return customer_1.Customer.from(customer);
});
const getCustomerByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield database_1.default.customer.findUnique({
        where: {
            email: email,
        },
    });
    if (!customer) {
        return null;
    }
    return customer_1.Customer.from(customer);
});
exports.default = {
    getAllCustomers,
    createCustomer,
    getCustomerExists,
    getCustomerHouses,
    getCustomerById,
    getCustomerByEmail,
};
