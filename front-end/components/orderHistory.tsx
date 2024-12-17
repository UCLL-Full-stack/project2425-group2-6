import OrderService from '@/services/order.service';
import React, { useState, useEffect } from 'react';

type orderHistoryProps = {
  email: string;
};

const OrderHistory: React.FC<orderHistoryProps> = ({ email }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await OrderService.getOrdersByEmail(email);
        console.log('Fetched Orders:', fetchedOrders);
        setOrders(fetchedOrders);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <p className="text-blue-500 text-lg font-medium">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-20">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="pl-10 pr-10 text-center mt-20 mb-10">
      <h2 className="text-2xl font-semibold text-black mb-6">All orders belonging to {email}</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
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
                <th className="px-4 py-2">Room Name</th>
                <th className="px-4 py-2">Start Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.orderId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                  <td className="px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className={`px-4 py-2 font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.status}
                  </td>
                  <td className="px-4 py-2">${order.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {order.house.houseNumber} {order.house.street}, {order.house.city}, {order.house.zip}, {order.house.country}
                  </td>
                  <td className="px-4 py-2">{order.room.name}</td>
                  <td className="px-4 py-2">{new Date(order.startDate).toLocaleDateString()}</td>
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
