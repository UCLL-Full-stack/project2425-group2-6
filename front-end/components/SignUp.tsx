import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CustomerService from '../services/customer.service';

interface SignUpProps {
  onSignUpSuccess: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all fields are filled
    const { firstName, lastName, email, birthday, password } = formData;
    if (!firstName || !lastName || !email || !birthday || !password) {
      setErrorMessage('All fields must be filled in');
      return;
    }

    // Clear error message
    setErrorMessage('');

    // Ensure the birthday is in ISO-8601 format
    const formattedData = {
      ...formData,
      birthday: new Date(formData.birthday).toISOString()
    };

    console.log('Submitting data:', formattedData);

    try {
      const data = await CustomerService.signUp(formattedData);
      console.log('Success:', data);

      // Display success message
      setSuccessMessage('Sign up succeeded');
      setTimeout(() => {
        setSuccessMessage('');
        onSignUpSuccess(); // Call the function to toggle back to the login component
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Something went wrong');
      }
    }
  };

  return (
    <div className="flex align-top justify-center bg-white">
      <div className="w-full max-w-md p-6 border border-black rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="date"
            name="birthday"
            placeholder="Birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mb-2 p-2 border rounded"
          />
          {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
          {successMessage && <p className="mt-2 text-sm text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="w-full py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;