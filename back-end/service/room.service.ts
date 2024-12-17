import RoomDb from "../repository/Room.db";
import { createRoomDto } from "../types";

const getAllRooms = async () => {
    return await RoomDb.getAllRooms();
};

const getRoomsByEmail = async (email: string) => {
    return await RoomDb.getRoomsByEmail(email);
};

export default {
    getAllRooms,
    getRoomsByEmail
};