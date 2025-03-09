
import React, { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { User, MapPin, Plus } from 'lucide-react';
import CityHeader from './CityHeader';
import MoodOverview from './MoodOverview';
import DaySelector from './DaySelector';
import DetailedMoodInfo from './DetailedMoodInfo';
import CitySelector from './CitySelector';
import CircularMoodSelector from './CircularMoodSelector';
import CitiesList from './CitiesList';

const Layout: React.FC = () => {
  const { refreshData, showDetailedInfo, cityData } = useMood();
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showCitySelector, setShowCitySelector] = useState(false);

  return (
    <div className="bg-zinc-800 min-h-screen text-white">
      <div className="max-w-sm mx-auto relative">
        {/* Phone frame for design */}
        <div className="px-4 py-6 max-w-sm mx-auto flex flex-col h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setShowCitySelector(true)}
              className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center"
            >
              <MapPin size={18} />
            </button>
            
            <CityHeader />
            
            <button 
              onClick={() => {}}
              className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center"
            >
              <User size={18} />
            </button>
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col relative overflow-y-auto">
            {showDetailedInfo ? (
              <DetailedMoodInfo />
            ) : (
              <>
                <MoodOverview />
                <DaySelector />
                
                {/* Neighborhoods Section */}
                <div className="bg-zinc-900 rounded-lg p-4 mb-6">
                  <h2 className="text-lg font-semibold mb-3">Neighborhoods</h2>
                  <div className="space-y-3">
                    {cityData?.neighborhoods.map((neighborhood, index) => (
                      <div key={index} className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg">
                        <span>{neighborhood.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-zinc-400">{neighborhood.currentMood.mood}</span>
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ 
                              backgroundColor: `var(--mood-${neighborhood.currentMood.mood.toLowerCase()})`,
                              boxShadow: `0 0 8px var(--mood-${neighborhood.currentMood.mood.toLowerCase()})` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cities List */}
                <CitiesList />
              </>
            )}
            
            {/* Add mood button (repositioned to the side) */}
            <div className="absolute bottom-10 right-0">
              <button 
                onClick={() => setShowMoodSelector(true)}
                className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <CircularMoodSelector 
        isOpen={showMoodSelector} 
        onClose={() => setShowMoodSelector(false)} 
      />
      
      <CitySelector 
        isOpen={showCitySelector} 
        onClose={() => setShowCitySelector(false)} 
      />
    </div>
  );
};

export default Layout;
