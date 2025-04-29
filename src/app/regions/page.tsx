// src/app/regions/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SummaryCard from '../../components/SummaryCard';
import { fetchSummaries, fetchRegions } from '../../lib/api';
import { Summary, Region } from '../../types/index';

// Map region codes to country flag emojis
const flagEmojis: { [key: string]: string } = {
  UG: '🇺🇬',
  KE: '🇰🇪',
  // Add more as needed (e.g., TZ: '🇹🇿')
};

export default function Regions() {
  const searchParams = useSearchParams();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(searchParams.get('language') || 'en');

  useEffect(() => {
    const newLanguage = searchParams.get('language') || 'en';
    setLanguage(newLanguage);
  }, [searchParams]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const regionsData = await fetchRegions();
      setRegions(regionsData);
      // Set default region to the first available region
      const defaultRegion = regionsData.length > 0 ? regionsData[0].code : '';
      setRegion(defaultRegion);
      const summariesData = await fetchSummaries(defaultRegion, language);
      setSummaries(summariesData);
      setLoading(false);
    };
    loadData();
  }, [language]);

  const handleRegionChange = async (newRegion: string) => {
    setRegion(newRegion);
    setLoading(true);
    const summariesData = await fetchSummaries(newRegion, language);
    setSummaries(summariesData);
    setLoading(false);
  };

  const selectedRegion = regions.find((r) => r.code === region);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center bg-gradient-to-r from-teal-500 to-yellow-400 text-white py-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold">Inclusive Communities (SDG 10)</h1>
        <p className="text-lg mt-2">Explore Government Documents in Your Region</p>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          {selectedRegion && (
            <span
              className="text-3xl"
              role="img"
              aria-label={`${selectedRegion.name} flag`}
            >
              {flagEmojis[selectedRegion.code] || '🌍'}
            </span>
          )}
          <h2 className="text-2xl font-semibold text-teal-500">
            {selectedRegion ? selectedRegion.name : 'Select a Region'}
          </h2>
        </div>
        <div className="relative w-full max-w-xs">
          <label htmlFor="region-select" className="text-lg font-semibold text-gray-700 sr-only">
            Select Region
          </label>
          <select
            id="region-select"
            value={region}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="appearance-none w-full bg-white border border-teal-500 rounded-lg py-3 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 hover:bg-teal-50"
            aria-label="Select a region to view government documents"
          >
            {regions.length === 0 ? (
              <option value="">No regions available</option>
            ) : (
              regions.map((r) => (
                <option key={r.code} value={r.code}>
                  {flagEmojis[r.code] || '🌍'} {r.name}
                </option>
              ))
            )}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-teal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
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
      ) : summaries.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No government documents found for this region.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map((summary) => (
            <SummaryCard key={summary.id.toString()} summary={summary} />
          ))}
        </div>
      )}
    </div>
  );
}