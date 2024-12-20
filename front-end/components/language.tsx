import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Language: React.FC = () => {

    const { t } = useTranslation();

    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const locale = event.target.value;
        router.push({ pathname, query }, asPath, { locale });
    };

    return (
        <div className='ml-6'>
            <label htmlFor='language' className='text-black'>{t('nav.language.language')}</label>
            <select id='language' className='ml-2 p-1' value={locale} onChange={handleLanguageChange}>
                <option value="en">{t("nav.language.en")}</option>
                <option value="fr">{t("nav.language.fr")}</option>
            </select>
        </div>
    );
};

export default Language;