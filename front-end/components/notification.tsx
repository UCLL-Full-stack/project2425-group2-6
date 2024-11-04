// Notification.tsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import styles from '../styles/Notification.module.css'; // Import external styles

interface Props {
    message1?: string; // Optional message1 prop
    message2?: string; // Optional message2 prop
    type?: 'success' | 'error' | 'info' | 'warning'; // Optional type prop with defined values
    duration?: number; // Duration in milliseconds
}

const Notification: React.FC<Props> = ({ message1 = '', message2 = '', type = 'success', duration = 6500 }) => {
    useEffect(() => {
        const notification = document.createElement("div");
        notification.className = `${styles.notification} ${styles[type] || styles.info}`; // Apply the appropriate class

        // Create the first message
        const msg1 = document.createElement("div");
        msg1.className = styles.notificationMessage;
        msg1.textContent = message1; // Default to an empty string if undefined
        notification.appendChild(msg1);

        // Create the second message if it exists
        if (message2) {
            const msg2 = document.createElement("div");
            msg2.className = styles.notificationMessage;
            msg2.textContent = message2; // Default to an empty string if undefined
            notification.appendChild(msg2);
        }

        document.body.appendChild(notification);

        // Trigger a reflow to apply the CSS transition
        notification.offsetWidth; // Trigger reflow
        notification.classList.add(styles.show);

        const timeout = setTimeout(() => {
            notification.classList.remove(styles.show);
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, duration); // Use the duration from props

        // Remove notification when clicked
        notification.addEventListener('click', () => {
            notification.classList.remove(styles.show);
            setTimeout(() => {
                notification.remove();
            }, 500);
        });

        // Clean up the timeout and event listener on unmount
        return () => {
            clearTimeout(timeout);
            notification.removeEventListener('click', () => {}); // Cleanup
            notification.remove();
        };
    }, [message1, message2, type, duration]); // Add duration to dependencies

    return null; // This component does not render any JSX directly
};

// Define default props
Notification.defaultProps = {
    message1: "",
    message2: "",
    type: 'success',
    duration: 2500, // Default duration
};

// Optional: You can also define prop types using PropTypes for runtime checks
Notification.propTypes = {
    message1: PropTypes.string,
    message2: PropTypes.string,
    type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
    duration: PropTypes.number, // Define the duration prop type
};

export default Notification;
