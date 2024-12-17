import React from 'react';

interface ProjectDetailsProps {
  project: string;
  description: string;
  images: string[];
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, description, images }) => {
  return (
    <div className="p-4 bg-gray-50 flex flex-col items-center">
        <section className="mt-6 w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-center">{project}</h2>
        <p className="mb-4 text-center">{description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
            <img key={index} src={image} alt={`${project} image ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-md" />
            ))}
        </div>
        </section>
    </div>
  );
};

export default ProjectDetails;