import roomService from "../../service/room.service";
import RoomDb from "../../repository/Room.db";
import { Room } from "../../model/room";
import { House } from "../../model/house";
import { Order } from "../../model/order";
import { Customer } from "../../model/customer";
import { Employee } from "../../model/employee";

jest.mock("../../repository/Room.db");

const house = new House(1, "1", "Rue de la Loi", "Brussels", "1000", "detached", "Belgium", new Date());
const customer = new Customer("John", "Doe", "john.doe@example.com", new Date("1990-01-01"), "password123", new Date());
const employees: Employee[] = [];
const order = new Order(1, customer, house, new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 1000, employees);
const room = new Room(1, house, "Living Room", "Painting", order);

beforeEach(() => {
    (RoomDb.getAllRooms as jest.Mock).mockResolvedValue([room]);
    (RoomDb.getRoomsByEmail as jest.Mock).mockResolvedValue([room]);
});

afterEach(() => {
    jest.clearAllMocks();
});

test("given: valid Room, when: getAllRooms, then: return all rooms", async () => {
    const result = await roomService.getAllRooms();

    expect(result).toEqual([room]);
    expect(RoomDb.getAllRooms).toHaveBeenCalledTimes(1);
});

test("given: valid email, when: getRoomsByEmail, then: return rooms associated with email", async () => {
    const email = "john.doe@example.com";
    const result = await roomService.getRoomsByEmail(email);

    expect(result).toEqual([room]);
    expect(RoomDb.getRoomsByEmail).toHaveBeenCalledWith(email);
    expect(RoomDb.getRoomsByEmail).toHaveBeenCalledTimes(1);
});