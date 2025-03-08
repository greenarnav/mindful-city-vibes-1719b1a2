
import React from 'react';
import { useMood } from '@/context/MoodContext';
import SentimentIcon from './SentimentIcon';

const DaySelector: React.FC = () => {
  const { cityData } = useMood();

  if (!cityData) return null;

  return (
    <div className="bg-zinc-700 rounded-lg p-3 flex justify-between mb-6">
      {cityData.pastFiveDays.map((day, index) => (
        <div key={index} className="flex flex-col items-center">
          <SentimentIcon sentiment={day.sentiment} size={20} />
          <span className="text-xs mt-1 text-zinc-300">{day.shortDay}</span>
        </div>
      ))}
    </div>
  );
};

export default DaySelector;
