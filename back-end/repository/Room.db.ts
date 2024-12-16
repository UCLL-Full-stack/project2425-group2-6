import { House } from "../model/house";
import { Room } from "../model/room";
import { createHouseDto, createRoomDto } from "../types";
import database from "../util/database";

const getAllRooms = async () : Promise<Array<Room>> => {
    const roomsPrisma = await database.room.findMany({
        include: {
            house: true
        }
    });
    return roomsPrisma.map((roomPrisma) => Room.from(roomPrisma));
} 

const getHouse = async (houseId: number): Promise<any> => {
    const housePrisma = await database.house.findUnique({
        where: { id: houseId },
        include: { rooms: true } // Ensure this matches the property name in your Prisma schema
    });

    if (!housePrisma) {
        throw new Error("House not found");
    }

    const house = House.from({...housePrisma});
    const rooms = housePrisma.rooms.map((roomPrisma) => {
            const room = Room.from({ ...roomPrisma, house: housePrisma });
            return {
                id: room.getId(),
                name: room.getName(),
                workDescription: room.getWorkDescription()
            };
        });

    return {
        ...house,
        rooms
    };
};

const createRoom = async (createRoomDto: createRoomDto): Promise<Room> => {
    try {
        const roomPrisma = await database.room.create({
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
        const housePrisma = await database.house.findUnique({
            where: { id: createRoomDto.houseId }
        });
        if (!housePrisma) {
            throw new Error("House not found");
        }
        return Room.from({ ...roomPrisma, house: housePrisma });
    } catch (error) {
        console.error("Error creating room:", error);
        throw new Error("Error creating room: " + error);
    }
};


export default {
    getAllRooms,
    getHouse,
    createRoom,
}