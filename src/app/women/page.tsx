// src/app/women/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SummaryCard from '../../components/SummaryCard';
import { fetchSummaries } from '../../lib/api';
import { Summary } from '../../types/index';

export default function Women() {
  const searchParams = useSearchParams();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const language = searchParams.get('language') || 'en';

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const summariesData = await fetchSummaries('UG', language);
      setSummaries(
        summariesData.filter((s) =>
          s.text.toLowerCase().includes('women') ||
          s.text.toLowerCase().includes('gender') ||
          s.document_title.toLowerCase().includes('women')
        )
      );
      setLoading(false);
    };
    loadData();
  }, [language]);

  return (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-r from-coral-500 to-yellow-400 text-white py-8 rounded-xl">
        <h1 className="text-4xl font-bold">Empowering Women (SDG 5)</h1>
        <p className="text-lg mt-2">Understand Your Rights with Clear Government Document Summaries</p>
      </div> 
      {loading ? (
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-coral-500 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
      ) : summaries.length === 0 ? (
        <p className="text-center text-gray-600">No women’s rights documents found.</p>
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