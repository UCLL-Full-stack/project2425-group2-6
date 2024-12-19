import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Header from "@/components/header";
import Spotlight from "@/components/spotlight";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div id="body-container" className={styles["body-container"]}>
        <Spotlight />
        <h1>{t("main.heading")}</h1>
        <p>
          {t("main.intro")}
        </p>
        <p>
          {t("main.renovations")}
        </p>
        <ul>
          <li>{t("main.renovationsList.1")}</li>
          <li>{t("main.renovationsList.2")}</li>
          <li>{t("main.renovationsList.3")}</li>
          <li>{t("main.renovationsList.4")}</li>
          <li>{t("main.renovationsList.5")}</li>
        </ul>
        <p>
          {t("main.mindset")}
        </p>
        <p>
          {t("main.pickUs")}
        </p>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});