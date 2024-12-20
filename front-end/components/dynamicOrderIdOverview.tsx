import { useEffect, useState } from "react";
import OrderService from "@/services/order.service";
import { useRouter } from "next/router";
import useInterval from "use-interval";
import useSWR, { mutate } from "swr";


const OrderIdOverviewPage: React.FC = () => {
  const router = useRouter();
  const { orderId } = router.query;

  // Local state for error handling
  const [error, setError] = useState<string | null>(null);

  // SWR to fetch order details based on orderId
  const fetchOrderById = async (orderId: string) => {
    if (orderError) {
      setError(orderError.message || "Failed to fetch the order.");
    }
    try {
      const fetchedOrder = await OrderService.getOrderById(Number(orderId));
      return fetchedOrder; // Return the fetched order
    } catch (err: any) {
      throw new Error(err.message || "Failed to fetch the order.");
    }
  };

  const { data: order, error: orderError, isLoading } = useSWR(
    orderId ? [`orderDetails`, orderId] : null,
    () => fetchOrderById(orderId as string)
  );

  // Polling with useInterval to refresh the order data every 3 seconds
  useInterval(() => {
    if (orderId) {
      mutate([`orderDetails`, orderId]); // Trigger SWR mutate to refresh order data
    }
  }, 3000);


  // Loading state while fetching
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-500 text-lg font-semibold">Loading order details...</p>
      </div>
    );
  }

  // Error state if fetching fails
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  // If no order is found
  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg font-semibold">Order not found.</p>
      </div>
    );
  }
    
      return (
        <>
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Order Overview</h1>
          
          {/* Order Details */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-700">Order Details</h2>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Order ID:</span> {order.orderId}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Status:</span> {order.status}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Order Date:</span> {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Preffered Start Date:</span> {new Date(order.startDate).toLocaleDateString()}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Preferred Price:</span> ${order.price.toFixed(2)}
              </p>
            </div>
          </section>
    
          {/* House Details */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-700">House Details</h2>
            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Address:</span> {order.house.houseNumber} {order.house.street}, {order.house.city}, {order.house.zip}, {order.house.country}
              </p>
              <p className="text-lg">
                <span className="font-semibold">House Type:</span> {order.house.type}
              </p>
            </div>
          </section>
    
          {/* Rooms Details */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-700">Rooms</h2>
            <ul className="space-y-4">
              {order.rooms.map((room: any, index: number) => (
                <li key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
                  <p className="text-lg">
                    <span className="font-semibold">Room Name:</span> {room.name}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Work Description:</span> {room.workDescription}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          {/* Employee Details
          {order.employee && (
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-700">Employee Details</h2>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-semibold">Assigned Employee:</span> {order.employee.firstName} {order.employee.lastName}
                </p>
              </div>
            </section>
          )} */}
        </div>
        </>
      );
}

export default OrderIdOverviewPage;
