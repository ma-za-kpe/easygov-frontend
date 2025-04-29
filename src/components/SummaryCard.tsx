// src/components/SummaryCard.tsx
import { useState, useEffect } from 'react';
import FactCheckButton from './FactCheckButton';
import { Summary } from '../types';
import { Volume2, VolumeX, ChevronDown, ChevronUp, BookOpen, BarChart, Info } from 'lucide-react';

// Define language type to ensure type safety
type SupportedLanguageCode = 'en' | 'sw' | 'fr' | 'ha' | 'yo' | 'ar';

// Languages supported by the browser's speech synthesis
const SUPPORTED_LANGUAGES: Record<SupportedLanguageCode, { name: string; code: string }> = {
  en: { name: 'English', code: 'en-US' },
  sw: { name: 'Swahili', code: 'sw' },
  fr: { name: 'French', code: 'fr-FR' },
  ha: { name: 'Hausa', code: 'ha' },
  yo: { name: 'Yoruba', code: 'yo' },
  ar: { name: 'Arabic', code: 'ar' },
};

// Default language if none is available
const DEFAULT_LANGUAGE: SupportedLanguageCode = 'en';

// Type for audio content selection
type AudioContentType = 'title' | 'original' | 'explanation' | 'all';

export default function SummaryCard({ summary }: { summary: Summary }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContent, setAudioContent] = useState<AudioContentType>('all');
  
  // Initialize with a default language that we know exists in our object
  const [selectedVoiceLanguage, setSelectedVoiceLanguage] = useState<SupportedLanguageCode>(DEFAULT_LANGUAGE);
  const [availableVoices, setAvailableVoices] = useState<SupportedLanguageCode[]>([]);

  // Initialize based on summary language if it exists in our supported languages
  useEffect(() => {
    if (summary.language && summary.language in SUPPORTED_LANGUAGES) {
      setSelectedVoiceLanguage(summary.language as SupportedLanguageCode);
    }
  }, [summary.language]);

  // Function to check which voices are available in the browser
  useEffect(() => {
    const checkAvailableVoices = () => {
      if (!window.speechSynthesis) return;
      
      const voices = window.speechSynthesis.getVoices();
      const availableLangCodes = new Set<string>();
      
      // Check which languages are available
      voices.forEach(voice => {
        const langCode = voice.lang.split('-')[0];
        availableLangCodes.add(langCode);
      });
      
      // Filter our supported languages to only those available
      const available = Object.keys(SUPPORTED_LANGUAGES).filter(lang => 
        availableLangCodes.has(lang.split('-')[0])
      ) as SupportedLanguageCode[];
      
      // If no voices are available, at least include English as a fallback
      if (available.length === 0) {
        available.push(DEFAULT_LANGUAGE);
      }
      
      setAvailableVoices(available);
      
      // If current selection isn't available, default to English or first available
      if (!available.includes(selectedVoiceLanguage)) {
        setSelectedVoiceLanguage(available.includes(DEFAULT_LANGUAGE) ? DEFAULT_LANGUAGE : available[0]);
      }
    };

    // Initial check
    checkAvailableVoices();
    
    // Setup listener for when voices change or load
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = checkAvailableVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoiceLanguage]);

  // Function to toggle text expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to get text based on selected audio content
  const getTextToRead = (): string => {
    switch (audioContent) {
      case 'title':
        return summary.document_title;
      case 'original':
        return summary.original_text || summary.text;
      case 'explanation':
        return summary.explanation || "This budget impacts gender equality and reduced inequalities in your region.";
      case 'all':
      default:
        return `${summary.document_title}. ${summary.original_text || summary.text}. ${summary.explanation || ''}`;
    }
  };

  // Function to handle text-to-speech in the selected language
  const handleSpeak = () => {
    if (isPlaying) {
      // Stop speaking
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Start speaking
    if ('speechSynthesis' in window) {
      const textToRead = getTextToRead();
      const utterance = new SpeechSynthesisUtterance(textToRead);

      // Get language code - make sure it exists
      const languageInfo = SUPPORTED_LANGUAGES[selectedVoiceLanguage] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
      utterance.lang = languageInfo.code;

      // Try to find a voice for the selected language
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith(languageInfo.code.split('-')[0]));
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  // Handle language change for TTS
  const handleVoiceLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as SupportedLanguageCode;
    if (newLang in SUPPORTED_LANGUAGES) {
      setSelectedVoiceLanguage(newLang);
    } else {
      setSelectedVoiceLanguage(DEFAULT_LANGUAGE);
    }
    
    // Stop any current speech
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Handle audio content selection change
  const handleAudioContentChange = (content: AudioContentType) => {
    setAudioContent(content);
    
    // Stop any current speech
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Get label for the current selection
  const getAudioContentLabel = (): string => {
    switch (audioContent) {
      case 'title': return 'Title';
      case 'original': return 'Budget Text';
      case 'explanation': return 'Explanation';
      case 'all': return 'Everything';
      default: return 'Select';
    }
  };

  // Get language name safely
  const getLanguageName = (): string => {
    return selectedVoiceLanguage && SUPPORTED_LANGUAGES[selectedVoiceLanguage] 
      ? SUPPORTED_LANGUAGES[selectedVoiceLanguage].name 
      : SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE].name;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-teal-500">
      {/* Color indicators for SDG 5 & SDG 10 */}
      <div className="flex mb-2 gap-2">
        <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full" title="SDG 5: Gender Equality">SDG 5</span>
        <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full" title="SDG 10: Reduced Inequalities">SDG 10</span>
      </div>
      
      {/* Document Title */}
      <h3 className="text-xl font-semibold text-teal-500 mb-2">{summary.document_title}</h3>
      
      {/* Original Text Section */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-gray-700 flex items-center">
            <BookOpen size={18} className="mr-2 text-teal-600" />
            <span>Budget Text</span>
          </h4>
          <button
            onClick={toggleExpand}
            className="text-teal-500 flex items-center text-sm"
            aria-label={isExpanded ? "Collapse text" : "Expand text"}
          >
            {isExpanded ? (
              <>
                <span>Show less</span>
                <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                <span>Show more</span>
                <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
        </div>
        
        {/* Original excerpt - can be expanded */}
        <div className={`bg-gray-50 rounded-lg p-3 text-gray-700 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {summary.original_text || summary.text}
        </div>
      </div>
      
      {/* Simplified Explanation */}
      <div className="mt-4">
        <h4 className="font-medium text-gray-700 mb-2 flex items-center">
          <Info size={18} className="mr-2 text-pink-600" />
          <span>What This Means For Women & Marginalized Groups</span>
        </h4>
        <div className="bg-pink-50 rounded-lg p-3 border-l-2 border-pink-300">
          <p className="text-gray-700 text-base">
            {summary.explanation || 
            "This budget impacts gender equality and reduced inequalities in your region."}
          </p>
        </div>
      </div>
      
      {/* Audio Controls Panel */}
      <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
        <h5 className="font-medium text-gray-700 mb-3 flex items-center">
          <Volume2 size={18} className="mr-2 text-purple-600" />
          <span>Listen to the budget information</span>
        </h5>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* What to listen to */}
          <div className="flex-1">
            <label className="text-sm text-gray-600 block mb-1">
              What would you like to hear?
            </label>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleAudioContentChange('title')}
                className={`px-3 py-1 rounded-full text-sm border ${
                  audioContent === 'title' 
                    ? 'bg-teal-100 border-teal-500 text-teal-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={audioContent === 'title'}
              >
                Title
              </button>
              <button 
                onClick={() => handleAudioContentChange('original')}
                className={`px-3 py-1 rounded-full text-sm border ${
                  audioContent === 'original' 
                    ? 'bg-pink-100 border-pink-500 text-pink-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={audioContent === 'original'}
              >
                Budget Text
              </button>
              <button 
                onClick={() => handleAudioContentChange('explanation')}
                className={`px-3 py-1 rounded-full text-sm border ${
                  audioContent === 'explanation' 
                    ? 'bg-purple-100 border-purple-500 text-purple-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={audioContent === 'explanation'}
              >
                Explanation
              </button>
              <button 
                onClick={() => handleAudioContentChange('all')}
                className={`px-3 py-1 rounded-full text-sm border ${
                  audioContent === 'all' 
                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={audioContent === 'all'}
              >
                Everything
              </button>
            </div>
          </div>
          
          {/* Language selector */}
          {availableVoices.length > 0 && (
            <div className="flex-1">
              <label htmlFor="voice-language" className="text-sm text-gray-600 block mb-1">
                Language to listen in:
              </label>
              <select
                id="voice-language"
                value={selectedVoiceLanguage}
                onChange={handleVoiceLanguageChange}
                className="border border-gray-300 rounded-lg py-1 px-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Select voice language"
              >
                {availableVoices.map(lang => (
                  <option key={lang} value={lang}>
                    {SUPPORTED_LANGUAGES[lang].name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Play button */}
        <div className="mt-3 flex justify-between items-center">
          <button
            onClick={handleSpeak}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isPlaying 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-teal-500 text-white hover:bg-teal-600'
            } transition-colors`}
            aria-label={isPlaying ? "Stop reading" : `Read ${getAudioContentLabel()} aloud in ${getLanguageName()}`}
          >
            {isPlaying ? (
              <>
                <VolumeX size={20} className="mr-2" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 size={20} className="mr-2" />
                <span>Listen to {getAudioContentLabel()}</span>
              </>
            )}
          </button>
          
          <FactCheckButton
            sourceUrl={summary.factCheck.source_url}
            isVerified={summary.factCheck.is_verified}
          />
        </div>
      </div>
      
      {/* Footer info */}
      <div className="mt-3 text-right text-xs text-gray-500">
        {new Date(summary.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}