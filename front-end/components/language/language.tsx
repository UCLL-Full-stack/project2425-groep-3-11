import React from 'react';
import { useRouter } from 'next/router';

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (event: { target: { value: string } }) => {
        const newLocale = event.target.value;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return (
        <div>
            <label htmlFor="language">Language:</label>
            <select id="language" onChange={handleLanguageChange} value={locale}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>
        </div>
    );
};

export default Language;
