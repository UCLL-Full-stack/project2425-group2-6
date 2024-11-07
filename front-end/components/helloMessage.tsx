import { useEffect, useState } from 'react';
import styles from "@/styles/HelloMessage.module.css";

type Props = {
    customerId: number;
}

const HelloMessage: React.FC<Props> = ({ customerId }: Props) => {
    const [customerName, setCustomerName] = useState<string>('');

    const getCustomerById = async (customerId: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const customerData = await response.json();
            setCustomerName(customerData.firstName); // Assuming the API returns an object with a 'name' field
        } catch (error) {
            console.error("Failed to fetch customer:", error);
        }
    }

    useEffect(() => {
        getCustomerById(customerId);
    }, [customerId]);

    return (
        <>
            {customerName ? (
                <h1 className={styles.welcomeMessage}>Welcome {customerName}</h1>
            ) : (
                <h1 className={styles.welcomeMessage}>No user found</h1>
            )}
        </>
    )
}

export default HelloMessage;