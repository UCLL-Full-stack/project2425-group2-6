import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Header from "@/components/header";
import Spotlight from "@/components/spotlight";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "react-i18next";
import HomePageBody from "@/components/homePageBody";

export default function Home() {
  // const { t } = useTranslation();

  return (
    <>
      <Header />
      <HomePageBody/>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});