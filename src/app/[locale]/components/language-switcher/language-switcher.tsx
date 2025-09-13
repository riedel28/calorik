'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' }, 
    { code: 'ru', label: 'RU' },
  ];

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={pathname || '/'}
          locale={lang.code}
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
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
