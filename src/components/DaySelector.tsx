
import React, { useRef, useEffect } from 'react';
import { useMood } from '@/context/MoodContext';
import SentimentIcon from './SentimentIcon';

const DaySelector: React.FC = () => {
  const { cityData, setActiveTab, activeTab } = useMood();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!cityData) return null;

  const handleDayClick = (day: string) => {
    setActiveTab(day);
  };

  // Auto-scroll to active tab
  useEffect(() => {
    if (scrollRef.current && activeTab) {
      const activeElement = scrollRef.current.querySelector(`[data-day="${activeTab}"]`);
      if (activeElement) {
        const containerWidth = scrollRef.current.offsetWidth;
        const elementOffset = activeElement.getBoundingClientRect().left;
        const containerOffset = scrollRef.current.getBoundingClientRect().left;
        const scrollPosition = elementOffset - containerOffset - containerWidth / 2 + 25;
        
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollLeft + scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);

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
            data-day={day.shortDay}
            className={`flex flex-col items-center cursor-pointer min-w-[60px] snap-start transition-all duration-300 ${
              activeTab === day.shortDay ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-90'
            }`}
            onClick={() => handleDayClick(day.shortDay)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              activeTab === day.shortDay ? 'shadow-[0_0_15px_var(--mood-energetic)]' : ''
            }`}>
              <SentimentIcon sentiment={day.sentiment} size={28} />
            </div>
            <span className="text-xs mt-1 text-zinc-300 font-semibold">{day.shortDay}</span>
          </div>
        ))}
      </div>
      
      <style>
        {`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        `}
      </style>
    </div>
  );
};

export default DaySelector;
