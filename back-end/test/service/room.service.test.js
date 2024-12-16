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
const room_1 = require("../../model/room");
const house_1 = require("../../model/house");
const address_1 = require("../../model/address");
const room_service_1 = __importDefault(require("../../service/room.service"));
const Room_db_1 = __importDefault(require("../../repository/Room.db"));
jest.mock("../../repository/Room.db");
const address = new address_1.Address(1, 1, "Rue de la Loi", "Brussels", "Brussels Capital", "1000");
const house = new house_1.House(1, address, "detached");
const room = new room_1.Room(1, house, "Living Room", "Painting");
const newRoom = {
    houseId: 1,
    name: "Bedroom",
    workDescription: "Cleaning"
};
let mockRoomGetAllRooms;
let mockRoomGetRoomById;
let mockRoomAddRoom;
beforeEach(() => {
    mockRoomGetAllRooms = jest.fn().mockResolvedValue([room]);
    mockRoomGetRoomById = jest.fn().mockResolvedValue(room);
    mockRoomAddRoom = jest.fn().mockResolvedValue(room);
    Room_db_1.default.getAllRooms = mockRoomGetAllRooms;
    Room_db_1.default.getRoomById = mockRoomGetRoomById;
    Room_db_1.default.addRoom = mockRoomAddRoom;
});
afterEach(() => {
    jest.clearAllMocks();
});
test("given: valid Room, when: getAllRooms, then: return all rooms", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.default.getAllRooms();
    expect(result).toEqual([room]);
    expect(mockRoomGetAllRooms).toHaveBeenCalledTimes(1);
}));
test("given: valid id, when: getRoomById, then: return room with given id", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.default.getRoomById(1);
    expect(result).toEqual(room);
    expect(mockRoomGetRoomById).toHaveBeenCalledWith(1);
    expect(mockRoomGetRoomById).toHaveBeenCalledTimes(1);
}));
test("given: valid Room, when: addRoom, then: add room", () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.default.addRoom(newRoom);
    expect(result).toEqual(room);
    expect(mockRoomAddRoom).toHaveBeenCalledWith(newRoom);
    expect(mockRoomAddRoom).toHaveBeenCalledTimes(1);
}));
