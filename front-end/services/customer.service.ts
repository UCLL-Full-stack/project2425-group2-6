import { LoginCustomer } from "@/types/customerType";
import { CustomerInput } from "@/types/customerType";

const getAllCustomers = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL + "/customers", {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
};

const addCustomer = async (customer: CustomerInput) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/customers", {
      method: `POST`,
      headers: {
          'Content-Type': 'application/json',
      },
      // Convert the customer object to a JSON string
      body: JSON.stringify(customer), 
  });
};

// Frontend Service
const attemptSignIn = async (customer: LoginCustomer) => {
  const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/customers/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(customer),
      }
  );

  // If the response is OK, parse and return the data
  return await response.json();
};

const getCustomerOrderById = async (customerId: number) => {
  try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers/orders/${customerId}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );

      // Check if the response is OK (status code in the range 200-299)
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Fetched Orders:", data); // Log the orders to see if they are fetched correctly
      return data; // Return the parsed data
  } catch (error) {
      console.error("Error fetching customer orders:", error);
      return []; // Return an empty array or handle the error appropriately
  }
};



const CustomerService = {
  getAllCustomers, addCustomer, attemptSignIn, getCustomerOrderById,
};

export default CustomerService;