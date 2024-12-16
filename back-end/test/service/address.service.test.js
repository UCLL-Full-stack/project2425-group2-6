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
const address_service_1 = __importDefault(require("../../service/address.service"));
const Address_db_1 = __importDefault(require("../../repository/Address.db"));
jest.mock("../../repository/Address.db");
describe("AddressService", () => {
    const address = {
        id: 1,
        houseNumber: 1,
        street: "Rue de la Loi",
        city: "Brussels",
        state: "Brussels Capital",
        zip: "1000"
    };
    const newAddress = {
        houseNumber: 2,
        street: "Avenue Louise",
        city: "Brussels",
        state: "Brussels Capital",
        zip: "1050"
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("getAllAddresses should return all addresses", () => __awaiter(void 0, void 0, void 0, function* () {
        Address_db_1.default.getAllAddresses.mockResolvedValue([address]);
        const result = yield address_service_1.default.getAllAddresses();
        expect(result).toEqual([address]);
        expect(Address_db_1.default.getAllAddresses).toHaveBeenCalledTimes(1);
    }));
    test("getAddressById should return the address with the given id", () => __awaiter(void 0, void 0, void 0, function* () {
        Address_db_1.default.getAddressById.mockResolvedValue(address);
        const result = yield address_service_1.default.getAddressById(1);
        expect(result).toEqual(address);
        expect(Address_db_1.default.getAddressById).toHaveBeenCalledWith(1);
        expect(Address_db_1.default.getAddressById).toHaveBeenCalledTimes(1);
    }));
    test("addAddress should add a new address", () => __awaiter(void 0, void 0, void 0, function* () {
        Address_db_1.default.addAddress.mockResolvedValue(newAddress);
        const result = yield address_service_1.default.addAddress(newAddress);
        expect(result).toEqual(newAddress);
        expect(Address_db_1.default.addAddress).toHaveBeenCalledWith(newAddress);
        expect(Address_db_1.default.addAddress).toHaveBeenCalledTimes(1);
    }));
});
