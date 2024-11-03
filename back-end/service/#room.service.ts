import { House } from "../model/house";
import { Room } from "../model/#room";
import RoomDb from "../repository/#Room.db";

const getAllRooms = () : Array<Room> => {
        return RoomDb.getAllRooms();
}

const getHouseRoomsById = (id : number) => {
    const data = RoomDb.getAllRooms();
    const filtered = data.filter(room => room.getHouse().getId() === id);
    return filtered;
} 

export default {
    getAllRooms,
    getHouseRoomsById,
}