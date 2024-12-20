import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CustomerService from '../services/customer.service';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous error message
    setErrorMessage('');

    const loginData = {
      email,
      password
    };

    console.log('Submitting login data:', loginData);

    try {
      const data = await CustomerService.logIn(loginData);
      console.log('Login Success:', data);

      for (const variable in data){
        sessionStorage.setItem(variable, data[variable]);
      }

      // Store the token and user information in session storage
      sessionStorage.setItem('loggedInUser', JSON.stringify(data));

      console.log('Redirecting to account page...');
      router.push('/'); // Redirect to the account page
    } catch (error) {
      console.error('Login Error:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex align-top justify-center bg-white">
      <div className="w-full max-w-md p-6 border border-black rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm text-black">
              Show Password
            </label>
          </div>
          {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-black"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;