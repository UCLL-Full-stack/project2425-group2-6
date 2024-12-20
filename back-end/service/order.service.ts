
import HouseDb from "../repository/House.db";
import OrderDb from "../repository/Order.db";
import { createHouseDto, prepOrderDto } from "../types";
import CustomerDb from "../repository/Customer.db";
import RoomDb from "../repository/Room.db";
import roomService from "./room.service";
import { House } from "@prisma/client";

const getAllOrders = async ({email, role}: {email: string, role : string}) => {
    
    // console.log(email, role);
        
    if (role === 'admin') {
        return OrderDb.getAllOrders();
    }
    if (role === 'customer') {
        return getOrderByCustomerEmail(email);
    } else if (role === 'employee') {
        return getOrdersByEmployeeEmail(email);
    }
    throw new Error("Something went wrong");
}

const createOrder = async (order: prepOrderDto) => {
    // Fetch the customer by email
    const customer = await CustomerDb.getCustomerByEmail(order.email);
    if (!customer) {
        throw new Error("Customer not found");
    }

    // Fetch the list of houses associated with the customer
    const houses = await HouseDb.getHousesByCustomerId(customer.getId());
    let house : House | any;
    let houseExists = false;

    // Check if the house already exists
    for (const houseItem of houses) {
        if (
            houseItem.getHouseNumber().toLocaleLowerCase() === order.houseNumber.toLocaleLowerCase() &&
            houseItem.getStreet().toLocaleLowerCase() === order.street.toLocaleLowerCase() &&
            houseItem.getCity().toLocaleLowerCase() === order.city.toLocaleLowerCase() &&
            houseItem.getZip().toLocaleLowerCase() === order.zip.toLocaleLowerCase() &&
            houseItem.getCountry().toLocaleLowerCase() === order.country.toLocaleLowerCase() &&
            houseItem.getType().toLocaleLowerCase() === order.type.toLocaleLowerCase()
        ) {
            house = houseItem;
            houseExists = true;
            break;
        }
    }

    // If no matching house exists, create a new house
    if (!houseExists) {
        const newHouse: createHouseDto = {
            houseNumber: order.houseNumber,
            street: order.street,
            city: order.city,
            zip: order.zip,
            country: order.country,
            type: order.type,
        };

        house = await HouseDb.createHouse(newHouse);
    }

    if (!house) {
        throw new Error("House not found or created");
    }

    // Prepare data for a single order
    const orderData = {
        houseId: house.getId(),
        customerId: customer.getId(),
        startDate: order.startDate,
        status: 'pending', // Default status
        price: order.budget, // Total price for all rooms
        orderDate: new Date(), // Current date as the order date
        employees: {}, // Assuming no employee IDs are being used for now
    };

    // Create the order first
    const createdOrder = await OrderDb.createOrder(orderData.customerId, orderData.houseId, orderData.startDate, orderData.price);

    // Loop through all rooms in the order and create them
    const roomPromises = order.rooms.map(async (room) => {
        const roomData = {
            roomName: room.roomName,
            workDescription: room.workDescription,
            houseId: house.getId(),
            startDate: order.startDate,
            budget: order.budget, // If each room has a separate budget, adjust this
        };

        // Create room and associate it with the created order
        await RoomDb.createRoom({
            ...roomData,
            orderId: createdOrder.getId(), // Link room to the created order
        });
    });

    // Wait for all rooms to be created
    await Promise.all(roomPromises);

    // Return the created order (with associated rooms)
    return createdOrder;
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
        id: room.id,
        name: room.name,
        workDescription: room.workDescription,
      })),
      customer: {
        firstName: firstRoomOrder.order.customer.firstName,
        lastName: firstRoomOrder.order.customer.lastName,
        email: firstRoomOrder.order.customer.email,
    },
      employees: firstRoomOrder.order.employees.map((employee) => ({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      })),
    };
  
    return refinedOrder; // Refined, customer-friendly order data
};

