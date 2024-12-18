import React, { useState, useEffect } from 'react';
import OrderService from '@/services/order.service';
import Link from 'next/link';

const AllOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]); // Store the fetched orders
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await OrderService.getAllOrders();
        setOrders(fetchedOrders); // Set the fetched orders
        console.log(fetchedOrders);
      } catch (err: any) {
        setError(err.message || 'Something went wrong'); // Handle errors
      } finally {
        setLoading(false); // Set loading state to false after data is fetched
      }
    };

    fetchAllOrders(); // Fetch all orders on component mount
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>; // Loading message
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>; // Error message
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-center text-xl">All Orders</h2>
      {orders.length > 0 ? (
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
            {orders.map((order, index) => (
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
            ))}
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
