import { useEffect, useState } from "react";
import Header from "@/components/header";
import HelloMessage from "@/components/helloMessage";
import CreateOrder from "@/components/createOrder";
import OrderHistory from "@/components/orderHistory";

const Orders: React.FC = () => {
    const [customerName, setCustomerName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
        const fullName = user.fullname;
        if (fullName) {
            const firstNameFromStorage = fullName.split(" ")[0];
            setCustomerName(firstNameFromStorage);
        }
        setEmail(user.email);
    }, []);

    return (
        <>
            <Header/>
            
            <HelloMessage firstName={customerName} />

            {customerName &&
            <CreateOrder emailProp={email}/>
            }

            {customerName &&
            <OrderHistory email={email}/>
            }

        </>
    )
}

export default Orders;