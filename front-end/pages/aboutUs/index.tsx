// pages/aboutUs/index.tsx
import React, { useState } from 'react';
import Header from "@/components/header";
import AboutUsComponent from '@/components/aboutUsComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
const AboutUs: React.FC = () => {
  

  return (
    <>
      <Header />
      <AboutUsComponent/>
    </>
  );
};

export default AboutUs;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});