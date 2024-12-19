import { House } from "../model/house";
import { Room } from "../model/room";
import { createHouseDto, createRoomDto } from "../types";
import database from "../util/database";

const getAllRooms = async () : Promise<Array<Room>> => {
    const roomsPrisma = await database.room.findMany({
        include: {
            house: true,
            order: {
                include: {
                    customer: true,
                    house: true,
                    employees: true,
                }
            }
        }
    });
    return roomsPrisma.map((roomPrisma) => Room.from(roomPrisma));
} 

const getHouse = async (houseId: number): Promise<any> => {
    const housePrisma = await database.house.findUnique({
        where: { id: houseId },
        include: {
            rooms: {
                include: {
                    order: {
                        include: {
                            customer: true,
                            employees: true,
                            house: true
                        }
                    }
                }
            }
        }
    });

    if (!housePrisma) {
        throw new Error("House not found");
    }

    const house = House.from({ ...housePrisma });
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

// Repository Layer: RoomRepository.ts

const createRoom = async (roomData: any) => {
    const { roomName, workDescription, houseId, startDate, budget, orderId } = roomData;

    // Create the room and associate it with the existing order
    const roomWithOrder = await database.room.create({
        data: {
            name: roomName,
            workDescription: workDescription,
            house: {
                connect: { id: houseId }, // Link the house
            },
            order: {
                connect: { id: orderId }, // Connect the room to the existing order
            },
        },
        include: {
            order: true,
            house: true,
        },
    });

    return roomWithOrder; // Return the created room along with the associated order
};



const getRoomsByEmail = async (email: string) => {
    const rooms = await database.room.findMany({
        where: {
            order: {
                customer: {
                    email: email
                }
            }
        },
        include: {
            house: true,
            order: {
                include: {
                    customer: true,
                    employees: true,
                    house: true
                }
            }
        }
    });

    return rooms.map((roomPrisma) => Room.from(roomPrisma));
};

const deleteRoomById = async (roomId: number) => {
    try {
        const deletedRoom = await database.room.delete({
            where: {
                id: roomId
            }
        });
        return `Room with ID: ${roomId} has been deleted`;
    }
    catch (error) {
        throw new Error("Room not found with ID: " + roomId + ". Error: " + error);
    };
}



export default {
    getAllRooms,
    getHouse,
    createRoom,
    getRoomsByEmail,
    deleteRoomById,
}