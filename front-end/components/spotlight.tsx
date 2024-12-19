import React from 'react';
import styles from '../styles/Spotlight.module.css';
import Hero from "../public/renovy.png";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Spotlight: React.FC = () => {

    const { t } = useTranslation();


    return (
        <div className={styles.spotlightContainer}>
            <div className={styles.left}>
                <div className={styles.leftContent}>
                <h1>{t('home.spotlight.title')}</h1>
                    <p>
                    {t('home.spotlight.spotlightDesc')}                  
                    </p>
                    <p>
                        <Link href="/aboutUs" className={styles.leftAboutHyperlink}>{t('home.spotlight.readMore')}</Link>
                    </p>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.backgroundImage}></div>
                <div className={styles.gradientOverlay}></div>
            </div>
        </div>
    );
};

export default Spotlight;
