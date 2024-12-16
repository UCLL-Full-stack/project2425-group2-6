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
const house_service_1 = __importDefault(require("../../service/house.service"));
const House_db_1 = __importDefault(require("../../repository/House.db"));
const house_1 = require("../../model/house");
const address_1 = require("../../model/address");
jest.mock("../../repository/House.db");
const address = new address_1.Address(1, 1, "Rue de la Loi", "Brussels", "Brussels Capital", "1000");
const house = new house_1.House(1, address, "detached");
const newHouse = {
    addressId: 1,
    type: "semi-detached"
};
beforeEach(() => {
    jest.clearAllMocks();
});
test("getAllHouses should return all houses", () => __awaiter(void 0, void 0, void 0, function* () {
    House_db_1.default.getAllHouses.mockResolvedValue([house]);
    const result = yield house_service_1.default.getAllHouses();
    expect(result).toEqual([house]);
    expect(House_db_1.default.getAllHouses).toHaveBeenCalledTimes(1);
}));
test("getHouseById should return the house with the given id", () => __awaiter(void 0, void 0, void 0, function* () {
    House_db_1.default.getHouseById.mockResolvedValue(house);
    const result = yield house_service_1.default.getHouseById(1);
    expect(result).toEqual(house);
    expect(House_db_1.default.getHouseById).toHaveBeenCalledWith(1);
    expect(House_db_1.default.getHouseById).toHaveBeenCalledTimes(1);
}));
test("addHouse should add a new house", () => __awaiter(void 0, void 0, void 0, function* () {
    House_db_1.default.addHouse.mockResolvedValue(newHouse);
    const result = yield house_service_1.default.addHouse(newHouse);
    expect(result).toEqual(newHouse);
    expect(House_db_1.default.addHouse).toHaveBeenCalledWith(newHouse);
    expect(House_db_1.default.addHouse).toHaveBeenCalledTimes(1);
}));
