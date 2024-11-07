import React from "react";
import styles from "../styles/Header.module.css";
import AccountIcon from "../public/Header/account.svg";
import Logo from "../public/logo.png";
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.strip}>
                <div className={styles.whiteGap}></div>
                <div className={styles.headerItem1}></div>
                <div className={styles.whiteGap}></div>
                <div className={styles.headerItem2}></div>
                <div className={styles.whiteGap}></div>
                <div className={styles.headerItem3}></div>
                <div className={styles.whiteGap}></div>
                <div className={styles.headerItem4}></div>
                <div className={styles.whiteGap}></div>
                <div className={styles.headerItem5}></div>
                <div className={styles.whiteGap}></div>
            </div>

            <nav className={styles.navigationContainer}>
                <div className={styles.leftNavigation}>
                    <img src={Logo.src} className={styles.logo} alt="Logo" />
                    <li className={styles.renovyNavigationTitle}><Link href="/" legacyBehavior><a href="">Renovy</a></Link></li>
                    {/* Add any left-side navigation items if needed */}
                </div>
                <ul className={styles.rightNavigation}>
                    <li><Link href = "/aboutUs">About Us</Link></li>
                    <li><Link href = "/services">Services</Link></li>
                    <li><Link href = "/projects">Projects</Link></li>
                    <li><Link href = "/orders">Order</Link></li>
                    <Link href = "/account"><li><img src={AccountIcon.src} alt="Account Icon"/></li></Link>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
