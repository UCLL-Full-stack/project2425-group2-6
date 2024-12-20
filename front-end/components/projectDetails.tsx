import React from 'react';

interface ProjectDetailsProps {
  project: string;
  description: string;
  images: string[];
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, description, images }) => {
  return (
    <div className="p-4">
      <section className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-102 duration-300">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-indigo-600">{project}</h2>
        <p className="text-gray-700 mb-6 text-justify">{description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                className="w-full h-48 object-cover rounded-lg shadow-md transition-transform transform group-hover:scale-105 duration-300"
                src={image}
                alt={`${project} image ${index + 1}`}
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 rounded-b-lg w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>{`Image ${index + 1}`}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
