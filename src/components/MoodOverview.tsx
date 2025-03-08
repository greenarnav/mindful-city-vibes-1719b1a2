
import React from 'react';
import { useMood } from '@/context/MoodContext';
import SentimentIcon from './SentimentIcon';

const MoodOverview: React.FC = () => {
  const { cityData, setShowDetailedInfo, setSelectedMoodCategory } = useMood();

  if (!cityData) return null;

  const handleCardClick = (category: string) => {
    setSelectedMoodCategory(category);
    setShowDetailedInfo(true);
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
      </div>
      
      <div 
        className="bg-zinc-900 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-zinc-800 transition-colors"
        onClick={() => handleCardClick('mood')}
      >
        <SentimentIcon sentiment="neutral" size={28} className="mb-2" />
        <h2 className="text-lg font-bold">Neutral</h2>
        <p className="text-xs text-zinc-400">Mood</p>
      </div>
    </div>
  );
};

export default MoodOverview;
