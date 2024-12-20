import React, { useState } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';
import OrderService from '@/services/order.service';

const AllOrders: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  // Fetch function for SWR
  const fetchAllOrders = async () => {
    try {
      const fetchedOrders = await OrderService.getAllOrders();
      console.log('Fetched Orders:', fetchedOrders);
      return fetchedOrders;
    } catch (err: any) {
      throw new Error(err.message || 'Something went wrong');
    }
  };

  // Using SWR for data fetching
  const { data: orders, error: swrError, isLoading } = useSWR('getAllOrders', fetchAllOrders);

  if (swrError) {
    setError(swrError.message || 'Something went wrong');
  }

  // Polling with useInterval
  useInterval(() => {
    mutate('getAllOrders');
  }, 3000);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-center text-xl">All Orders</h2>
      {orders && orders.length > 0 ? (
        <div className="overflow-x-auto mt-10">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b">Room ID</th>
                <th className="px-4 py-2 text-left border-b">Room Name</th>
                <th className="px-4 py-2 text-left border-b">Work Description</th>
                <th className="px-4 py-2 text-left border-b">House Address</th>
                <th className="px-4 py-2 text-left border-b">Order ID</th>
                <th className="px-4 py-2 text-left border-b">Order Date</th>
                <th className="px-4 py-2 text-left border-b">Start Date</th>
                <th className="px-4 py-2 text-left border-b">Price</th>
                <th className="px-4 py-2 text-left border-b">Order Status</th>
                <th className="px-4 py-2 text-left border-b">Customer</th>
                <th className="px-4 py-2 text-left border-b">Assigned Employees</th>
              </tr>
            </thead>
            <tbody>
  {Object.values(
    orders.reduce((acc: { [key: string]: any }, room: any) => {
      const orderId = room.order?.id;

      if (!acc[orderId]) {
        acc[orderId] = {
          ...room,
          rooms: [{ id: room.id, name: room.name, workDescription: room.workDescription }],
        };
      } else {
        acc[orderId].rooms.push({
          id: room.id,
          name: room.name,
          workDescription: room.workDescription,
        });
      }

      return acc;
    }, {})
  ).map((orderGroup: any, index: number) => {
    const {
      order = {},
      house = {},
      rooms = [],
    } = orderGroup;

    const {
      id: orderId,
      orderDate,
      startDate,
      price,
      status,
      customer = {},
      employees = [],
    } = order;

    const { firstName: customerFirstName, lastName: customerLastName } = customer;

    const {
      houseNumber = 'Unknown',
      street = '',
      city = '',
      zip = '',
      country = '',
    } = house;

    return (
      <tr
        key={orderId}
        className={`cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200 transition-colors`}
      >
        {/* Room IDs */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            {rooms.map((r: any) => r.id).join(', ')}
          </Link>
        </td>

        {/* Room Names */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            {rooms.map((r: any) => r.name).join(', ')}
          </Link>
        </td>

        {/* Work Descriptions */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            {rooms.map((r: any) => r.workDescription).join('; ')}
          </Link>
        </td>

        {/* House Address */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            {`${houseNumber}, ${street}, ${city}, ${zip}, ${country}`}
          </Link>
        </td>

        {/* Order ID */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>{orderId}</Link>
        </td>

        {/* Order Date */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            {orderDate ? new Date(orderDate).toLocaleDateString() : 'No Date'}
          </Link>
        </td>

        {/* Start Date */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            {startDate ? new Date(startDate).toLocaleDateString() : 'No Start Date'}
          </Link>
        </td>

        {/* Price */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            {price ? `$${price.toFixed(2)}` : '$0.00'}
          </Link>
        </td>

        {/* Order Status */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            <span
              className={`font-bold ${
                status.toLowerCase() === 'approved' ? 'text-green-600' : 'text-yellow-600'
              }`}
            >
              {status}
            </span>
          </Link>
        </td>

        {/* Customer */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            {`${customerFirstName || 'Unknown'} ${customerLastName || ''}`.trim()}
          </Link>
        </td>

        {/* Assigned Employees */}
        <td className="px-4 py-2">
          <Link href={`/orders/master/${orderId}`}>
            {employees.length > 0 ? (
              employees.map((employee: any) => (
                <div key={employee.id}>
                  {`${employee.firstName} ${employee.lastName}`.trim()}
                </div>
              ))
            ) : (
              <span className="text-gray-500">No Employees Assigned</span>
            )}
          </Link>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AllOrders;
