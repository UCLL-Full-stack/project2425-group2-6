import Dropdown from "@/components/Dropdown";
import Header from "@/components/header";
import { useState } from "react";
import styles from "../../styles/aboutme.page.module.css";
import dropdownStyles from "../../styles/dropdown.module.css";



const Projects: React.FC = () => {

    const pastProjects = [
        "Project A",
        "Project B",
        "Project C",
        "Project D"
      ];
    
      const projectDetails: { [key: string]: { description: string, images: string[] } } = {
        "Project A": {
          description: "Details about Project A: This project involved the construction of a modern housing building with eco-friendly materials.",
          images: [
            "/projectA1.jpg",
            "/projectA2.jpg",
            "/projectA3.webp"
          ]
        },
        "Project B": {
          description: "Details about Project B: This project focused on renovating an old office building into a new modern home for 5 people.",
          images: [
            "/projectB1.jpeg",
            "/projectB2.jpeg",
            "/projectB3.jpg"
          ]
        },
        "Project C": {
          description: "Details about Project C: This project a renovation of an old farm into a house.",
          images: [
            "/projectC1.jpg",
            "/projectC2.jpg",
            "/projectC3.webp"
          ]
        },
        "Project D": {
          description: "Details about Project D: This project was out of the ordianryn, building around the nature.",
          images: [
            "/projectD1.webp",
            "/projectD2.jpg",
            "/projectD3.jpg"
          ]
        }
      };
      
      const [selectedProject, setSelectedProject] = useState<string | null>(null);

      const handleSelectProject = (project: string) => {
        setSelectedProject(project);
      };

    return (
        <>

            <Header/>
            <main className={styles["main-container"]}>
                <section className={styles["about-us-header"]}>
                    <h1>Our Projects</h1>
                </section>
                <Dropdown title="Past Projects" items={pastProjects} onSelect={handleSelectProject} />
                {selectedProject && (
                <section className={styles["project-details"]}>
                    <h2>{selectedProject}</h2>
                    <p>{projectDetails[selectedProject].description}</p>
                    <div className={styles["project-images"]}>
                    {projectDetails[selectedProject].images.map((image, index) => (
                        <img key={index} src={image} alt={`${selectedProject} image ${index + 1}`} className={styles["project-image"]} />
                    ))}
                    </div>
                </section>
                )}
            </main>

        </>
    )
}

export default Projects;