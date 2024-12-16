
import HouseDb from "../repository/House.db";
import OrderDb from "../repository/Order.db";
import { House } from "../model/house";
import { createHouseDto, createRoomDto, prepOrderDto } from "../types";
import CustomerDb from "../repository/Customer.db";
import RoomDb from "../repository/Room.db";

const getAllOrders = async () => {
    const orders = await OrderDb.getAllOrders();
    return orders;
}

const createOrder = async (order: prepOrderDto) => {
    console.log("Starting createOrder function");

    const customer = await CustomerDb.getCustomerByEmail(order.email);
    console.log("Customer fetched:", customer);

    if (!customer) {
        throw new Error("Customer not found");
    }

    const houses = await HouseDb.getHousesByCustomerId(customer.getId());
    console.log("Houses fetched for customer:", houses);

    let house;
    let houseExists = false;

    for (const houseItem of houses) {
        console.log(`Comparing ${houseItem.getHouseNumber()} with ${order.houseNumber}`)
        console.log(`Comparing ${houseItem.getStreet()} with ${order.street}`)  
        console.log(`Comparing ${houseItem.getCity()} with ${order.city}`)
        console.log(`Comparing ${houseItem.getZip()} with ${order.zip}`)
        console.log(`Comparing ${houseItem.getCountry()} with ${order.country}`)
        console.log(`Comparing ${houseItem.getType()} with ${order.type}`)
        if (
            houseItem.getHouseNumber() == order.houseNumber &&
            houseItem.getStreet() == order.street &&
            houseItem.getCity() == order.city &&
            houseItem.getZip() == order.zip &&
            houseItem.getCountry() == order.country &&
            houseItem.getType() == order.type
        ) {
            house = houseItem;
            houseExists = true;
            console.log("Matching house found:", house);
            break;
        }
    }

    if (!houseExists) {
        console.log("No matching house found, creating new house");

        const newHouse: createHouseDto = {
            houseNumber: order.houseNumber,
            street: order.street,
            city: order.city,
            zip: order.zip,
            country: order.country,
            type: order.type,
        };

        house = await HouseDb.createHouse(newHouse);
        console.log("New house created:", house);
    }

    if (!house) {
        throw new Error("House not found");
    }

    console.log("Prepping room data for new room creation");
    const newRoom : createRoomDto = {
        name: order.roomName,
        workDescription: order.workDescription,
        houseId: house.getId(),
    };

    console.log("Creating new room with data:", newRoom);
    const roomPrisma = await RoomDb.createRoom(newRoom);

    const newOrder = await OrderDb.createOrder(
        customer.getId(),
        house.getId(),
        order.startDate,
        order.budget
    );
    console.log("New order created:", newOrder);

    return newOrder;
};

const getOrderById = async (id : number) => {
    const order = await OrderDb.getOrderById(id);
    return order;
}

const getOrderByCustomerEmail = async (email: string) => {
    const orders = await OrderDb.getOrderByCustomerEmail(email);
    return orders;
};

export default {
    getOrderByCustomerEmail,
    getAllOrders,
    getOrderById,
    createOrder,
}