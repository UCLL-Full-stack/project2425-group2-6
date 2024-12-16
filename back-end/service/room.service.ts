import RoomDb from "../repository/Room.db";
import { createRoomDto } from "../types";

const getAllRooms = async () => {
    return await RoomDb.getAllRooms();
};

export default {
    getAllRooms,
};