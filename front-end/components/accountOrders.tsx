import React from "react";
import { orderInput } from "@/types/orderType"; // Assuming orderInput is the type for an order
import styles from "../styles/OrderDashboard.module.css";

const AccountOrders: React.FC<{ accountOrders: Array<orderInput> }> = ({ accountOrders }) => {
    return (
        <div>
            <h3>Previous Orders</h3>
            {accountOrders.length === 0 ? (
                <p>No past orders</p>
            ) : (
                <div>
                    {accountOrders.map((order, index) => (
                        <div key={index} className={styles.orderItem}>
                            {/* Render order details here */}
                            <p>Order ID: {order.id}</p>
                            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p>Start Date: {new Date(order.startDate).toLocaleDateString()}</p>
                            <p>Price: {order.price}€</p>
                            {/* Add other order details as needed */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AccountOrders;