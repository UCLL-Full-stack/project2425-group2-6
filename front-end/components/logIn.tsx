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
    <div>
      <h1 className="text-center text-4xl font-bold mb-10">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4 w-full max-w-md">
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

        <div className="mb-4 w-full max-w-md">
          <label className="flex text-sm font-medium">Password</label>
          <input
            className="w-full px-4 mt-2 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {passwordError && <p className="mt-2 text-sm text-red-500">{passwordError}</p>}
        </div>

        <div className="mb-4 flex items-center w-full max-w-md">
          <input
            type="checkbox"
            id="showPassword"
            className="mr-2"
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          <label htmlFor="showPassword" className="text-sm font-medium">Show Password</label>
        </div>

        {statusMessage.message && (
          <p className={`mt-4 text-sm ${statusMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {statusMessage.message}
          </p>
        )}

        <button
          type="submit"
          className="w-1/3 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;