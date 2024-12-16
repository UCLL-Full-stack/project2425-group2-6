import CustomerService from '@/services/customer.service';
import { statusMessage } from '@/types/statusMessage';
import Router from 'next/router';
import React, { useState } from 'react';

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

        setStatusMessage({ type: 'success', message: 'Redirecting to homeapge...' });

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
    <div className="flex align-top justify-center bg-white">
      <div className="w-full max-w-md p-6 border border-black rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
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
            {emailError && <p className="mt-2 text-sm text-red-500">{emailError}</p>}
          </div>
  
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
            {passwordError && <p className="mt-2 text-sm text-red-500">{passwordError}</p>}
          </div>
  
          {/* Status Message */}
          {statusMessage && (
            <p className={`mt-2 text-sm ${statusMessage.type === 'error' ? 'text-red-500' : 'text-black'}`}>
              {statusMessage.message}
            </p>
          )}
  
          {/* Submit Button */}
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
  
}  

export default LogIn;