import React from "react";
import AccountIcon from "../public/Header/account.svg";
import Logo from "../public/logo.png";
import Link from "next/link";
import { useTranslation } from "react-i18next"; // Import the hook for translations
import Language from "./language";

const Header: React.FC = () => {
    const { i18n } = useTranslation(); // Access the i18n instance

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value); // Trigger language change
    };

    const { t } = useTranslation();
  

    return (
        <div className="flex flex-col w-full mb-0">
            <div className="flex w-full h-2">
                <div className="w-0.5 bg-white"></div>
                <div className="w-full bg-blue-500"></div>
                <div className="w-0.5 bg-white"></div>
                <div className="w-full bg-pink-500"></div>
                <div className="w-0.5 bg-white"></div>
                <div className="w-full bg-green-500"></div>
                <div className="w-0.5 bg-white"></div>
                <div className="w-full bg-orange-500"></div>
                <div className="w-0.5 bg-white"></div>
                <div className="w-full bg-indigo-500"></div>
                <div className="w-0.5 bg-white"></div>
            </div>

            <nav className="flex justify-between items-center w-full h-16 bg-gray-100 text-black px-4">
                <div className="flex items-center gap-4">
                    <img src={Logo.src} className="w-14 rounded-lg" alt="Logo" />
                    <li className="list-none font-bold text-xl"><Link href="/" legacyBehavior><a href="">Renovy</a></Link></li>
                </div>
                <ul className="flex items-center gap-4">
                    <li><Link href="/aboutUs">{t("nav.about")}</Link></li>
                    <li><Link href="/services">{t("nav.services")}</Link></li>
                    <li><Link href="/projects">{t("nav.projects")}</Link></li>
                    <li><Link href="/orders">{t("nav.orders")}</Link></li>
                    <Link href="/account"><li><img src={AccountIcon.src} alt="Account Icon" /></li></Link>
                    <Language/>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
