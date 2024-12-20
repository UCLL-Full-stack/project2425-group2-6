import { useState } from "react";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";  // Importing SWR and mutate for data revalidation
import useInterval from "use-interval";
import styles from "@/styles/accountOrders.module.css";  // CSS Modules
import OrderService from "@/services/order.service";  // Order service

type Props = {
  customerId: number;
};

const AccountOrders: React.FC<Props> = ({ customerId }) => {
  const [error, setError] = useState<string | null>(null);  // State for error handling

  // Fetch orders from OrderService
  const fetchOrders = async () => {
    if (swrError) {
        setError(swrError.message || "Failed to fetch orders");
      }
    try {
      const response = await OrderService.getAllOrders();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const ordersData = await response.json();
      const sortedOrdersData = ordersData.sort(
        (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      return sortedOrdersData;
    } catch (err: any) {
      throw new Error(err.message || "Failed to fetch orders");
    }
  };

  // Use SWR hook to fetch orders
  const { data: orders, error: swrError, isLoading } = useSWR(
    `orders-${customerId}`,  // Unique key based on customerId
    fetchOrders
  );

  // Poll orders every 10 seconds
  useInterval(() => {
    mutate(`orders-${customerId}`);  // Trigger SWR revalidation
  }, 10000);  // Poll every 10 seconds

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

  // Display orders or a message if no orders are found
  return (
    <div className={styles.container}>
      <h2 className={styles.ordersHeading}>Past Orders</h2>
      {!orders || orders.length === 0 ? (
        <p className={styles.noOrders}>No orders associated with this account</p>
      ) : (
        <ul className={styles.orderList}>
          {orders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <div>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Start Date:</strong> {new Date(order.startDate).toLocaleDateString()}</p>
                <p><strong>Price:</strong> {order.price}€</p>
              </div>

              <div className={styles.customerDetails}>
                <h4>Customer Details:</h4>
                <p><strong>&emsp;&emsp;Name:</strong> {order.customer.firstName} {order.customer.lastName}</p>
                <p><strong>&emsp;&emsp;Email:</strong> {order.customer.email}</p>
                <p><strong>&emsp;&emsp;Birthday:</strong> {new Date(order.customer.birthday).toLocaleDateString()}</p>
              </div>

              <div className={styles.houseDetails}>
                <h4>House Details:</h4>
                <p><strong>&emsp;&emsp;Type:</strong> {order.house.type}</p>
                <p><strong>&emsp;&emsp;Address:</strong> {order.house.address.houseNumber} {order.house.address.street}, {order.house.address.city}, {order.house.address.state}, {order.house.address.zip}, {order.house.address.country}</p>

                {/* Render Rooms */}
                <p><strong>&emsp;&emsp;Rooms:</strong></p>
                {order.rooms && order.rooms.length > 0 ? (
                  order.rooms.map((room, index) => (
                    <div key={index} className={styles.roomDetails}>
                      <p><strong>&emsp;&emsp;&emsp;&emsp;Room Name:</strong> {room.name}</p>
                      <p><strong>&emsp;&emsp;&emsp;&emsp;Work Description:</strong> {room.workDescription}</p>
                    </div>
                  ))
                ) : (
                  <p>&emsp;&emsp;&emsp;&emsp;No rooms available for this house.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountOrders;
