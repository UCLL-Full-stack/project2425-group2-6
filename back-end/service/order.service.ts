
import HouseDb from "../repository/House.db";
import OrderDb from "../repository/Order.db";
import { House } from "../model/house";
import { createHouseDto, createRoomDto, prepOrderDto } from "../types";
import CustomerDb from "../repository/Customer.db";
import RoomDb from "../repository/Room.db";
import database from "../util/database";
import roomService from "./room.service";

const getAllOrders = async () => {
    const orders = await OrderDb.getAllOrders();
    return orders;
}

const createOrder = async (order: prepOrderDto) => {
    console.log("Starting createOrder function");

    // Fetch the customer by email
    const customer = await CustomerDb.getCustomerByEmail(order.email);
    console.log("Customer fetched:", customer);

    if (!customer) {
        throw new Error("Customer not found");
    }

    // Fetch the list of houses associated with the customer
    const houses = await HouseDb.getHousesByCustomerId(customer.getId());
    console.log("Houses fetched for customer:", houses);

    let house;
    let houseExists = false;

    // Check if the house already exists
    for (const houseItem of houses) {
        console.log(`Comparing ${houseItem.getHouseNumber().toLocaleLowerCase()} with ${order.houseNumber.toLocaleLowerCase()}`);
        console.log(`Comparing ${houseItem.getStreet().toLocaleLowerCase()} with ${order.street.toLocaleLowerCase()}`);  
        console.log(`Comparing ${houseItem.getCity().toLocaleLowerCase()} with ${order.city.toLocaleLowerCase()}`);
        console.log(`Comparing ${houseItem.getZip().toLocaleLowerCase()} with ${order.zip.toLocaleLowerCase()}`);
        console.log(`Comparing ${houseItem.getCountry().toLocaleLowerCase()} with ${order.country.toLocaleLowerCase()}`);
        console.log(`Comparing ${houseItem.getType().toLocaleLowerCase()} with ${order.type.toLocaleLowerCase()}`);
        if (
            houseItem.getHouseNumber().toLocaleLowerCase() == order.houseNumber.toLocaleLowerCase() &&
            houseItem.getStreet().toLocaleLowerCase() == order.street.toLocaleLowerCase() &&
            houseItem.getCity().toLocaleLowerCase() == order.city.toLocaleLowerCase() &&
            houseItem.getZip().toLocaleLowerCase() == order.zip.toLocaleLowerCase() &&
            houseItem.getCountry().toLocaleLowerCase() == order.country.toLocaleLowerCase() &&
            houseItem.getType().toLocaleLowerCase() == order.type.toLocaleLowerCase()
        ) {
            house = houseItem;
            houseExists = true;
            console.log("Matching house found:", house);
            break;
        }
    }

    // If no matching house exists, create a new house
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

    console.log("Prepping room and order data for new room creation");

    // Prepare raw data for the repository
    const roomData = {
        roomName: order.roomName,
        workDescription: order.workDescription,
        houseId: house.getId(),
        startDate: order.startDate,
        budget: order.budget,
    };

    // Pass raw data to the repository layer
    const roomWithOrder = await RoomDb.createRoom(roomData, customer.getId());

    console.log("Room with associated order created:", roomWithOrder);

    return roomWithOrder.order; // Return the created order
};


const getOrderById = async (orderId: number) => {
    const rooms = await OrderDb.getOrderById(orderId);
  
    if (!rooms.length) {
      throw new Error(`No order found with ID: ${orderId}`);
    }
  
    // Extract common order information (assuming all rooms share the same order details)
    const firstRoomOrder = rooms[0];
    const refinedOrder = {
      orderId: firstRoomOrder.order.id,
      orderDate: firstRoomOrder.order.orderDate,
      status: firstRoomOrder.order.status,
      startDate: firstRoomOrder.order.startDate,
      price: firstRoomOrder.order.price,
      house: {
        id: firstRoomOrder.house.id,
        country: firstRoomOrder.house.country,
        houseNumber: firstRoomOrder.house.houseNumber,
        street: firstRoomOrder.house.street,
        city: firstRoomOrder.house.city,
        zip: firstRoomOrder.house.zip,
        type: firstRoomOrder.house.type,
      },
      rooms: rooms.map((room) => ({
        name: room.name,
        workDescription: room.workDescription,
      })),
      customer: {
        firstName: firstRoomOrder.order.customer.firstName,
        lastName: firstRoomOrder.order.customer.lastName,
      },
      employee: firstRoomOrder.order.employee
        ? {
            firstName: firstRoomOrder.order.employee.firstName,
            lastName: firstRoomOrder.order.employee.lastName,
          }
        : null,
    };
  
    return refinedOrder; // Refined, customer-friendly order data
  };

const getOrderByCustomerEmail = async (email: string) => {
    const orders = await roomService.getRoomsByEmail(email);

    const refinedOrders = orders.map((order: any) => {
        return {
            orderId: order.order.id,
            orderDate: order.order.orderDate,
            status: order.order.status,
            startDate: order.order.startDate,
            price: order.order.price,
            house: {
                id: order.house.id,
                country: order.house.country,
                houseNumber: order.house.houseNumber,
                street: order.house.street,
                city: order.house.city,
                zip: order.house.zip,
                type: order.house.type,
            },
            room: {
                name: order.name,
                workDescription: order.workDescription,
            }
        };
    });

    return refinedOrders;
};

export default {
    getOrderByCustomerEmail,
    getAllOrders,
    getOrderById,
    createOrder,
}