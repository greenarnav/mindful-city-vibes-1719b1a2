
import React from 'react';
import { useMood } from '@/context/MoodContext';
import { Building, MapPin } from 'lucide-react';

const CitiesList: React.FC = () => {
  const { citiesData, setActiveCity, setShowCitySelector, setSelectedMoodCategory, setShowDetailedInfo } = useMood();

  if (!citiesData) return null;

  const handleCityClick = (city: string, state: string) => {
    // Set active city
    setActiveCity(`${city}, ${state}`);
    
    // Also show detailed info for this city
    setSelectedMoodCategory(`city-${city}`);
    setShowDetailedInfo(true);
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Popular Cities</h2>
        <button 
          onClick={() => setShowCitySelector(true)}
          className="text-xs text-zinc-400 hover:text-white transition-colors"
        >
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {citiesData.cities.slice(0, 4).map((city, index) => (
          <button
            key={index}
            className="flex items-center bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition-colors text-left"
            onClick={() => handleCityClick(city.city, city.state)}
          >
            <div className="w-6 h-6 rounded-full mr-2 bg-zinc-700 flex items-center justify-center">
              <Building size={14} className="text-zinc-400" />
            </div>
            <span className="text-sm truncate">{city.city}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitiesList;
