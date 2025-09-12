'use client';

import React from 'react';
import { useLocale } from 'next-intl';

const LanguageSwitcher = () => {
  const locale = useLocale();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' }, 
    { code: 'ru', label: 'RU' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    window.location.href = `/${newLocale}`;
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          style={{
            padding: '4px 8px',
            textDecoration: 'none',
            color: locale === lang.code ? '#fff' : '#666',
            backgroundColor: locale === lang.code ? '#228be6' : 'transparent',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;