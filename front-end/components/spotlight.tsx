import React from 'react';
import styles from '../styles/Spotlight.module.css';
import Hero from "../public/renovy.png";
import Link from 'next/link';

const Spotlight: React.FC = () => {
    return (
        <div className={styles.spotlightContainer}>
            <div className={styles.left}>
                <div className={styles.leftContent}>
                <h1>Renovy</h1>
                    <p>
                        Renovy: Building Dreams, Restoring Trust.                    
                    </p>
                    <p>
                        <Link href="/aboutUs" className={styles.leftAboutHyperlink}>Read more about us</Link>
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
