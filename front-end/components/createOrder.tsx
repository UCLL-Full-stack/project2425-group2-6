import OrderService from '@/services/order.service';
import { prepOrderDto } from '@/types/orderType';
import React, { useState } from 'react';

type createOrderProps = {
  emailProp: string;
};

const CreateOrder: React.FC<createOrderProps> = ({ emailProp }) => {
  const [houseNumber, setHouseNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [startDate, setStartDate] = useState('');
  const [budget, setBudget] = useState('');
  const [type, setType] = useState('Detached'); // Default order type
  const [email, setEmail] = useState(emailProp); // Collecting email address
  const [rooms, setRooms] = useState([{ roomName: '', workDescription: '' }]); // Array of rooms

  const [isFormOpen, setIsFormOpen] = useState(false); // Track the form visibility

  const handleRoomChange = (index: number, field: keyof typeof rooms[0], value: string) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { roomName: '', workDescription: '' }]);
  };

  const removeRoom = (index: number) => {
    if (rooms.length > 1) {
      const updatedRooms = rooms.filter((_, i) => i !== index);
      setRooms(updatedRooms);
    }
  };

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
      rooms: rooms.map((room) => ({
        roomName: room.roomName.trim(),
        workDescription: room.workDescription.trim(),
      })),
    };

    // Log the DTO or send it to the backend
    console.log('Prepared Order DTO:', orderDto);

    // Add your API submission logic here
    OrderService.createOrder(orderDto);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2
        className="text-2xl font-semibold text-center mb-6 text-black cursor-pointer"
        onClick={() => setIsFormOpen(!isFormOpen)} // Toggle form visibility
      >
        {isFormOpen ? 'Order in progress...' : 'Create an Order'}
      </h2>

      {/* Animated form */}
      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${isFormOpen ? 'max-h-screen' : 'max-h-0'}`}
        style={{ maxHeight: isFormOpen ? '100%' : '0' }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* House Details */}
          <div>
            <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-800">
              House Number:
            </label>
            <input
              type="text"
              id="houseNumber"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-800">
              Street:
            </label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-800">
              City:
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-800">
              Zip Code:
            </label>
            <input
              type="text"
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-800">
              Country:
            </label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-800">
              Preferred Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-800">
              Budget:
            </label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-800">
              Order Type:
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="apartment">Apartment</option>
              <option value="detached">Detached</option>
              <option value="semi-detached">Semi-detached</option>
              <option value="terraced">Terraced</option>
              <option value="bungalow">Bungalow</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

                    {/* Dynamic Room Details */}
                    {rooms.map((room, index) => (
            <div key={index} className="border border-gray-400 rounded-lg p-4 space-y-3">
              <p className="font-bold text-gray-800">Room {index + 1}</p>
              <label htmlFor={`roomName-${index}`} className="block text-sm font-medium text-gray-800">
                Room Name:
              </label>
              <input
                type="text"
                id={`roomName-${index}`}
                value={room.roomName}
                onChange={(e) => handleRoomChange(index, 'roomName', e.target.value)}
                required
                className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <label htmlFor={`workDescription-${index}`} className="block text-sm font-medium text-gray-800">
                Work Description:
              </label>
              <input
                type="text"
                id={`workDescription-${index}`}
                value={room.workDescription}
                onChange={(e) => handleRoomChange(index, 'workDescription', e.target.value)}
                required
                className="w-full mt-1 p-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => removeRoom(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove Room
                </button>
                {index === rooms.length - 1 && (
                  <button
                    type="button"
                    onClick={addRoom}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Add Room
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            Create Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
