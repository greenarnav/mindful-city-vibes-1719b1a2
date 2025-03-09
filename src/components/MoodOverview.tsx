
import React from 'react';
import { useMood } from '@/context/MoodContext';
import SentimentIcon from './SentimentIcon';
import MoodIcon from './MoodIcon';
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';

const MoodOverview: React.FC = () => {
  const { cityData, setShowDetailedInfo, setSelectedMoodCategory } = useMood();

  if (!cityData) return null;

  const handleCardClick = (category: string) => {
    setSelectedMoodCategory(category);
    setShowDetailedInfo(true);
  };

  // Render the trend indicator with a line
  const renderTrend = (trend: 'better' | 'worse' | 'same') => {
    const getColor = () => {
      switch (trend) {
        case 'better': return 'bg-gradient-to-r from-green-800 to-green-500';
        case 'worse': return 'bg-gradient-to-r from-red-800 to-red-500';
        case 'same': return 'bg-gradient-to-r from-zinc-600 to-zinc-400';
      }
    };

    const getIcon = () => {
      switch (trend) {
        case 'better':
          return <ArrowUp size={14} className="text-green-500" />;
        case 'worse':
          return <ArrowDown size={14} className="text-red-500" />;
        case 'same':
          return <ArrowRight size={14} className="text-zinc-400" />;
      }
    };

    return (
      <div className="flex items-center mt-2 w-full">
        <div className={`h-1 flex-grow rounded-full ${getColor()}`} 
             style={{ boxShadow: trend === 'better' ? '0 0 8px #22c55e' : 
                               trend === 'worse' ? '0 0 8px #ef4444' : 
                               '0 0 5px #71717a' }}></div>
        <div className="ml-1">{getIcon()}</div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div 
        className="bg-zinc-900 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-zinc-800 transition-colors"
        onClick={() => handleCardClick('sentiment')}
      >
        <SentimentIcon sentiment={cityData.overall.sentiment} size={30} className="mb-2" />
        <h2 className="text-lg font-bold">{cityData.overall.sentiment.charAt(0).toUpperCase() + cityData.overall.sentiment.slice(1)}</h2>
        <p className="text-xs text-zinc-400">Sentiment</p>
        {renderTrend('better')}
      </div>
      
      <div 
        className="bg-zinc-900 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-zinc-800 transition-colors"
        onClick={() => handleCardClick('mood')}
      >
        <MoodIcon mood={cityData.overall.mood} size={30} className="mb-2" />
        <h2 className="text-lg font-bold">{cityData.overall.mood.charAt(0).toUpperCase() + cityData.overall.mood.slice(1)}</h2>
        <p className="text-xs text-zinc-400">Mood</p>
        {renderTrend('same')}
      </div>
    </div>
  );
};

export default MoodOverview;
