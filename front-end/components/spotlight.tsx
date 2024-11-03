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
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex nulla facere tempore in unde sunt consectetur minima voluptatum error id quae aut nam asperiores excepturi molestias, fugiat adipisci blanditiis dolorem?
                    </p>
                    <p>
                        <Link href="/about-us" className={styles.leftAboutHyperlink}>Read more about us</Link>
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
