// src/app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import SummaryCard from '../components/SummaryCard';
import { fetchSummaries, fetchRegions, submitSuggestion } from '../lib/api';
import { Region, Summary, Suggestion } from '../types/index';
import { Globe, Send, Mail, Heart } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [region, setRegion] = useState('UG');
  const [language, setLanguage] = useState(searchParams.get('language') || 'en');
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState<Suggestion>({ title: '', url: '', comment: '', email: '' });
  const [suggestionStatus, setSuggestionStatus] = useState<string | null>(null);

  useEffect(() => {
    const newLanguage = searchParams.get('language') || 'en';
    setLanguage(newLanguage);
  }, [searchParams]);

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

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  const handleSuggestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSuggestion({ ...suggestion, [e.target.name]: e.target.value });
  };

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await submitSuggestion(suggestion);
      setSuggestionStatus(response.message);
      setSuggestion({ title: '', url: '', comment: '', email: '' });
      setTimeout(() => setSuggestionStatus(null), 3000);
    } catch (error) {
      setSuggestionStatus('Error submitting suggestion. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl space-y-8">
      {/* Hero Section with Filters */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 animate-fade-in">
        <div className="relative bg-gradient-to-r from-teal-500 to-coral-500 text-white py-8 px-6 rounded-xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">WaziGov: Empower Your Future</h1>
            <p className="text-lg">
              Clear, accessible summaries of government documents to help women and communities, easily understand their rights.
            </p>
            {/* Filters */}
            <div className="flex justify-center md:justify-start items-center space-x-3">
              <label className="flex items-center text-sm font-medium" htmlFor="region-select">
                <Globe size={18} className="mr-2" />
                Region:
              </label>
              <select
                id="region-select"
                value={region}
                onChange={handleRegionChange}
                className="border border-white rounded-lg py-2 px-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                aria-label="Select region"
              >
                {regions.map((r) => (
                  <option key={r.code} value={r.code}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="hidden md:block"></div> {/* Empty column for balance */}
      </div>

      {/* Summaries */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
            {summaries.length}
          </span>
          Rights & Resources for Women
        </h2>
        {loading ? (
          <div className="text-center py-8">
            <svg className="animate-spin h-8 w-8 text-teal-500 mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">Loading summaries...</p>
          </div>
        ) : summaries.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-sm text-gray-600">No summaries found for this region and language.</p>
            <p className="text-xs text-gray-500 mt-2">Suggest a document in the footer or try a different filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map((summary) => (
              <SummaryCard key={summary.id.toString()} summary={summary} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-500 to-coral-500 text-white py-12 mt-12 rounded-xl shadow-lg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Document Suggestion Form */}
            <div id="suggest" className="space-y-4">
              <h2 className="text-2xl font-bold">Suggest a Document</h2>
              <p className="text-sm">
                Have a policy or law you want summarized? Share it with us!
              </p>
              <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-xs font-medium">
                    Document Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={suggestion.title}
                    onChange={handleSuggestionChange}
                    className="mt-1 w-full border border-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
                    required
                    aria-label="Document title"
                  />
                </div>
                <div>
                  <label htmlFor="url" className="block text-xs font-medium">
                    Document URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={suggestion.url}
                    onChange={handleSuggestionChange}
                    className="mt-1 w-full border border-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
                    required
                    aria-label="Document URL"
                  />
                </div>
                <div>
                  <label htmlFor="comment" className="block text-xs font-medium">
                    Why This Document?
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={suggestion.comment}
                    onChange={handleSuggestionChange}
                    className="mt-1 w-full border border-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
                    rows={3}
                    aria-label="Reason for suggestion"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={suggestion.email}
                    onChange={handleSuggestionChange}
                    className="mt-1 w-full border border-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
                    aria-label="Your email (optional)"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-yellow-400 text-gray-800 px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors"
                  aria-label="Submit document suggestion"
                >
                  <Send size={18} />
                  <span>Submit</span>
                </button>
                {suggestionStatus && (
                  <p className="text-xs text-yellow-400">{suggestionStatus}</p>
                )}
              </form>
            </div>

            {/* Footer Links and Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">About WaziGov</h3>
                <p className="text-sm mt-2">
                WaziGov empowers women and communities with clear, accessible government document summaries, supporting SDG 5 (Gender Equality) and SDG 10 (Reduced Inequalities).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Connect With Us</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <Mail size={18} className="mr-2" />
                    <a href="mailto:contact@wazigov.org" className="hover:underline">
                      contact@wazigov.org
                    </a>
                  </li>
                  <li className="flex items-center">
                    <Heart size={18} className="mr-2" />
                    <Link href="/women" className="hover:underline">
                      Learn More About Our Mission
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <a href="https://x.com/wazigov" target="_blank" className="hover:underline">
                      Follow us on X
                    </a>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <a href="https://discord.gg/n5pcCHcGC6" target="_blank" className="hover:underline">
                      Join our Discord
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-xs opacity-75">
            <p>© 2025 WaziGov. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}