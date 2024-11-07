import { Order } from "../model/order";
import AddressDb from "../repository/Address.db";
import HouseDb from "../repository/House.db";
import OrderDb from "../repository/Order.db";
import RoomDb from "../repository/Room.db";
import { createAddressDto, createHouseDto, createOrderDto, createRoomDto } from "../types";

const getAllOrders = async () => {
    const orders = await OrderDb.getAllOrders();
    return orders;
}

const getOrderById = async (id : number) => {
    const order = await OrderDb.getOrderById(id);
    return order;
}

const addOrder = async (address: createAddressDto, rooms: createRoomDto[], house: createHouseDto,  order: createOrderDto) => {
    try {
        const addressData = {
            city: address.city,
            houseNumber: address.houseNumber,
            street: address.street,
            state: address.state,
            zip: address.zip
        };
        const createdAddress = await AddressDb.addAddress(addressData); 

        const houseData = {
            addressId: createdAddress.getId(), 
            type: house.type              
        };
        const createdHouse = await HouseDb.addHouse(houseData); 
        

        const orderData = {
            customerId: order.customerId,          
            orderDate: new Date(),                  
            startDate: new Date(order.startDate),   
            price: order.price,                    
            houseId: createdHouse.getId()               
        };
        
        const newOrder = await OrderDb.addOrder(orderData); 
        
        for (const room of rooms) {
            const roomData = {
                name: room.name,
                workDescription: room.workDescription,
                houseId: createdHouse.getId()  
            };
            let createdRoom = await RoomDb.addRoom(roomData);  
            newOrder.addRoom(createdRoom);  
            
        }

        
        return newOrder;
        
    } catch (error) {
        console.error("Error adding order:", error);
        throw new Error("Failed to add order");
    }
};

export default {
    getAllOrders,
    getOrderById,
    addOrder,
}