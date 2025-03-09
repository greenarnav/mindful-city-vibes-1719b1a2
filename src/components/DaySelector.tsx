
import React, { useRef } from 'react';
import { useMood } from '@/context/MoodContext';
import SentimentIcon from './SentimentIcon';

const DaySelector: React.FC = () => {
  const { cityData, setActiveTab, activeTab } = useMood();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!cityData) return null;

  const handleDayClick = (day: string) => {
    setActiveTab(day);
  };

  return (
    <div className="relative mb-6">
      <div 
        ref={scrollRef}
        className="bg-zinc-700 rounded-lg p-3 flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cityData.pastFiveDays.map((day, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center cursor-pointer min-w-[50px] snap-start ${
              activeTab === day.shortDay ? 'opacity-100' : 'opacity-70'
            }`}
            onClick={() => handleDayClick(day.shortDay)}
          >
            <SentimentIcon sentiment={day.sentiment} size={24} />
            <span className="text-xs mt-1 text-zinc-300">{day.shortDay}</span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default DaySelector;
