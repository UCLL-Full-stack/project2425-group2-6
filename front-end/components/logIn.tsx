import React, { useState } from 'react';
import CustomerService from '@/services/customer.service';
import { statusMessage } from '@/types/statusMessage';
import Router from 'next/router';
import Link from 'next/link';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [statusMessage, setStatusMessage] = useState<statusMessage>(null);

  const router = Router;

  const validate = (): boolean => {
    setEmailError('');
    setPasswordError('');
    setStatusMessage(null);

    if (!email && email.trim().length === 0) {
      setEmailError('Email is required');
      return false;
    }

    if (!password && password.trim().length === 0) {
      setPasswordError('Password is required');
      return false;
    }

    setStatusMessage({ type: 'success', message: 'Redirecting to homepage...' });

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    console.log('Form submitted with values:');
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const logIn = await CustomerService.logIn({ email, password });
      console.log(logIn);
      sessionStorage.setItem("loggedInUser", JSON.stringify(
        {
          token: logIn.token,
          fullname: logIn.fullname,
          email: email,
          role: logIn.role
        }
      ));
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-gray-300 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-7">Log In</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="flex text-sm font-medium">Email</label>
            <input
              className="w-full px-4 mt-2 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {emailError && <p className="mt-2 text-sm text-red-500">{emailError}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="flex text-sm font-medium">Password</label>
            <input
              className="w-full px-4 mt-2 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {passwordError && <p className="mt-2 text-sm text-red-500">{passwordError}</p>}
          </div>

          {/* Status Message */}
          {statusMessage && (
            <p className={`mt-4 text-sm ${statusMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {statusMessage.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Log In
          </button>

            <Link href="/signUp">
                <button
                type="submit"
                className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                Sign Up
                </button>
            </Link>
        </form>
        
      
      </div>
    </div>
  );
};

export default LogIn;