import React, { useState, useEffect } from "react";
import OrderService from "@/services/order.service";

type Props = {
  email: string;
};

const EmployeeOrdersOverview: React.FC<Props> = ({ email }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await OrderService.getOrdersByEmployeeEmail(email);
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
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-center text-xl">Your Work Orders Overview</h2>
      {orders.length > 0 ? (
        <div className="overflow-x-auto mt-10">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-10 text-left border-b">Status</th>
                <th className="px-4 py-10 text-left border-b">Customer</th>
                <th className="px-4 py-10 text-left border-b">House</th>
                <th className="px-4 py-10 text-left border-b">Room</th>
                <th className="px-4 py-10 text-left border-b">Work Description</th>
                <th className="px-4 py-10 text-left border-b">Start Date</th>
                <th className="px-4 py-10 text-left border-b">Workers</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="border-t">
                  <td className="px-4 py-10">{order.status}</td>
                  <td className="px-4 py-10">
                    {order.customer.firstName} {order.customer.lastName}
                  </td>
                  <td className="px-4 py-10">
                    {order.house.houseNumber} {order.house.street}, {order.house.city},{" "}
                    {order.house.zip}, {order.house.country}
                  </td>
                  <td className="px-4 py-10">
                    {order.rooms.map((room: any, index: number) => (
                      <div key={index} className="mb-2">
                        <span className="font-semibold">{room.name}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-10">
                    {order.rooms.map((room: any, index: number) => (
                      <div key={index} className="mb-2">
                        {room.workDescription}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-10">
                    {new Date(order.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-10">
                    {order.employees.map((employee: any, index: number) => (
                      <div key={index} className="mb-2">
                        {employee.firstName} {employee.lastName}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No orders found.</p>
      )}
    </div>
  );
};

export default EmployeeOrdersOverview;
