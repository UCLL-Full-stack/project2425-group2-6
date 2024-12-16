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
const room_1 = require("../model/room");
const database_1 = __importDefault(require("../util/database"));
const getAllRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const roomsPrisma = yield database_1.default.room.findMany({
        include: {
            house: true
        }
    });
    return roomsPrisma.map((roomPrisma) => room_1.Room.from(roomPrisma));
});
const getHouse = (houseId) => __awaiter(void 0, void 0, void 0, function* () {
    const housePrisma = yield database_1.default.house.findUnique({
        where: { id: houseId },
        include: { rooms: true } // Ensure this matches the property name in your Prisma schema
    });
    if (!housePrisma) {
        throw new Error("House not found");
    }
    const house = house_1.House.from(Object.assign({}, housePrisma));
    const rooms = housePrisma.rooms.map((roomPrisma) => {
        const room = room_1.Room.from(Object.assign(Object.assign({}, roomPrisma), { house: housePrisma }));
        return {
            id: room.getId(),
            name: room.getName(),
            workDescription: room.getWorkDescription()
        };
    });
    return Object.assign(Object.assign({}, house), { rooms });
});
const createRoom = (createRoomDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomPrisma = yield database_1.default.room.create({
            data: {
                name: createRoomDto.name,
                workDescription: createRoomDto.workDescription,
                house: {
                    connect: {
                        id: createRoomDto.houseId
                    }
                }
            }
        });
        const housePrisma = yield database_1.default.house.findUnique({
            where: { id: createRoomDto.houseId }
        });
        if (!housePrisma) {
            throw new Error("House not found");
        }
        return room_1.Room.from(Object.assign(Object.assign({}, roomPrisma), { house: housePrisma }));
    }
    catch (error) {
        console.error("Error creating room:", error);
        throw new Error("Error creating room: " + error);
    }
});
exports.default = {
    getAllRooms,
    getHouse,
    createRoom,
};
