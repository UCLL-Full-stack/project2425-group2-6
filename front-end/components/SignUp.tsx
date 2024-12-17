import React, { useState } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the birthday is in ISO-8601 format
    const formattedData = {
      ...formData,
      birthday: new Date(formData.birthday).toISOString()
    };

    console.log('Submitting data:', formattedData);

    try {
      const response = await fetch('http://localhost:3000/customers/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        setErrorMessage(errorData.errorMessage || 'Something went wrong');
        return;
      }

      const data = await response.json();
      console.log('Success:', data);
      console.log('Redirecting to login page...');
      onSignUpSuccess(); // Call the function to toggle back to the login component
    } catch (error) {
      console.error('Error:', error);
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
        <h2 className="text-2xl font-bold text-center text-black mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="mb-2 p-2 border rounded" />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="mb-2 p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="mb-2 p-2 border rounded" />
                <input type="date" name="birthday" placeholder="Birthday" value={formData.birthday} onChange={handleChange} className="mb-2 p-2 border rounded" />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="mb-2 p-2 border rounded" />
                {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
                <button type="submit" className="w-full py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-black"
                >
                Sign Up
                </button>
            </form>
        </div>
    </div>
  );
};

export default SignUp;