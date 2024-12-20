import OrderService from '@/services/order.service';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

type orderHistoryProps = {
  email: string;
};

const OrderHistory: React.FC<orderHistoryProps> = ({ email }) => {
  const [error, setError] = useState<string | null>(null);

  // Function to fetch orders from the OrderService
  const fetchOrders = async () => {
    if (swrError) {
      setError(swrError.message || 'Something went wrong while fetching orders.');
    }
    try {
      const fetchedOrders = await OrderService.getAllOrders();
      
      // Ensure fetchedOrders is an array
      if (!Array.isArray(fetchedOrders)) {
        throw new Error('Not authorized to view orders');
      }

      return fetchedOrders;
    } catch (err: any) {
      throw new Error(err.message || 'Something went wrong while fetching orders.');
    }
  };

  // Use SWR to fetch the orders
  const { data: orders, error: swrError, isLoading } = useSWR('getAllOrders', fetchOrders);

  // Polling orders data every 3 seconds
  useInterval(() => {
    mutate('getAllOrders'); // Trigger SWR mutate to refresh orders
  }, 3000);


  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-20">
        <p className="text-blue-500 text-lg font-medium">Loading orders...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-20">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  // Display orders if available
  if (!orders || orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-20">
        <p className="text-gray-500 text-lg font-medium">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="pl-10 pr-10 text-center mt-20 mb-10">
      <h2 className="text-2xl font-semibold text-black mb-6">All orders belonging to {email}</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300" role="region" aria-live="polite">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 p-6">No orders found for this customer.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">House Address</th>
                <th className="px-4 py-2">Room Names</th>
                <th className="px-4 py-2">Start Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className={`cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200 transition-colors`}
                >
                  <td className="px-4 py-2">
                    <Link href={`/orders/${order.orderId}`}>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <Link href={`/orders/${order.orderId}`}>
                      <span
                        className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}
                      >
                        {order.status}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <Link href={`/orders/${order.orderId}`}>${order.price.toFixed(2)}</Link>
                  </td>
                  <td className="px-4 py-2">
                    <Link href={`/orders/${order.orderId}`}>
                      {order.house?.houseNumber} {order.house?.street}, {order.house?.city}, {order.house?.zip},{' '}
                      {order.house?.country}
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    {/* Map through the rooms array and display the room names */}
                    <Link href={`/orders/${order.orderId}`}>
                      {order.rooms?.length > 0
                        ? order.rooms.map((room: any, index: number) => (
                            <span key={room.roomId}>
                              {room.roomName}
                              {index < order.rooms.length - 1 ? ', ' : ''}
                            </span>
                          ))
                        : 'No rooms available'}
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <Link href={`/orders/${order.orderId}`}>
                      {new Date(order.startDate).toLocaleDateString()}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
