import React, { useState } from 'react';

const AboutUsComponent: React.FC = () => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <main className="p-4 bg-gray-50 flex flex-col items-center">
            <section className="mt-6 w-full max-w-4xl mx-auto">
                <h1>About Renovy</h1>
            </section>
            <section className="mt-6 w-full max-w-4xl mx-auto">
                <p>
                    Welcome to Renovy, a leading construction company established in 2024.
                    We specialize in providing top-notch construction services to meet all
                    your building needs.
                </p>
                <p>
                    Our team of experienced professionals is dedicated to delivering
                    high-quality workmanship and exceptional customer service. At Renovy,
                    we believe in building strong relationships with our clients and
                    ensuring their satisfaction with every project we undertake.
                </p>
                {showMore && (
                    <>
                        <p>
                            Thank you for choosing Renovy. We look forward to working with you
                            on your next construction project.
                        </p>
                        <p>
                            Our services include residential and commercial construction, 
                            renovations, and project management. We use the latest technology 
                            and sustainable practices to ensure that our projects are not only 
                            of the highest quality but also environmentally friendly.
                        </p>
                        <p>
                            Our mission is to exceed our clients' expectations by delivering 
                            projects on time and within budget. We are committed to continuous 
                            improvement and innovation in all aspects of our business.
                        </p>
                    </>
                )}
                <button
                    onClick={toggleShowMore}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    {showMore ? 'Show Less' : 'Show More'}
                </button>
            </section>
        </main>
    );
};

export default AboutUsComponent;