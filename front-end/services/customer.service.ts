import { LoginCustomer , CustomerInput } from "../types/customerType.js";

const getAccessToken = (): { message: string, token: string, email: string, fullname: string, role: string } | null => {
  try {
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      return null; // No user data found in session storage
    }

    const parsedUser = JSON.parse(loggedInUser);

    if (parsedUser && typeof parsedUser.token === 'string') {
      return {
        message: parsedUser.message,
        token: parsedUser.token,
        email: parsedUser.email,
        fullname: parsedUser.fullname,
        role: parsedUser.role
      };
    }

    return null; // User data is not available or invalid
  } catch (error) {
    console.error('Error retrieving user data from session storage:', error);
    return null; // Handle potential parsing errors gracefully
  }
};

const getAllCustomers = async () => {
  const token = getAccessToken();
  return fetch(
    process.env.NEXT_PUBLIC_API_URL + "/customers", {
      method: `GET`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.token}`,
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