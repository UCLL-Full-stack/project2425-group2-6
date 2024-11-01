import React, { useState } from "react";
import styles from "../styles/RegisterAccountForm.module.css";
import CustomerService from "@/services/customer.service";
import { LoginCustomer, CustomerInput } from "@/types/customerType";
import Notification from "./Notification";
import OrderDashboard from "./createOrder";

type Props = {
    formType: string;
};

let response: any;

const RegisterAccountForm: React.FC<Props> = ({ formType: initialFormType }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('danieljaurell@gmail.com');
    const [password, setPassword] = useState('x');
    const [formType, setFormType] = useState(initialFormType);
    const [successfullySignedIn, setSuccessfullySignedIn] = useState(false); // Change to boolean

    // State to manage notification messages and type
    const [notification, setNotification] = useState<{ message1: string; message2?: string; type: string; duration: number } | null>(null);

    const handleFormType = () => {
        setFormType(prevFormType => prevFormType === "signin" ? "register" : "signin");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        setNotification(null); // Reset notification at the start of each submission
    
        if (isSignIn) {
            const customerData: LoginCustomer = {
                email,
                password,
            }

            response = await CustomerService.attemptSignIn(customerData);
            if (response && response.firstName) {
                
                const firstNameMessage = response.firstName ? response.firstName : "User";
                setSuccessfullySignedIn(true); // Set to true on successful sign-in

                setNotification({
                    message1: "Sign in successful!",
                    message2: `Welcome back, ${firstNameMessage}!`,
                    type: "success",
                    duration: 2500 // 2.5 seconds
                });

                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
    
            } else {
                console.log("Unsuccessful Login");
                setNotification({
                    message1: "Sign in failed!",
                    message2: "Please check your credentials.",
                    type: "error",
                    duration: 2500
                });
            }
        } else {
            const customerData: CustomerInput = {
                firstName,
                lastName,
                email,
                password,
            };

            await CustomerService.addCustomer(customerData);
            setNotification({
                message1: "Registration successful!",
                message2: "You can now sign in.",
                type: "success",
                duration: 6500
            });
            
            handleFormType();
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        }
    };
    
    const isSignIn = formType.toLowerCase() === "signin";
    const title = isSignIn ? "Sign in" : "Register";
    const buttonText = isSignIn ? "Continue" : "Create account";
    const toggleText = isSignIn ? "Register" : "Sign in"; // Text to toggle between forms

    return (
        <>
            {notification && (
                <Notification
                    message1={notification.message1}
                    message2={notification.message2}
                    type={notification.type}
                    duration={notification.duration}
                />
            )}

            {!successfullySignedIn && (
                <div className={styles.container}>
                    <div className={styles.formWrapper}>
                        <h1 className={styles.formTitle}>{title}</h1>
                        <form className={styles.form} onSubmit={handleSubmit}>
                            {!isSignIn && (
                                <>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="firstName" className={styles.formLabel}>First Name:</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="lastName" className={styles.formLabel}>Last Name:</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.formLabel}>Email:</label>
                                <input
                                    type="email"
                                    className={styles.formInput}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="password" className={styles.formLabel}>Password:</label>
                                <input
                                    type="password"
                                    className={styles.formInput}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitButton}>{buttonText}</button>
                            <p onClick={handleFormType} className={styles.toggleLink}>
                                {toggleText}
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {successfullySignedIn && (
                <OrderDashboard customer={response} /> // Pass the first name to OrderDashboard
            )}
        </>
    );
};

export default RegisterAccountForm;
