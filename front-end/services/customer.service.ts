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




const CustomerService = {
  getAllCustomers, addCustomer, attemptSignIn,
};

export default CustomerService;