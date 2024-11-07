import { useEffect, useState } from "react";
import { orderInput } from "@/types/orderType";
import styles from "@/styles/accountOrders.module.css"; // Correct way to import CSS modules

type Props = {
    customerId: number;
};

const AccountOrders: React.FC<Props> = ({ customerId }) => {
    const [orders, setOrders] = useState<any[]>([]); // State to store orders
    const [error, setError] = useState<string | null>(null); // State to store any errors

    // Function to fetch orders by customerId
    const getOrdersByCustomerId = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}/orders`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const ordersData = await response.json();
            const sortedOrdersData = ordersData.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
            console.log(sortedOrdersData);
            setOrders(sortedOrdersData); // Update the orders state with the fetched data
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            setError("Failed to fetch orders"); // Set error state
        }
    };

    // Fetch orders when the component mounts
    useEffect(() => {
        getOrdersByCustomerId();
    }, [customerId]); // Run this effect when customerId changes

    return (
        <div className={styles.container}>
            <h2 className={styles.ordersHeading}>Past Orders</h2>
            {error && <p className={styles.error}>{error}</p>}
            {!orders ? (
                <p className={styles.loading}>Loading orders...</p>
            ) : orders.length === 0 ? (
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
                                    <>
                                        {order.rooms.map((room, index) => (
                                            <div key={index} className={styles.roomDetails}>
                                                <p><strong>&emsp;&emsp;&emsp;&emsp;Room Name:</strong> {room.name}</p>
                                                <p><strong>&emsp;&emsp;&emsp;&emsp;Work Description:</strong> {room.workDescription}</p>
                                            </div>
                                        ))}
                                    </>
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
