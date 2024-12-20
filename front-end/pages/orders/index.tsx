import { useEffect, useState } from "react";
import Header from "@/components/header";
import HelloMessage from "@/components/helloMessage";
import CreateOrder from "@/components/createOrder";
import OrderHistory from "@/components/orderHistory";
import AllOrders from "@/components/allOrders";
import EmployeeOrdersOverview from "@/components/EmployeeOrdersOverview";
import OrdersPageComponent from "@/components/ordersPageComponent";

const Orders: React.FC = () => {
    return (
        <>
        <Header/>
        <OrdersPageComponent/>
        
        </>
    )

}

export default Orders;