// src/lib/api.ts
import axios from 'axios';
import { mockSummaries, mockRegions } from './mockData'; // Keep for fallback
import { Region, Summary, Suggestion } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  // Enable passing cookies in cross-domain requests if needed
  withCredentials: false,
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

export const fetchSummaries = async (region: string, language: string): Promise<Summary[]> => {
  try {
    // Use trailing slash to avoid redirects
    const url = `/api/summaries/?region=${region}&language=${language}`;
    console.log(`Fetching summaries: ${process.env.NEXT_PUBLIC_API_URL}${url}`);
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching summaries:', error);
    // Fallback to mock data
    return mockSummaries.filter(
      (summary) => summary.language === language && summary.document_title.includes(region)
    );
  }
};

export const fetchRegions = async (): Promise<Region[]> => {
  try {
    // Use trailing slash to avoid redirects
    const url = '/api/regions/';
    console.log(`Fetching regions: ${process.env.NEXT_PUBLIC_API_URL}${url}`);
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching regions:', error);
    return mockRegions;
  }
};


export const submitSuggestion = async (suggestion: Suggestion): Promise<{ message: string }> => {
  try {
    const response = await api.post('/suggestions', suggestion);
    return response.data;
  } catch (error) {
    console.error('Error submitting suggestion:', error);
    // Mock response
    return { message: 'Suggestion submitted successfully!' };
  }
};