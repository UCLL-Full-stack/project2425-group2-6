import React from 'react';
import styles from "@/styles/HelloMessage.module.css";

type HelloMessageProps = {
    firstName: string;
};

const HelloMessage: React.FC<HelloMessageProps> = ({ firstName }) => {
    return (
        <div className={styles.helloMessage}>
            {firstName ? <h2 className='font-bold text-center text-xl'>Hello, {firstName}. What can we do for you?</h2> : <h2 className='font-bold text-center text-xl'>To display page content you must be signed in!</h2>}
        </div>
    );
};

export default HelloMessage;