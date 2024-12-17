import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderService from "@/services/order.service";
import Header from "@/components/header";
import OrderIdOverviewPage from "@/components/dynamicOrderIdOverview";

const OrderById: React.FC = () => {
  return (
    <>
    <Header/>
    <OrderIdOverviewPage/>
    </>
  )
};

export default OrderById;
