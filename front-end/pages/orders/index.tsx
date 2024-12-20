import { useEffect, useState } from "react";
import Header from "@/components/header";
import HelloMessage from "@/components/helloMessage";
import CreateOrder from "@/components/createOrder";
import OrderHistory from "@/components/orderHistory";
import AllOrders from "@/components/allOrders";
import EmployeeOrdersOverview from "@/components/EmployeeOrdersOverview";
import OrdersPageComponent from "@/components/ordersPageComponent";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
const Orders: React.FC = () => {
    return (
        <>
        <Header/>
        <OrdersPageComponent/>
        
        </>
    )

}

export default Orders;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  });