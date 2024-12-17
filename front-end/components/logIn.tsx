import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    try {
      // Simulate login success
      setStatusMessage({ type: 'success', message: 'Login successful!' });
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatusMessage({ type: 'error', message: 'Login failed. Please try again.' });
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
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
            {passwordError && <p className="mt-2 text-sm text-red-500">{passwordError}</p>}
          </div>

          {/* Show Password Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-sm font-medium text-black">
              Show Password
            </label>
          </div>

          {/* Status Message */}
          {statusMessage.message && (
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
};

export default LogIn;