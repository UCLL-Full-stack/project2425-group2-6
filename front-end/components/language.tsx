import { useRouter } from 'next/router';
import React from 'react';

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const locale = event.target.value;
        router.push({ pathname, query }, asPath, { locale });
    };

    return (
        <div className='ml-6'>
            <label htmlFor='language' className='text-black'>Language:</label>
            <select id='language' className='ml-2 p-1' value={locale} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="fr">French</option>
            </select>
        </div>
    );
};

export default Language;