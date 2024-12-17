// pages/aboutUs/index.tsx
import React, { useState } from 'react';
import Header from "@/components/header";
import styles from "../../styles/aboutme.page.module.css";
import dropdownStyles from "../../styles/dropdown.module.css";

const AboutUs: React.FC = () => {
  

  return (
    <>
      <Header />
      <main className={styles["main-container"]}>
        <section className={styles["about-us-header"]}>
          <h1>About Renovy</h1>
        </section>
        <section className={styles["about-us-content"]}>
          <p>
            Welcome to Renovy, a leading construction company established in
            2024. We specialize in providing top-notch construction services to
            meet all your building needs.
          </p>
          <p>
            Our team of experienced professionals is dedicated to delivering
            high-quality workmanship and exceptional customer service. At
            Renovy, we believe in building strong relationships with our clients
            and ensuring their satisfaction with every project we undertake.
          </p>
          <p>
            Thank you for choosing Renovy. We look forward to working with you
            on your next construction project.
          </p>
        </section>
      </main>
    </>
  );
};

export default AboutUs;