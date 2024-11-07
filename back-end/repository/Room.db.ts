import { House } from "../model/house";
import { Room } from "../model/room";
import { createHouseDto, createRoomDto } from "../types";
import AddressDb from "./Address.db";
import HouseDb from "./House.db";

let currentId : number = 1;

let rooms : Array<Room> = [
    new Room(currentId++,  HouseDb.getAllHouses()[0], "Living Room", "Painting"),
    new Room(currentId++,  HouseDb.getAllHouses()[1], "Kitchen", "Flooring"),
    new Room(currentId++,  HouseDb.getAllHouses()[2], "Bedroom", "Wallpaper"),
    new Room(currentId++,  HouseDb.getAllHouses()[3], "Bathroom", "Tiling"),
    new Room(currentId++,  HouseDb.getAllHouses()[4], "Office", "Carpeting"),
]

rooms.forEach(room => {console.log(`${room.toString()}\n\n`)});

const getAllRooms = () => {
    return rooms;
}

const getRoomById = (id : number) : Room | Error => {
    return rooms.find(room => room.getId() === id) || new Error("Room not found.");
}

const addRoom = (room : createRoomDto) => {
    const house = HouseDb.getHouseById(room.houseId);
    if (house instanceof Error) {
        throw house;
    }
    const newRoom = new Room(currentId++, house, room.name, room.workDescription);
    rooms.push(newRoom);
    return newRoom;
}

export default {
    rooms,
    addRoom,
    getAllRooms,
    getRoomById,
}