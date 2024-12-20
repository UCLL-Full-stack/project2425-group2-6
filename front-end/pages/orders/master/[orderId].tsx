import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderService from "@/services/order.service";
import Header from "@/components/header";
import OrderIdOverviewPage from "@/components/dynamicOrderIdOverview";
import OrderIdOverviewPageAdmin from "@/components/dynamicAllOrdersAdmin";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const OrderByIdMaster: React.FC = () => {
  return (
    <>
    <Header/>
    <OrderIdOverviewPageAdmin/>
    </>
  )
};

export default OrderByIdMaster;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});