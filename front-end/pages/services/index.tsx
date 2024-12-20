import Header from "@/components/header";
import ServiceComponent from "@/components/serviceComponent";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const ServicesPage: React.FC = () => {
    return (
        <>

        <Header/>
        <ServiceComponent/>
        </>
    )
}

export default ServicesPage;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});