// src/app/regions/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchRegions } from '../../lib/api';
import { Region } from '../../types/index';
import { africanCountries, Country } from '../../lib/africanCountries';

export default function Regions() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const regionsData = await fetchRegions();
      setRegions(regionsData);
      setLoading(false);
    };
    loadData();
  }, []);

  // Sort countries: East Africa first, then alphabetically
  const sortedCountries = [...africanCountries].sort((a, b) => {
    if (a.isEastAfrica && !b.isEastAfrica) return -1;
    if (!a.isEastAfrica && b.isEastAfrica) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center bg-gradient-to-r from-teal-500 to-yellow-400 text-white py-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold">Inclusive Communities (SDG 10)</h1>
        <p className="text-lg mt-2">Discover Government Documents Across Africa</p>
      </div>
      {loading ? (
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-teal-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sortedCountries.map((country) => {
            const isActive = regions.some((r) => r.code === country.code);
            return (
              <Link
                key={country.code}
                href={isActive ? `/regions/${country.code}` : '#'}
                className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-white shadow-lg hover:shadow-xl hover:scale-105'
                    : 'opacity-50 grayscale cursor-not-allowed'
                }`}
                aria-label={`${country.name} ${isActive ? 'active' : 'inactive'}`}
                tabIndex={isActive ? 0 : -1}
              >
                <span className="text-4xl mb-2" role="img" aria-label={`${country.name} flag`}>
                  {country.emoji}
                </span>
                <span className="text-lg font-semibold text-teal-500 text-center">
                  {country.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}