import OrderService from '@/services/order.service';
import { prepOrderDto } from '@/types/orderType';
import React, { useState } from 'react';


type createOrderProps = {
    emailProp: string;
};

const CreateOrder: React.FC<createOrderProps> = ({emailProp}) => {
    const [houseNumber, setHouseNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [budget, setBudget] = useState('');
    const [type, setType] = useState('Detached'); // Default order type
    const [email, setEmail] = useState(emailProp); // Collecting email address
    const [roomName, setRoomName] = useState('');
    const [workDescription, setWorkDescription] = useState('');
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      // Prepare the DTO object
      const orderDto: prepOrderDto = {
        email: email,
        startDate: new Date(startDate), // Convert to Date object
        budget: Number(budget), // Convert to number
        houseNumber: houseNumber.trim(),
        street: street.trim(),
        city: city.trim(),
        zip: zip.trim(),
        country: country.trim(),
        type: type.trim(), // Include type
        roomName : roomName.trim(),
        workDescription : workDescription.trim()
      };
  
      // Log the DTO or send it to the backend
      console.log('Prepared Order DTO:', orderDto);
  
      // Add your API submission logic here
      OrderService.createOrder(orderDto);
    };
  
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Create Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-600">
              House Number:
            </label>
            <input
              type="text"
              id="houseNumber"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-600">
              Street:
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-600">
              City:
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-600">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-600">
              Country:
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
              Preferred Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-600">
              Budget:
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-600">
              Order Type:
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            >
                <option value="apartment">Apartment</option>
                <option value="detached">Detached</option>
                <option value="semi-detached">Semi-detached</option>
                <option value="terraced">Terraced</option>
                <option value="bungalow">Bungalow</option>
                <option value="townhouse">Townhouse</option>
            </select>
          </div>

          <div className='border border-gray-300 rounded-lg p-4'>
            <p className='font-bold'>Room</p>
            <label htmlFor='roomName' className='block text-sm font-medium text-gray-600'>
                Room name:
            </label>
            <input type='text' id='roomName' className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none' 
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            />
            <label htmlFor='workDescription' className='block text-sm font-medium text-gray-600'>
                Work description:
            </label>
            <input type='text' id='workDescription' className='w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none' 
            value = {workDescription}
            onChange = {(e) => setWorkDescription(e.target.value)}
            required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Create Order
          </button>
        </form>
      </div>
    );
  };
  
  export default CreateOrder;