import React from 'react';

const services = [
    { id: 1, name: 'Architectural Design', description: 'Innovative and sustainable design solutions.', details: 'We provide cutting-edge architectural designs that are both innovative and sustainable, ensuring that your project stands out.' },
    { id: 2, name: 'Construction Management', description: 'Efficient and effective project management.', details: 'Our construction management services ensure that your project is completed on time and within budget, with the highest quality standards.' },
    { id: 3, name: 'Renovation Services', description: 'Transforming spaces to meet your needs.', details: 'We specialize in transforming spaces to meet your specific needs, whether it’s a residential or commercial renovation.' },
    { id: 4, name: 'Interior Design', description: 'Creating beautiful and functional interiors.', details: 'Our interior design services focus on creating beautiful and functional spaces that reflect your personal style and preferences.' },
    { id: 5, name: 'Landscaping', description: 'Designing and maintaining outdoor spaces.', details: 'We design and maintain outdoor spaces that enhance the beauty and functionality of your property.' },
    { id: 6, name: 'Consulting Services', description: 'Expert advice for your projects.', details: 'We offer consulting services to provide expert advice and guidance for your construction and design projects.' },
];

const ServiceComponent: React.FC = () => {
    return (
        <div className="service-container p-8 bg-gray-100">
            <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
            <div className="service-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map(service => (
                    <div key={service.id} className="service-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>
                        <p className="text-gray-700 mb-2">{service.description}</p>
                        <p className="text-gray-600">{service.details}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceComponent;