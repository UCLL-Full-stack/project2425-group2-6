import { useEffect, useState } from "react";
import Header from "@/components/header";
import HelloMessage from "@/components/helloMessage";
import CreateOrder from "@/components/createOrder";
import OrderHistory from "@/components/orderHistory";
import AllOrders from "@/components/allOrders";

const Orders: React.FC = () => {
    const [customerName, setCustomerName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
        const fullName = user.fullname;
        if (fullName) {
            const firstNameFromStorage = fullName.split(" ")[0];
            setCustomerName(firstNameFromStorage);
        }
        setRole(user.role);
        setEmail(user.email);
    }, []);

    return (
        <>
            <Header/>
            
            <HelloMessage firstName={customerName} />

            {role === 'admin' &&
            
                <AllOrders/>
    }

            {customerName && role === 'customer' &&
            <CreateOrder emailProp={email}/>
            }

            {customerName && role === 'customer' &&
            <OrderHistory email={email}/>
            }

        </>
    )
}

export default Orders;