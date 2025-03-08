
import React from 'react';
import { useMood } from '@/context/MoodContext';
import { MapPin } from 'lucide-react';

const CitiesList: React.FC = () => {
  const { citiesData, setActiveCity, setShowCitySelector } = useMood();

  if (!citiesData) return null;

  const handleCityClick = (city: string, state: string) => {
    setActiveCity(`${city}, ${state}`);
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
            <MapPin size={14} className="mr-2 text-zinc-400" />
            <span className="text-sm truncate">{city.city}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitiesList;
