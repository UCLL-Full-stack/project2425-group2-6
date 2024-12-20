import { LoginCustomer , CustomerInput } from "../types/customerType.js";

const getAccessToken = (): { message: string, token: string, email: string, fullname: string, role: string } | null => {
  try {
      
      const message = sessionStorage.getItem('message');
      const token = sessionStorage.getItem('token');
      const email = sessionStorage.getItem('email');
      const fullname = sessionStorage.getItem('fullname');
      const role = sessionStorage.getItem('role');
      
      if (!message || !token || !email || !fullname || !role) {
          throw new Error("No user data found in session storage");
      }


          return {
              message: message,
              token: token,
              email: email,
              fullname: fullname,
              role: role
      }
      } catch (error) {
      console.error('Error retrieving user data from session storage:', error);
      throw new Error("Failed to retrieve user data from session storage");
  }
};

const getAllCustomers = async () => {
  const token = getAccessToken();
  console.log(`Access token: ${token}`);
  return fetch(
    process.env.NEXT_PUBLIC_API_URL + "/customers", {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.token}`,
      },
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

const signUp = async (customer: CustomerInput) => {
  let fetchResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/customers/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    }
  );

  if (!fetchResponse.ok) {
    let errorResponse = await fetchResponse.json();
    throw new Error(errorResponse.errorMessage || 'Something went wrong');
  }

  // If the response is OK, parse and return the data
  return await fetchResponse.json();
};


const CustomerService = {
  getAllCustomers, addCustomer, logIn, signUp,
};

export default CustomerService;