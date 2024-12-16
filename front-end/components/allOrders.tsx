import React, { useState, useEffect } from 'react';
import OrderService from '@/services/order.service';

const AllOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await OrderService.getAllOrders();
        setOrders(fetchedOrders);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  if (loading) {
    return <p className='text-center'>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='p-10'>
      <h2 className='font-bold text-center text-xl'>All Orders</h2>
      {orders.length > 0 ? (
        <div className="overflow-x-auto mt-10">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-10 text-left border-b">Order ID</th>
                <th className="px-4 py-10 text-left border-b">Order Date</th>
                <th className="px-4 py-10 text-left border-b">Status</th>
                <th className="px-4 py-10 text-left border-b">Customer</th>
                <th className="px-4 py-10 text-left border-b">House</th>
                <th className="px-4 py-10 text-left border-b">Type</th>
                <th className="px-4 py-10 text-left border-b">Start Date</th>
                <th className="px-4 py-10 text-left border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-10">{order.id}</td>
                  <td className="px-4 py-10">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="px-4 py-10">{order.status}</td>
                  <td className="px-4 py-10">{order.customer.firstName} {order.customer.lastName}</td>
                  <td className="px-4 py-10">
                    {order.house.houseNumber} {order.house.street}, {order.house.city}, {order.house.zip}, {order.house.country}
                  </td>
                  <td className="px-4 py-10">{order.house.type}</td>
                  <td className="px-4 py-10">{new Date(order.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-10">${order.price}</td>
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
