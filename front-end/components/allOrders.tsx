import React, { useState } from 'react';
import OrderService from '@/services/order.service';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const AllOrders: React.FC = () => {
  // Error and loading state
  const [error, setError] = useState<string | null>(null);
  
  // Fetch function for SWR
  const fetchAllOrders = async () => {
    try {
      const fetchedOrders = await OrderService.getAllOrders();
      return fetchedOrders;  // Return fetched orders
    } catch (err: any) {
      throw new Error(err.message || 'Something went wrong'); // Handle errors
    }
  };

  // Using useSWR for data fetching
  const { data: orders, error: swrError, isLoading } = useSWR('getAllOrders', fetchAllOrders);

  // Handle error from SWR hook
  if (swrError) {
    setError(swrError.message || 'Something went wrong');
  }

  // Polling with useInterval
  useInterval(() => {
    mutate('getAllOrders');  // Trigger re-fetch for orders every 3 seconds
  }, 3000);

  // Show loading message if the data is still loading
  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  // Show error message if there is an error
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
                <th className="px-4 py-10 text-left border-b">Order ID</th>
                <th className="px-4 py-10 text-left border-b">Order Date</th>
                <th className="px-4 py-10 text-left border-b">Status</th>
                <th className="px-4 py-10 text-left border-b">Customer</th>
                <th className="px-4 py-10 text-left border-b">Workers</th>
                <th className="px-4 py-10 text-left border-b">Start Date</th>
                <th className="px-4 py-10 text-left border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200 transition-colors`}
                  >
                    <td className="px-4 py-2">
                      <Link href={`/orders/master/${order.id}`}>
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/orders/master/${order.id}`}>
                        {new Date(order.orderDate).toLocaleDateString()}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/orders/master/${order.id}`}>
                        <span className={`font-bold ${order.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {order.status}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/orders/master/${order.id}`}>
                        {order.customer.firstName} {order.customer.lastName}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/orders/master/${order.id}`}>
                        {order.employees && order.employees.length > 0 ? (
                          order.employees.map((employee: any, idx: number) => (
                            <div key={idx}>
                              {employee.firstName} {employee.lastName}
                            </div>
                          ))
                        ) : (
                          <span>No workers assigned</span>
                        )}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/orders/master/${order.id}`}>
                        {new Date(order.startDate).toLocaleDateString()}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      <Link href={`/orders/master/${order.id}`}>
                        ${order.price.toFixed(2)}
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-2 text-center">No orders available</td>
                </tr>
              )}
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
