import { useState } from "react";
import Dropdown from "./Dropdown";
import ProjectDetails from "./projectDetails";

const ProjectsComponent : React.FC = () => {

    const pastProjects = ["Project A", "Project B", "Project C", "Project D"];
      type ProjectDetailsType = {
        [key: string]: {
          description: string;
          images: string[];
        };
      };
    
      const projectDetails: ProjectDetailsType = {
        "Project A": {
          description: "Details about Project A: This project involved a complete renovation of a historic building.",
          images: ["/projectA1.jpg", "/projectA2.jpg", "/projectA3.webp"]
        },
        "Project B": {
          description: "Details about Project B: This project focused on modernizing an old factory.",
          images: ["/projectB1.jpeg", "/projectB2.jpeg", "/projectB3.jpg"]
        },
        "Project C": {
          description: "Details about Project C: This project transformed an old warehouse into a modern office space.",
          images: ["/projectC1.jpg", "/projectC2.jpg", "/projectC3.webp"]
        },
        "Project D": {
          description: "Details about Project D: This project was out of the ordinary, building around the nature.",
          images: ["/projectD1.webp", "/projectD2.jpg", "/projectD3.jpg"]
        }
      };
    
      const [selectedProject, setSelectedProject] = useState<string | null>(null);
    
      const handleSelectProject = (project: string) => {
        setSelectedProject(project);
      };
    
      return (
        <>
          
            <Dropdown title="Past Projects" items={pastProjects} onSelect={handleSelectProject} />
            {selectedProject && (
              <ProjectDetails
                project={selectedProject}
                description={projectDetails[selectedProject].description}
                images={projectDetails[selectedProject].images}
              />
            )}
          
        </>
      );

};

export default ProjectsComponent;