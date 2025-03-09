
import React from 'react';
import { useMood } from '@/context/MoodContext';
import { Building, MapPin } from 'lucide-react';
import MoodIcon from './MoodIcon';

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

  // This function simulates getting a random mood for each city
  // In a real app, this would come from your API
  const getMockMoodForCity = (cityName: string) => {
    const moods = ['happy', 'energetic', 'calm', 'melancholy', 'stressed', 'inspired'];
    // Use city name to generate a predictable but "random" index
    const charCode = cityName.charCodeAt(0) % moods.length;
    return moods[charCode] as 'happy' | 'energetic' | 'calm' | 'melancholy' | 'stressed' | 'inspired';
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
      
      <div className="space-y-3">
        {citiesData.cities.slice(0, 4).map((city, index) => {
          const cityMood = getMockMoodForCity(city.city);
          const colorVar = `var(--mood-${cityMood})`;
          
          return (
            <div
              key={index}
              className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer"
              onClick={() => handleCityClick(city.city, city.state)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                     style={{ boxShadow: `0 0 8px ${colorVar}` }}>
                  <MoodIcon mood={cityMood} size={20} />
                </div>
                <span className="font-medium">{city.city}</span>
              </div>
              <div className="flex items-center">
                <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden mr-2">
                  <div 
                    className="h-full transition-all duration-500"
                    style={{ 
                      width: `${30 + (index * 15)}%`, 
                      backgroundColor: colorVar,
                      boxShadow: `0 0 8px ${colorVar}`
                    }}
                  ></div>
                </div>
                <span className="text-sm text-zinc-400">{cityMood}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CitiesList;
