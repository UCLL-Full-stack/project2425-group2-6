import React, { useState, useEffect } from "react";
import styles from "../styles/OrderDashboard.module.css";
import { orderInput } from "@/types/orderType";
import { CustomerInput } from "@/types/customerType";
import OrderService from "@/services/order.service";
import AccountOrders from "./AccountOrders";
import CustomerService from "@/services/customer.service";

const OrderDashboard: React.FC<{ customer: CustomerInput }> = ({ customer }) => {
    const [accountOrders, setAccountOrders] = useState<Array<orderInput>>([]);

    const [order, setOrder] = useState<orderInput>({
        customerId: customer.id,
        orderDate: new Date(),
        startDate: new Date(),
        price: 0,
        house: {
            address: "",
            type: "",
        },
    });

    const fetchCustomerOrders = async () => {
        const orders = await CustomerService.getCustomerOrderById(customer.id);
        setAccountOrders(orders || []);
    };

    useEffect(() => {
        fetchCustomerOrders();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            [name]: name === "startDate" ? new Date(value) : value,
        }));
    };

    const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrder(prevOrder => ({
            ...prevOrder,
            house: {
                ...prevOrder.house,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await OrderService.createOrder(order);
        fetchCustomerOrders(); // Refresh orders after submission
    };

    return (
        <div className={styles.dashboardContainer}>
            <h2 className={styles.dashboardTitle}>Create an Order</h2>
            <form className={styles.orderForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={order.startDate.toISOString().split('T')[0]}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price">Budget:</label>
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
                        autoComplete="off"
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

            <AccountOrders accountOrders={accountOrders} />
        </div>
    );
};

export default OrderDashboard;
