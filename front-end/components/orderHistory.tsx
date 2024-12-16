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
          setError(err.message || "Something went wrong");
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
      <div className="flex flex-col max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-700 text-center mb-6">Customer Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found for this customer.</p>
        ) : (
          <ul className="divide-y divide-gray-200 text-center">
            {orders.map((order) => (
              <li key={order.id} className="py-4 flex items-start">
                <div className="w-full">
                  {/* <p className="text-sm font-medium text-gray-700">
                    Order ID: <span className="font-bold text-gray-800">{order.id}</span>
                  </p> */}
                  <p className="font-bold text-sm text-gray-700 mt-1">
                    Order Date: <span className="text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Address: {order.house.houseNumber}, {order.house.street}, {order.house.city}, {order.house.zip}, {order.house.country}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Start Date: <span className="text-gray-600">{new Date(order.startDate).toLocaleDateString()}</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Status: <span className={`font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Price: <span className="font-bold">${order.price.toFixed(2)}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default OrderHistory;