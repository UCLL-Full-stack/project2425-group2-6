import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    password: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the birthday is in ISO-8601 format
    const formattedData = {
      ...formData,
      birthday: new Date(formData.birthday).toISOString()
    };

    fetch('http://localhost:3000/customers/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      router.push('/account');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-10">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="mb-2 p-2 border rounded" />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="mb-2 p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="mb-2 p-2 border rounded" />
        <input type="date" name="birthday" placeholder="Birthday" value={formData.birthday} onChange={handleChange} className="mb-2 p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="mb-2 p-2 border rounded" />
        <button type="submit" className="w-1/3 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600">
          Sign Up
        </button>
      </form>
      <div className="text-center mb-10">
        <Link href="/account">
          <button className="w-1/3 py-3 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 text-center">
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;