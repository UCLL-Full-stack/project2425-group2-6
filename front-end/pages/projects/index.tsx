import { useState } from 'react';
import Header from '@/components/header';
import Dropdown from '@/components/Dropdown';
import ProjectDetails from '@/components/ProjectDetails';
import ProjectsComponent from '@/components/projectsComponent';

const Projects: React.FC = () => {
  return (
    <>
    
    <Header />
    <ProjectsComponent/>
    </>
  )
};

export default Projects;