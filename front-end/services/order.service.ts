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

const toggleEmployee = async (orderId: string, email: string) => {
    try {
      const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/employee/toggle/${email}/${orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      return (await response).json();
    }
    catch (error) {
      console.error("Error toggling employee:", error);
      throw new Error("Failed to toggle employee. Please try again later.");
    }
};

const deleteOrder = async (orderId: string | number) => {
  try {
    const id = typeof orderId === "string" ? parseInt(orderId) : orderId;
    if (isNaN(id)) throw new Error("Invalid order ID");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order. Please try again later.");
  }
};

// orderRouter.put("/status/:id", async (req, res) => {
//   try {
//     const orderId = parseInt(req.params.id);
//     const status = req.body.status;
//     const result = await orderService.modifyOrderStatus(orderId, status);
//     res.status(200).json(result);
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(400).json({ error: error.message });
//     }
//   }
// });

const modifyOrderStatus = async (orderId: number, status: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error modifying order status:", error);
    throw new Error("Failed to modify order status. Please try again later.");
  }
};

const OrderService = {
    createOrder,
    getOrdersByEmail,
    getAllOrders,
    getOrderById,
    getOrdersByEmployeeEmail,
    toggleEmployee,
    deleteOrder,
    modifyOrderStatus,
  };

export default OrderService;