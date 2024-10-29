// RoomDb.ts
import { Room } from "../model/room";
import HouseDb from "./House.db";

let currentId: number = 1;

const rooms: Array<Room> = [
    new Room(currentId++, HouseDb.houses[0], "Living Room", "Requires wooden flooring"),
    new Room(currentId++, HouseDb.houses[1], "Kitchen", "Install new cabinets"),
    new Room(currentId++, HouseDb.houses[2], "Bedroom", "Paint walls"),
    new Room(currentId++, HouseDb.houses[0], "Bathroom", "Replace tiles"),
    new Room(currentId++, HouseDb.houses[1], "Garage", "Install new door"),
    new Room(currentId++, HouseDb.houses[2], "Basement", "Waterproofing"),
    new Room(currentId++, HouseDb.houses[0], "Office", "Setup workstations"),
    new Room(currentId++, HouseDb.houses[1], "Dining Room", "New lighting"),
    new Room(currentId++, HouseDb.houses[2], "Guest Room", "Furnish"),
    new Room(currentId++, HouseDb.houses[0], "Laundry Room", "Install washer and dryer"),
];

const getAllRooms = () : Array<Room> => {
    return rooms;
}


export default {
    rooms,
    getAllRooms,
};
