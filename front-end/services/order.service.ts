import { prepOrderDto } from "../types/orderType.js";
import { create } from "domain";

const createOrder = async (prepOrderDto : prepOrderDto) => {
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/orders", {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prepOrderDto),
        }
    );
}

// const getAllOrders = async () => {
//     return fetch(process.env.NEXT_PUBLIC_API_URL + "/orders", {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
// };

const getAllOrders = async () => {
    try {
      const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/orders`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return (await response).json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders. Please try again later.");
    }
};

const getOrdersByEmail = async (email: string) => {
    try {
      const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/email/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return (await response).json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders. Please try again later.");
    }
}

const getOrderById = async (orderId: string) => {
    try {
      const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/${orderId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return (await response).json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders. Please try again later.");
    }
};

const getOrdersByEmployeeEmail = async (email: string) => {
    try {
      const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/employee/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return (await response).json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders. Please try again later.");
    }
};

const OrderService = {
    createOrder,
    getOrdersByEmail,
    getAllOrders,
    getOrderById,
    getOrdersByEmployeeEmail,
  };

export default OrderService;