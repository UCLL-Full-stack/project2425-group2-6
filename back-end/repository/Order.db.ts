import { log } from "console";
import { Customer } from "../model/customer";
import { House } from "../model/house";
import { Order } from "../model/order";
import HouseDb from "./House.db";
import CustomerDb from "./Customer.db";
import { Room } from "../model/room";
import RoomDb from "./Room.db";
import database from "../util/database";

const getAllOrders = async (): Promise<Array<Order>> => {
    const ordersPrisma = await database.order.findMany({
        include: {
            customer: true,
            house: true,
            employees: true,
        }
    });
    return ordersPrisma.map((orderPrisma) => Order.from(orderPrisma));
}

const getOrderByCustomerEmail = async (email: string): Promise<Array<Order>> => {
    //console.log("Fetching customer by email:", email);
    const customer = await CustomerDb.getCustomerByEmail(email);
    //console.log("Customer fetched:", customer);

    if (!customer) {
        throw new Error("Customer not found");
    }

    //console.log("Fetching orders for customer ID:", customer.getId());
    const ordersPrisma = await database.order.findMany({
        where: {
            customerId: customer.getId()
        },
        include: {
            customer: true,
            house: true,
            employees: true,
        }
    });
    //console.log("Orders fetched from database:", ordersPrisma);

    const orders = ordersPrisma.map((orderPrisma) => Order.from(orderPrisma));
    //console.log("Orders mapped to Order class instances:", orders);

    return orders;
};

const getOrderByCustomerId = async (customerId: number): Promise<Array<Order>> => {
    const ordersPrisma = await database.order.findMany({
        where: {
            customerId: customerId
        },
        include: {
            customer: true,
            house: true,
            employees: true
        }
    });
    return ordersPrisma.map((orderPrisma) => Order.from(orderPrisma));
};

const createOrder = async (customerId: number, houseId: number, startDate: Date, budget: number): Promise<Order> => {
    //console.log("Starting createOrder function");
    //console.log("Fetching customer with ID:", customerId);
    const customer = await CustomerDb.getCustomerById(customerId);
    //console.log("Customer fetched:", customer);

    //console.log("Fetching house with ID:", houseId);
    const house = await HouseDb.getHouseById(houseId);
    //console.log("House fetched:", house);

    if (!customer) {
        throw new Error("Customer not found");
    }

    if (!house) {
        throw new Error("House not found");
    }

    console.log("Creating order with data:", {
        customerId,
        houseId,
        startDate,
        budget,
        status: "pending"
    });

    const orderPrisma = await database.order.create({
        data: {
            customer: {
                connect: { id: customerId }
            },
            house: {
                connect: { id: houseId }
            },
            employees: {
                connect: { id: 2 } // Assuming employee ID 2 is valid
            },
            startDate: startDate,
            price: budget,
            status: "pending" // Default status
        },
        include: {
            customer: true,
            house: true,
            employees: true
        },
    });

    //console.log("Order created in database:", orderPrisma);

    const order = Order.from(orderPrisma);
    //console.log("Order mapped to Order class instance:", order);

    return order;
};

const getOrdersByEmployeeEmail = async (email: string) => {
    const rooms = await database.room.findMany({
        where: {
            order: {
                employees: {
                    some: {
                        email: email
                    }
                }
            }
        },
        include: {
            house: true,
            order: {
                include: {
                    customer: true, // Include customer details
                    employees: true, // Include employee details
                    house: true,    // Include house details
                    rooms: true,    // Include all rooms
                }
            }
        }
    });

    return rooms; // Return raw data as retrieved from the database
};

// const getOrderById = async (orderId: number): Promise<Order> => {
//     const orderPrisma = await database.order.findUnique({
//         where: { id: orderId },
//         include: {
//             customer: true,
//             house: true,
//             rooms: {
//                 include: {
//                     house: true
//                 }}
//         }
//     });

//     if (!orderPrisma) {
//         throw new Error("Order not found");
//     }

//     return Order.from(orderPrisma);
// };

const getOrderById = async (orderId: number) => {
    const rooms = await database.room.findMany({
      where: {
        order: {
          id: orderId, // Filter by orderId
        },
      },
      include: {
        house: true,
        order: {
          include: {
            customer: true, // Include customer details
            employees: true, // Include employee details
            house: true,    // Include house details
            rooms: true,    // Include all rooms
          },
        },
      },
    });
    
    return rooms; // Return raw data as retrieved from the database
  };

  const removeEmployeeByEmailFromOrder = async (orderId: number, email: string) => {
    const order = await database.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        employees: true,
      },
    });
  
    if (!order) {
      throw new Error(`No order found with ID: ${orderId}`);
    }
  
    const employee = order.employees.find((employee) => employee.email === email);
  
    if (!employee) {
      throw new Error(`No employee found with email: ${email}`);
    }
  
    await database.order.update({
      where: {
        id: orderId,
      },
      data: {
        employees: {
          disconnect: {
            email: email,
          },
        },
      },
    });
  };

  const addEmployeeByEmailToOrder = async (orderId: number, email: string) => {
    const order = await database.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        employees: true,
      },
    });
  
    if (!order) {
      throw new Error(`No order found with ID: ${orderId}`);
    }
  
    const employee = order.employees.find((employee) => employee.email === email);
  
    if (employee) {
      throw new Error(`Employee already exists in order with email: ${email}`);
    }
  
    await database.order.update({
      where: {
        id: orderId,
      },
      data: {
        employees: {
          connect: {
            email: email,
          },
        },
      },
    });
  };
  
export default {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByCustomerId,
    getOrderByCustomerEmail,
    getOrdersByEmployeeEmail,
    removeEmployeeByEmailFromOrder,
    addEmployeeByEmailToOrder,
}   