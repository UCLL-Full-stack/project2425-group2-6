import { useState } from 'react';
import Header from '@/components/header';
import Dropdown from '@/components/Dropdown';
import ProjectDetails from '@/components/ProjectDetails';
import ProjectsComponent from '@/components/projectsComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
const Projects: React.FC = () => {
  return (
    <>
    
    <Header />
    <ProjectsComponent/>
    </>
  )
};

export default Projects;


export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});