import React, { useState } from "react";
import styles from "../styles/OrderDashboard.module.css"; // Import a new CSS module for styles
import { orderInput, houseInput } from "@/types/orderType"; // Import the types for orders
import { CustomerInput } from "@/types/customerType";

const OrderDashboard: React.FC<{ customer: CustomerInput }> = ({ customer }) => {
    const [order, setOrder] = useState<orderInput>({
        customer: {
            firstName: customer.firstName,
            lastName: customer.lastName, // Assuming we get the last name from the login response or input
            email: customer.email, // Assuming email is handled elsewhere
        },
        orderDate: new Date(),
        startDate: new Date(),
        price: 0,
        house: {
            address: "",
            type: "",
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            house: {
                ...prevOrder.house,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Order submitted:", order);
        // Handle order submission logic here (e.g., API call)
    };

    return (
        <div className={styles.dashboardContainer}>
            <h2 className={styles.dashboardTitle}>Create an Order</h2>
            <form className={styles.orderForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="orderDate">Order Date:</label>
                    <input
                        type="date"
                        name="orderDate"
                        value={order.orderDate.toISOString().split('T')[0]} // Format date for input
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={order.startDate.toISOString().split('T')[0]} // Format date for input
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={order.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <h3>House Details</h3>
                <div className={styles.formGroup}>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={order.house.address}
                        onChange={handleHouseChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="type">House Type:</label>
                    <select name="type" value={order.house.type} onChange={handleHouseChange} required>
                        <option value="">Select Type</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="cottage">Cottage</option>
                    </select>
                </div>

                <button type="submit" className={styles.submitButton}>Submit Order</button>
            </form>
        </div>
    );
};

export default OrderDashboard;
