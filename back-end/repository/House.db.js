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
const house_1 = require("../model/house");
const customer_service_1 = __importDefault(require("../service/customer.service"));
const database_1 = __importDefault(require("../util/database"));
const getAllHouses = () => __awaiter(void 0, void 0, void 0, function* () {
    const housesPrisma = yield database_1.default.house.findMany({});
    return housesPrisma.map((housePrisma) => house_1.House.from(housePrisma));
});
const createHouse = (createHouseDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const housePrisma = yield database_1.default.house.create({
            data: {
                houseNumber: createHouseDto.houseNumber,
                street: createHouseDto.street,
                city: createHouseDto.city,
                zip: createHouseDto.zip,
                country: createHouseDto.country,
                type: createHouseDto.type,
            },
        });
        return house_1.House.from(housePrisma);
    }
    catch (error) {
        console.error("Error creating house:", error);
        throw new Error("Error creating house: " + error);
    }
});
const getHousesByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const customerHouses = yield customer_service_1.default.getCustomerHouses(customerId);
    return customerHouses.map((house) => house_1.House.from(house));
});
const getHouseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const house = yield database_1.default.house.findUnique({
        where: {
            id: id
        }
    });
    if (!house) {
        return null;
    }
    return house_1.House.from(house);
});
exports.default = {
    getAllHouses,
    getHousesByCustomerId,
    createHouse,
    getHouseById
};
