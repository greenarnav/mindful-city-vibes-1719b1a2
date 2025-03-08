
import React, { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { X, Search } from 'lucide-react';

interface CitySelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ isOpen, onClose }) => {
  const { citiesData, setActiveCity } = useMood();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen || !citiesData) return null;

  const filteredCities = citiesData.cities.filter(
    city => `${city.city}, ${city.state}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city: string, state: string) => {
    setActiveCity(`${city}, ${state}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-zinc-800 rounded-2xl max-w-md w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">Select a City</h2>
          <button 
            onClick={onClose} 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 border-b border-zinc-700">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {filteredCities.map((city, index) => (
            <button
              key={index}
              className="w-full text-left p-3 hover:bg-zinc-700 rounded-lg transition-colors"
              onClick={() => handleCitySelect(city.city, city.state)}
            >
              {city.city}, {city.state}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
