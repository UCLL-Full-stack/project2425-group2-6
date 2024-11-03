import React, { useState } from "react";
import { orderInput } from "@/types/orderType";
import styles from "../styles/OrderDashboard.module.css";

const AccountOrders: React.FC<{ accountOrders: Array<orderInput> }> = ({ accountOrders }) => {
    const [editableFields, setEditableFields] = useState<{ [key: number]: { startDate?: boolean; price?: boolean } }>({});
    const [editedOrders, setEditedOrders] = useState<{ [key: number]: Partial<orderInput> }>({});

    // Toggle edit mode for a specific field in a specific order
    const toggleEditField = (index: number, field: keyof orderInput) => {
        setEditableFields(prev => ({
            ...prev,
            [index]: {
                ...prev[index],
                [field]: !prev[index]?.[field],
            },
        }));
    };

    // Handle changes for order fields
    const handleChange = (index: number, field: keyof orderInput, value: string | number) => {
        setEditedOrders(prev => ({
            ...prev,
            [index]: {
                ...prev[index],
                [field]: field === "price" ? parseFloat(value as string) : value,
            },
        }));
    };

    // Confirm changes and console log the updated order object
    const confirmChanges = (index: number) => {
        const updatedOrder = {
            ...accountOrders[index],
            ...editedOrders[index],
        };
        console.log("Updated Order:", updatedOrder);

        // Close editable mode for both fields after confirming changes
        setEditableFields(prev => ({
            ...prev,
            [index]: {},
        }));
    };

    return (
        <div>
            <div className={styles.orderHeading}>
                <h3>Previous Orders</h3>
            </div>

            {accountOrders.length === 0 ? (
                <p>No past orders</p>
            ) : (
                <div>
                    {accountOrders.map((order, index) => {
                        const orderEdits = editedOrders[index] || {};

                        return (
                            <div key={order.id} className={styles.orderItem}>
                                <p>Order ID: {order.id}</p>

                                {/* Static Order Date */}
                                <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>

                                {/* Start Date with toggleable input */}
                                <div className={styles.editableField}>
                                    <p
                                        className={`${styles.shine} ${editableFields[index]?.startDate ? styles.underline : ""}`}
                                    >
                                        Start Date:{" "}
                                        {editableFields[index]?.startDate ? (
                                            <input
                                                type="date"
                                                value={
                                                    orderEdits.startDate
                                                        ? new Date(orderEdits.startDate).toISOString().split("T")[0]
                                                        : new Date(order.startDate).toISOString().split("T")[0]
                                                }
                                                onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            new Date(order.startDate).toLocaleDateString()
                                        )}
                                    </p>
                                    <button onClick={() => toggleEditField(index, "startDate")}>✏️</button>
                                </div>

                                {/* Price with toggleable input */}
                                <div className={styles.editableField}>
                                    <p
                                        className={`${styles.shine} ${editableFields[index]?.price ? styles.underline : ""}`}
                                    >
                                        Budgeted Price:{" "}
                                        {editableFields[index]?.price ? (
                                            <input
                                                type="number"
                                                value={orderEdits.price ?? order.price}
                                                onChange={(e) => handleChange(index, "price", e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            `${order.price}€`
                                        )}
                                    </p>
                                    <button onClick={() => toggleEditField(index, "price")}>✏️</button>
                                </div>

                                {/* Confirm button only appears if fields are being edited */}
                                {(editableFields[index]?.startDate || editableFields[index]?.price) && (
                                    <button
                                        onClick={() => confirmChanges(index)}
                                        className={styles.confirmButton}
                                    >
                                        Confirm
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AccountOrders;
