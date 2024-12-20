import { useEffect, useState } from "react";
import Header from "./header";
import HelloMessage from "./helloMessage";
import EmployeeOrdersOverview from "./employeeOrdersOverview";
import AllOrders from "./allOrders";
import CreateOrder from "./createOrder";
import OrderHistory from "./orderHistory";

const OrdersPageComponent: React.FC = () => {

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
                
                <HelloMessage firstName={customerName} />
    
                {
                    (role === 'admin' || role === 'worker') &&
                    <EmployeeOrdersOverview email={email}/> 
                }
    
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

export default OrdersPageComponent;