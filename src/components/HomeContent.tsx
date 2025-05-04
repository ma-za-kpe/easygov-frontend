'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SummaryCard from './SummaryCard';
import { fetchSummaries, fetchRegions, submitSuggestion } from '../lib/api';
import { Region, Summary, Suggestion } from '../types/index';
import {
  Globe,
  Send,
  Mail,
  Heart,
  Search,
  Info,
  X,
  Twitter,
  Facebook,
  ExternalLink,
  FileText,
  Users,
} from 'lucide-react';

export default function HomeContent({ language }: { language: string }) {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [region, setRegion] = useState('UG');
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState<Suggestion>({
    title: '',
    url: '',
    comment: '',
    email: '',
  });
  const [suggestionStatus, setSuggestionStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSummaries, setFilteredSummaries] = useState<Summary[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const summariesData = await fetchSummaries(region, language);
        console.log(`Fetching summaries summariesData: ${summariesData.forEach((summary) => console.log(summary))}`);

        const regionsData = await fetchRegions();
        setSummaries(summariesData);
        setFilteredSummaries(summariesData);
        setRegions(regionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [region, language]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSummaries(summaries);
    } else {
      const filtered = summaries.filter(
        (summary) =>
          summary.document_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          summary.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSummaries(filtered);
    }
  }, [searchTerm, summaries]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSuggestion({ ...suggestion, [e.target.name]: e.target.value });
  };

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await submitSuggestion(suggestion);
      setSuggestionStatus(response.message || 'Suggestion submitted successfully!');
      setSuggestion({ title: '', url: '', comment: '', email: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setSuggestionStatus(null);
      }, 2000);
    } catch (error) {
      console.log(error);
      setSuggestionStatus('Error submitting suggestion. Please try again.');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSuggestionStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSuggestionStatus(null);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-6 max-w-6xl flex-grow">
        <div className="space-y-8">
          {/* Hero Section with Filters */}
          <div className="animate-fade-in">
            <div className="relative bg-gradient-to-r from-teal-500 to-coral-500 text-white py-10 px-6 rounded-xl shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
              <div className="relative text-center md:text-left space-y-6 max-w-3xl mx-auto md:mx-0">
                <h1 className="text-3xl md:text-5xl font-bold">WaziGov: Empower Your Future</h1>
                <p className="text-lg md:text-xl">
                  Clear, accessible summaries of government documents to help women and communities
                  easily understand their rights.
                </p>
                <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 md:gap-6">
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <label
                      className="flex items-center text-sm font-medium whitespace-nowrap"
                      htmlFor="region-select"
                    >
                      <Globe size={18} className="mr-2" />
                      Region:
                    </label>
                    <select
                      id="region-select"
                      value={region}
                      onChange={handleRegionChange}
                      className="border border-white rounded-lg py-2 px-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm w-full md:w-auto"
                      aria-label="Select region"
                    >
                      {regions.map((r) => (
                        <option key={r.code} value={r.code}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative w-full md:w-auto flex-grow max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search documents..."
                      className="pl-10 pr-4 py-2 w-full border border-white rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <Link
                    href="/women"
                    className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 transition-colors text-gray-800 px-5 py-2 rounded-full text-sm font-medium"
                  >
                    <Info size={18} />
                    <span>About Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Summaries */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  {filteredSummaries.length}
                </span>
                Rights & Resources for Women
              </h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {searchTerm && filteredSummaries.length !== summaries.length && (
                    <span>
                      Showing {filteredSummaries.length} of {summaries.length} documents
                    </span>
                  )}
                </div>
                <button
                  onClick={openModal}
                  className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
                >
                  <FileText size={16} />
                  <span>Suggest Document</span>
                </button>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                <p className="mt-3 text-sm text-gray-600">Loading summaries...</p>
              </div>
            ) : filteredSummaries.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                {searchTerm ? (
                  <>
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="text-lg text-gray-600">No documents matching "{searchTerm}"</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Try different keywords or clear your search
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-3">📑</div>
                    <p className="text-lg text-gray-600">
                      No summaries found for this region and language.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <button onClick={openModal} className="text-teal-500 hover:underline">
                        Suggest a document
                      </button>{' '}
                      or try a different region.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredSummaries.map((summary) => (
                <SummaryCard key={summary.id.toString()} summary={summary} language={language} />
              ))}
            </div>
            )}
          </div>

          {/* Call to Action Section */}
          <div className="bg-teal-50 rounded-xl p-6 shadow-sm text-center my-12">
            <h3 className="text-2xl font-bold text-teal-700 mb-3">Missing something important?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Help us expand our collection by suggesting government documents that matter to you
              and your community.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full transition-colors shadow-md"
            >
              <Send size={18} className="mr-2" />
              Suggest a Document
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-12 mt-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About WaziGov</h3>
              <p className="text-gray-200 mb-4">
                WaziGov empowers women and communities with clear, accessible government document
                summaries, supporting SDG 5 (Gender Equality) and SDG 10 (Reduced Inequalities).
              </p>
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://twitter.com/wazigov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://facebook.com/wazigov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://discord.gg/n5pcCHcGC6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
                  aria-label="Discord"
                >
                  <Users size={18} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/women" className="text-gray-200 hover:text-white flex items-center">
                    <Heart size={16} className="mr-2" />
                    <span>About Our Mission</span>
                  </Link>
                </li>
                <li>
                  <Link href="/regions" className="text-gray-200 hover:text-white flex items-center">
                    <Globe size={16} className="mr-2" />
                    <span>Regional Resources</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={openModal}
                    className="text-gray-200 hover:text-white flex items-center"
                  >
                    <FileText size={16} className="mr-2" />
                    <span>Suggest a Document</span>
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:contact@wazigov.org"
                    className="text-gray-200 hover:text-white flex items-center"
                  >
                    <Mail size={16} className="mr-2" />
                    <span>Contact Us</span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Partners</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://example.com/partner1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-white flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    <span>UN Women</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://example.com/partner2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-white flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    <span>Africa Digital Rights Fund</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://example.com/partner3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-white flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    <span>East African Civic Tech Hub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white border-opacity-20 text-center">
            <p className="text-sm text-gray-300">© 2025 WaziGov. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Suggestion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Suggest a Document</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Have a policy or law you want summarized? Share it with us and help make government
                information more accessible.
              </p>
              <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Document Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={suggestion.title}
                    onChange={handleSuggestionChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                    required
                    aria-label="Document title"
                    placeholder="e.g., National Gender Policy 2024"
                  />
                </div>
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Document URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    value={suggestion.url}
                    onChange={handleSuggestionChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                    required
                    aria-label="Document URL"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    Why This Document?
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={suggestion.comment}
                    onChange={handleSuggestionChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                    rows={3}
                    aria-label="Reason for suggestion"
                    placeholder="Tell us why this document is important..."
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={suggestion.email}
                    onChange={handleSuggestionChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800"
                    aria-label="Your email (optional)"
                    placeholder="email@example.com"
                  />
                </div>
                {suggestionStatus && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      suggestionStatus.includes('Error')
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {suggestionStatus}
                  </div>
                )}
                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-3 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors"
                    aria-label="Submit document suggestion"
                  >
                    <Send size={16} />
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}