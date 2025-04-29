// src/components/FactCheckButton.tsx
import { useState } from 'react';
import { CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface FactCheckButtonProps {
  sourceUrl: string;
  isVerified: boolean;
}

export default function FactCheckButton({ sourceUrl, isVerified }: FactCheckButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSourceClick = () => {
    if (sourceUrl) {
      // Open the source URL in a new tab
      window.open(sourceUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative">
      <button
        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm
          ${isVerified 
            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleSourceClick}
      >
        {isVerified ? (
          <>
            <CheckCircle size={16} />
            <span>Verified</span>
          </>
        ) : (
          <>
            <AlertCircle size={16} />
            <span>Unverified</span>
          </>
        )}
        {sourceUrl && <ExternalLink size={14} className="ml-1" />}
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
          {isVerified 
            ? 'This information has been verified with official sources' 
            : 'This information needs verification'}
          {sourceUrl && (
            <div className="mt-1 text-blue-300 underline cursor-pointer" onClick={handleSourceClick}>
              View Source
            </div>
          )}
        </div>
      )}
    </div>
  );
}