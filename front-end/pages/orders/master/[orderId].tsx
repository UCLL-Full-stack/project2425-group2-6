import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderService from "@/services/order.service";
import Header from "@/components/header";
import OrderIdOverviewPage from "@/components/dynamicOrderIdOverview";
import OrderIdOverviewPageAdmin from "@/components/dynamicAllOrdersAdmin";

const OrderByIdMaster: React.FC = () => {
  return (
    <>
    <Header/>
    <OrderIdOverviewPageAdmin/>
    </>
  )
};

export default OrderByIdMaster;
