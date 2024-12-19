import { stringify } from "querystring";
import { prepOrderDto } from "../types/orderType.js";
import { create } from "domain";

const createOrder = async (prepOrderDto : prepOrderDto) => {
   const token = getAccessToken(); 
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/orders", {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token?.token}`,
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

const getAccessToken = (): { message: string, token: string, email: string, fullname: string, role: string } | null => {
  try {
      const loggedInUser = sessionStorage.getItem('loggedInUser');

      if (!loggedInUser) {
          console.error("No logged-in user found in session storage.");
          return null; // No user data found in session storage
      }

      const parsedUser = JSON.parse(loggedInUser);
      console.log("Parsed user data:", parsedUser);

      if (parsedUser && typeof parsedUser.token === 'string') {
          return {
              message: parsedUser.message,
              token: parsedUser.token,
              email: parsedUser.email,
              fullname: parsedUser.fullname,
              role: parsedUser.role
          };
      }

      console.error("User data is invalid or missing required fields.");
      return null; // User data is not available or invalid
  } catch (error) {
      console.error('Error retrieving user data from session storage:', error);
      return null; // Handle potential parsing errors gracefully
  }
};




const getAllOrders = async () => {
  const token = getAccessToken(); // Get token
  const email = token?.email;  // Get email from the token
  const role = token?.role;    // Get role from the token

  console.log("Fetching orders with email:", email, "and role:", role);

  if (!email || !role) {
      throw new Error("Email and role must be available to fetch orders.");
  }

  try {
      // Send the request with email and role as query parameters
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders?email=${email}&role=${role}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token?.token}`,
          }
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      return await response.json(); // Return the fetched orders
  } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders. Please try again later.");
  }
};


const getOrdersByEmail = async (email: string) => {
  const token = getAccessToken();
    try {
      const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/email/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.token}`,
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
  const token = getAccessToken();
    try {
      const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/${orderId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.token}`,
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
  const token = getAccessToken();
    try {
      const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/employee/${email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.token}`,
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
  const token = getAccessToken();
    try {
      const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/orders/employee/toggle/${email}/${orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token?.token}`,
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
  const token = getAccessToken();
  try {
    const id = typeof orderId === "string" ? parseInt(orderId) : orderId;
    if (isNaN(id)) throw new Error("Invalid order ID");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order. Please try again later.");
  }
};

const modifyOrderStatus = async (orderId: number, status: string) => {
  const token = getAccessToken();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.token}`,
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