const getOrderByCustomerEmail = async (email: string) => {
    // Fetch all rooms by email (assumed to return a list of room objects)
    const orders = await roomService.getRoomsByEmail(email);
    console.log(orders);

    // Initialize an empty map to store orders by their order ID
    const ordersMap: { [orderId: string]: any } = {};

    // Loop through each room to group them by their order ID
    orders.forEach((room: any) => {
        // Extract the necessary details
        const orderId = room.order.id;

        // Check if the order already exists in the map
        if (!ordersMap[orderId]) {
            // Initialize the order entry with basic details
            ordersMap[orderId] = {
                orderId: orderId,
                orderDate: room.order.orderDate,
                status: room.order.status,
                startDate: room.order.startDate,
                price: room.order.price,
                house: {
                    id: room.house.id,
                    country: room.house.country,
                    houseNumber: room.house.houseNumber,
                    street: room.house.street,
                    city: room.house.city,
                    zip: room.house.zip,
                    type: room.house.type,
                },
                rooms: [] // Initialize the rooms array
            };
        }

        // Push the room details to the corresponding order's `rooms` array
        ordersMap[orderId].rooms.push({
            roomId: room.id,
            roomName: room.name,
            workDescription: room.workDescription,
        });
    });

    // Convert the ordersMap into an array of orders
    const refinedOrders = Object.values(ordersMap);

    return refinedOrders;
};


const getOrdersByEmployeeEmail = async (email: string) => {
    const rooms = await OrderDb.getOrdersByEmployeeEmail(email);

    const orderMap = new Map<number, any>();

    rooms.forEach((room) => {
        const { 
            id, 
            name, 
            workDescription, 
            house, 
            order 
        } = room;

        if (!orderMap.has(order.id)) {
            orderMap.set(order.id, {
                orderId: order.id,
                status: order.status,
                price: order.price,
                orderDate: order.orderDate,
                startDate: order.startDate,
                customer: {
                    id: order.customer.id,
                    firstName: order.customer.firstName,
                    lastName: order.customer.lastName,
                    email: order.customer.email,
                },
                employees: order.employees.map((employee) => ({
                    id: employee.id,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                })),
                house: {
                    id: house.id,
                    houseNumber: house.houseNumber,
                    street: house.street,
                    city: house.city,
                    zip: house.zip,
                    country: house.country,
                    type: house.type
                },
                rooms: []
            });
        }

        const orderEntry = orderMap.get(order.id);
        orderEntry.rooms.push({
            id: room.id,
            name: room.name,
            workDescription: room.workDescription,
        });
    });

    const refinedOrders = Array.from(orderMap.values());

    return refinedOrders;
};

const toggleEmployeeAssignment = async (orderId: number, email: string) => {
    // Check if the order exists
    const order = await getOrderById(orderId);
    if (!order) {
        throw new Error(`Order with ID ${orderId} not found`);
    }

    // Check if the employee exists in the order's employees list
    const isEmployeeAssigned = order.employees.some((employee: any) => employee.email === email);

    // Determine action: add or remove
    const action = isEmployeeAssigned ? "remove" : "add";

    // Perform the toggle operation
    try {
        await OrderDb.toggleEmployeeAssignment(orderId, email, action);
    } catch (error) {
        throw new Error(`Failed to ${action} employee with email ${email} to/from order: ${error}`);
    }

    return {
        message: `Employee with email ${email} has been ${isEmployeeAssigned ? "removed from" : "added to"} the order.`,
        action,
    };
};

const deleteOrder = async (orderId: number) => {
    const result = await OrderDb.deleteOrder(orderId);
    return result;
};

const modifyOrderStatus = async (orderId: number, status: string) => {
    const order = await OrderDb.modifyOrderStatus(orderId, status);
    return order;
};

export default {
    getOrderByCustomerEmail,
    getAllOrders,
    getOrderById,
    createOrder,
    getOrdersByEmployeeEmail,
    toggleEmployeeAssignment,
    deleteOrder,
    modifyOrderStatus,
}