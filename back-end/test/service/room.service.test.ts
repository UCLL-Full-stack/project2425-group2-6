import { Room } from "../../model/room";
import { House } from "../../model/house";
import { Address } from "../../model/address";
import roomService from "../../service/room.service";
import RoomDb from "../../repository/Room.db";
import { createRoomDto } from "../../types";

jest.mock("../../repository/Room.db");

const address = new Address(1, 1, "Rue de la Loi", "Brussels", "Brussels Capital", "1000");
const house = new House(1, address, "detached");
const room = new Room(1, house, "Living Room", "Painting");

const newRoom: createRoomDto = {
    houseId: 1,
    name: "Bedroom",
    workDescription: "Cleaning"
};

let mockRoomGetAllRooms: jest.Mock;
let mockRoomGetRoomById: jest.Mock;
let mockRoomAddRoom: jest.Mock;

beforeEach(() => {
    mockRoomGetAllRooms = jest.fn().mockResolvedValue([room]);
    mockRoomGetRoomById = jest.fn().mockResolvedValue(room);
    mockRoomAddRoom = jest.fn().mockResolvedValue(room);

    RoomDb.getAllRooms = mockRoomGetAllRooms;
    RoomDb.getRoomById = mockRoomGetRoomById;
    RoomDb.addRoom = mockRoomAddRoom;
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given: valid Room, when: getAllRooms, then: return all rooms", async () => {
    const result = await roomService.getAllRooms();

    expect(result).toEqual([room]);
    expect(mockRoomGetAllRooms).toHaveBeenCalledTimes(1);
});

test("given: valid id, when: getRoomById, then: return room with given id", async () => {
    const result = await roomService.getRoomById(1);

    expect(result).toEqual(room);
    expect(mockRoomGetRoomById).toHaveBeenCalledWith(1);
    expect(mockRoomGetRoomById).toHaveBeenCalledTimes(1);
});

test("given: valid Room, when: addRoom, then: add room", async () => {
    const result = await roomService.addRoom(newRoom);

    expect(result).toEqual(room);
    expect(mockRoomAddRoom).toHaveBeenCalledWith(newRoom);
    expect(mockRoomAddRoom).toHaveBeenCalledTimes(1);
});