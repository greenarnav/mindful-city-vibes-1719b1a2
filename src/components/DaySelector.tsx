
import React, { useRef } from 'react';
import { useMood } from '@/context/MoodContext';
import SentimentIcon from './SentimentIcon';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DaySelector: React.FC = () => {
  const { cityData, setActiveTab } = useMood();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!cityData) return null;

  const handleDayClick = (day: string) => {
    setActiveTab(day);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 80; // Adjust this value as needed
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative mb-6">
      <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-zinc-900 rounded-full p-1 z-10"
      >
        <ChevronLeft size={16} />
      </button>
      
      <div 
        ref={scrollRef}
        className="bg-zinc-700 rounded-lg p-3 flex gap-5 overflow-x-auto hide-scrollbar mx-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cityData.pastFiveDays.map((day, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center cursor-pointer min-w-[50px]"
            onClick={() => handleDayClick(day.shortDay)}
          >
            <SentimentIcon sentiment={day.sentiment} size={24} />
            <span className="text-xs mt-1 text-zinc-300">{day.shortDay}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-zinc-900 rounded-full p-1 z-10"
      >
        <ChevronRight size={16} />
      </button>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DaySelector;
