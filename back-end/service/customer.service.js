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
const Customer_db_1 = __importDefault(require("../repository/Customer.db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importDefault(require("../util/jwt"));
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Customer_db_1.default.getAllCustomers();
});
const createCustomer = (createCustomerDto) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield Customer_db_1.default.getCustomerExists(createCustomerDto.email);
    if (exists) {
        throw new Error(`Customer with email ${createCustomerDto.email} already exists.`);
    }
    const hashedPassword = yield bcrypt_1.default.hash(createCustomerDto.password, 12);
    const customer = new customer_1.Customer(createCustomerDto.firstName, createCustomerDto.lastName, createCustomerDto.email, createCustomerDto.birthday, hashedPassword, new Date());
    return yield Customer_db_1.default.createCustomer(customer);
});
const authenticate = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield Customer_db_1.default.getCustomerExists(email);
        if (!customer) {
            throw new Error("Customer does not exist.");
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, customer.getPassword());
        if (!isValidPassword) {
            throw new Error("Invalid password.");
        }
        return {
            token: (0, jwt_1.default)({ email: customer.getEmail(), role: customer.getRole() }),
            email: customer.getEmail(),
            fullname: `${customer.getFirstName()} ${customer.getLastName()}`,
            role: customer.getRole()
        };
    }
    catch (error) {
        throw new Error("Error authenticating customer: " + error);
    }
});
const getCustomerHouses = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Customer_db_1.default.getCustomerHouses(customerId);
});
exports.default = {
    getAllCustomers,
    createCustomer,
    authenticate,
    getCustomerHouses
};
