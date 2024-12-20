import React, { useState } from 'react';

const AboutUsComponent: React.FC = () => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <main className="p-8 flex flex-col items-center bg-gradient-to-r to-blue-300 min-h-screen">
            <section className="mt-8 w-full max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-lg">About Renovy</h1>
            </section>
            <section className="mt-8 w-full max-w-4xl mx-auto text-left bg-white p-8 rounded-lg shadow-2xl transform transition duration-500 hover:scale-105">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Welcome to Renovy, a leading construction company established in 2024.
                    We specialize in providing top-notch construction services to meet all
                    your building needs.
                </p>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Our team of experienced professionals is dedicated to delivering
                    high-quality workmanship and exceptional customer service. At Renovy,
                    we believe in building strong relationships with our clients and
                    ensuring their satisfaction with every project we undertake.
                </p>
                {showMore && (
                    <>
                        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                            Thank you for choosing Renovy. We look forward to working with you
                            on your next construction project.
                        </p>
                        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                            Our services include residential and commercial construction, 
                            renovations, and project management. We use the latest technology 
                            and sustainable practices to ensure that our projects are not only 
                            of the highest quality but also environmentally friendly.
                        </p>
                        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                            Our mission is to exceed our clients' expectations by delivering 
                            projects on time and within budget. We are committed to continuous 
                            improvement and innovation in all aspects of our business.
                        </p>
                    </>
                )}
                <div className="text-center">
                    <button
                        onClick={toggleShowMore}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-110"
                    >
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </section>
        </main>
    );
};

export default AboutUsComponent;