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
                    employee: true,
                    house: true
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
                            employee: true,
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

const createRoom = async (orderData: any, customerId: number) => {
    const { roomName, workDescription, houseId, startDate, budget } = orderData;

    // Create the room and the associated order
    const roomWithOrder = await database.room.create({
        data: {
            name: roomName,
            workDescription: workDescription,
            house: {
                connect: { id: houseId }, // Link the house
            },
            order: {
                create: {
                    houseId: houseId,
                    customerId: customerId,
                    startDate: startDate,
                    status: 'pending', // Default order status
                    price: budget, // Use provided budget as price
                    orderDate: new Date(), // Use current date as the order date
                    employeeId: 1, // Add a valid employeeId (assumed to be 1)
                },
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
                    employee: true,
                    house: true
                }
            }
        }
    });

    return rooms.map((roomPrisma) => Room.from(roomPrisma));
};



export default {
    getAllRooms,
    getHouse,
    createRoom,
    getRoomsByEmail,
}