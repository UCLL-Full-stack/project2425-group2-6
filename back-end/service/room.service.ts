import RoomDb from "../repository/Room.db";
import { createRoomDto } from "../types";

const getAllRooms = async () => {
    return await RoomDb.getAllRooms();
};

const getRoomById = async (id: number) => {
    return await RoomDb.getRoomById(id);
};

const addRoom = async (room: createRoomDto) => {
    return await RoomDb.addRoom(room);
};

export default {
    getAllRooms,
    getRoomById,
    addRoom,
};