import Spotlight from "./spotlight";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "react-i18next";

const HomePageBody: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
        <div id="body-container" className="container mx-auto p-4 bg-white rounded-lg shadow-lg mb-8">
          <Spotlight />
          <h1 className="text-5xl font-extrabold my-6 text-center text-blue-700">{t("main.heading")}</h1>
          <p className="my-4 text-xl text-gray-800 leading-relaxed mb-6">
            {t("main.intro")}
          </p>
          <p className="my-4 text-xl text-gray-800 leading-relaxed mb-6">
            {t("main.renovations")}
          </p>
          <ul className="list-disc list-inside my-6 pl-8 text-xl text-gray-800 leading-relaxed mb-6">
            <li>{t("main.renovationsList.1")}</li>
            <li>{t("main.renovationsList.2")}</li>
            <li>{t("main.renovationsList.3")}</li>
            <li>{t("main.renovationsList.4")}</li>
            <li>{t("main.renovationsList.5")}</li>
          </ul>
          <p className="my-4 text-xl text-gray-800 leading-relaxed mb-6">
            {t("main.mindset")}
          </p>
          <p className="my-4 text-xl text-gray-800 leading-relaxed mb-6">
            {t("main.pickUs")}
          </p>
        </div>
        <footer className="text-center text-white mt-8">
          <>&copy; {new Date().getFullYear()} {t("footer.cp")}</>
        </footer>
      </div>
    </>
  )
};

export default HomePageBody;
