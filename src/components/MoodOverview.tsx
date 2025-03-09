
import React from 'react';
import { useMood } from '@/context/MoodContext';
import SentimentIcon from './SentimentIcon';
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';

const MoodOverview: React.FC = () => {
  const { cityData, setShowDetailedInfo, setSelectedMoodCategory } = useMood();

  if (!cityData) return null;

  const handleCardClick = (category: string) => {
    setSelectedMoodCategory(category);
    setShowDetailedInfo(true);
  };

  // Simple helper to render the trend indicator
  const renderTrend = (trend: 'better' | 'worse' | 'same') => {
    switch (trend) {
      case 'better':
        return (
          <div className="flex items-center text-green-500 text-xs mt-1">
            <ArrowUp size={12} className="mr-1" />
            <span>Better than yesterday</span>
          </div>
        );
      case 'worse':
        return (
          <div className="flex items-center text-red-500 text-xs mt-1">
            <ArrowDown size={12} className="mr-1" />
            <span>Worse than yesterday</span>
          </div>
        );
      case 'same':
        return (
          <div className="flex items-center text-zinc-400 text-xs mt-1">
            <ArrowRight size={12} className="mr-1" />
            <span>Same as yesterday</span>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div 
        className="bg-zinc-900 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-zinc-800 transition-colors"
        onClick={() => handleCardClick('sentiment')}
      >
        <SentimentIcon sentiment={cityData.overall.sentiment} size={28} className="mb-2" />
        <h2 className="text-lg font-bold">{cityData.overall.sentiment.charAt(0).toUpperCase() + cityData.overall.sentiment.slice(1)}</h2>
        <p className="text-xs text-zinc-400">Sentiment</p>
        {renderTrend('better')} {/* We could make this dynamic based on actual data */}
      </div>
      
      <div 
        className="bg-zinc-900 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-zinc-800 transition-colors"
        onClick={() => handleCardClick('mood')}
      >
        <SentimentIcon sentiment="neutral" size={28} className="mb-2" />
        <h2 className="text-lg font-bold">Neutral</h2>
        <p className="text-xs text-zinc-400">Mood</p>
        {renderTrend('same')} {/* We could make this dynamic based on actual data */}
      </div>
    </div>
  );
};

export default MoodOverview;
