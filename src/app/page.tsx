'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SummaryCard from '../components/SummaryCard';
import { fetchSummaries, fetchRegions } from '../lib/api';
import { Region, Summary } from '../types';
import { Globe, BookOpen } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [region, setRegion] = useState('UG');
  const [language, setLanguage] = useState(searchParams.get('language') || 'en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const summariesData = await fetchSummaries(region, language);
        const regionsData = await fetchRegions();
        setSummaries(summariesData);
        setRegions(regionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [region, language]);

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    
    // Update state
    setLanguage(newLanguage);
    
    // Update URL parameter to persist language selection
    const params = new URLSearchParams(searchParams.toString());
    params.set('language', newLanguage);
    
    // Update the URL without reloading the page
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // Handle region change
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl space-y-8">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-coral-500 to-yellow-400 text-white py-8 rounded-xl">
        <h1 className="text-4xl font-bold">Empowering Women (SDG 5)</h1>
        <p className="text-lg mt-2">Understand Your Rights with Clear Government Document Summaries</p>
      </div> 
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Budget Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-lg font-medium text-gray-700" htmlFor="region-select">
              <Globe size={20} className="mr-2 text-pink-500" />
              Region:
            </label>
            <select
              id="region-select"
              value={region}
              onChange={handleRegionChange}
              className="border border-gray-300 rounded-lg py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 w-full shadow-sm"
            >
              {regions.map((r: Region) => (
                <option key={r.code} value={r.code}>{r.name}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-lg font-medium text-gray-700" htmlFor="language-select">
              <BookOpen size={20} className="mr-2 text-purple-500" />
              Language:
            </label>
            <select
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              className="border border-gray-300 rounded-lg py-3 px-4 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full shadow-sm"
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
              <option value="fr">French</option>
              <option value="ha">Hausa</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Content */}
      {loading ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center">
            <svg className="animate-spin h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="mt-4 text-lg text-gray-600">Loading budget information...</p>
            <p className="text-sm text-gray-500">This may take a moment</p>
          </div>
        </div>
      ) : summaries.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No budget information found</h3>
            <p className="text-gray-600">We couldn't find any budget summaries for this region and language.</p>
            <p className="text-sm text-gray-500 mt-4">Try selecting a different region or language.</p>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-pink-100 text-pink-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              {summaries.length}
            </span>
            Budget Summaries for Women & Marginalized Groups
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {summaries.map((summary: Summary) => (
              <div key={summary.id.toString()} className="w-full">
                <SummaryCard summary={summary} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>EasyGov — Making government budget information accessible to everyone</p>
        <p className="mt-1">Supporting SDG 5 (Gender Equality) & SDG 10 (Reduced Inequalities)</p>
      </div>
    </div>
  );
}