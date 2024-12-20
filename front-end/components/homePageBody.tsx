import Spotlight from "./spotlight";

import styles from "../styles/Home.module.css";

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "react-i18next";

const HomePageBody : React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
        
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
    )
};

export default HomePageBody;