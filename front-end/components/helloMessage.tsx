import React from 'react';
import styles from "@/styles/HelloMessage.module.css";

type HelloMessageProps = {
    firstName: string;
};

const HelloMessage: React.FC<HelloMessageProps> = ({ firstName }) => {
    return (
        <div className={styles.helloMessage}>
            {firstName ? <h2 className='font-bold text-center'>Hello, {firstName}!</h2> : <h2 className='font-bold text-center'>To display page content you must be signed in!</h2>}
        </div>
    );
};

export default HelloMessage;