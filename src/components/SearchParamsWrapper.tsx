'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import HomeContent from '../components/HomeContent';

export default function SearchParamsWrapper() {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState(searchParams.get('language') || 'en');

  useEffect(() => {
    const newLanguage = searchParams.get('language') || 'en';
    setLanguage(newLanguage);
  }, [searchParams]);

  return <HomeContent language={language} />;
}