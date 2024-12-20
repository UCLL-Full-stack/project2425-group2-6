import React, { useState, useEffect } from "react";
import OrderService from "@/services/order.service";
import useInterval from "use-interval";
import useSWR, { mutate } from "swr";

type Props = {
  email: string;
};

const EmployeeOrdersOverview: React.FC<Props> = ({ email }) => {
  const [error, setError] = useState<string | null>(null);

  // SWR to fetch orders for the employee
  const fetchOrders = async (email: string) => {
    if (swrError) {
      setError(swrError.message || "Failed to fetch orders.");
    }
    try {
      const orders = await OrderService.getOrdersByEmployeeEmail(email);
      return orders; // Return fetched orders
    } catch (err: any) {
      throw new Error(err.message || "Failed to fetch orders.");
    }
  };

  // Using SWR to fetch the orders by employee email
  const { data: orders, error: swrError, isLoading } = useSWR(
    email ? [`ordersByEmployee`, email] : null,
    () => fetchOrders(email)
  );

  // Polling the data every 3 seconds using useInterval
  useInterval(() => {
    if (email) {
      mutate([`ordersByEmployee`, email]); // Trigger SWR mutate to refresh orders
    }
  }, 3000);


  // Loading state while orders are being fetched
  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  // Display error message if fetching fails
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Display a message if no orders found
  if (!orders || orders.length === 0) {
    return <p className="text-center">No orders found.</p>;
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
                    {order.customer.firstName} {order.customer.lastName} ({order.customer.email})
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
