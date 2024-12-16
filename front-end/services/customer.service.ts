import { LoginCustomer , CustomerInput } from "../types/customerType.js";


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
const logIn = async (customer: LoginCustomer) => {
  let fetchResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customers/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    }
  );

  let response = await fetchResponse.json();

  if (!response.token) {
    throw new Error('Invalid credentials!');
  }

  // If the response is OK, parse and return the data
  return response;
};




const CustomerService = {
  getAllCustomers, addCustomer, logIn,
};

export default CustomerService;