import PastOrders from "@/components/pastOrders";
import Header from "@/components/header";
import HelloMessage from "@/components/helloMessage";
import CreateOrder from "@/components/createOrder";


const Orders: React.FC = () => {

    const customerId = 1;

    return (
        <>

            <Header/>

            <HelloMessage customerId = {customerId}/>

            <CreateOrder customerId = {customerId}/>

            <PastOrders customerId = {customerId}/>
        </>
    )
}

export default Orders;