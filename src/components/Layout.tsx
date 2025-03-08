
import React, { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { RefreshCw, Plus, User, ChevronDown, MapPin } from 'lucide-react';
import CityHeader from './CityHeader';
import MoodOverview from './MoodOverview';
import DaySelector from './DaySelector';
import FriendsList from './FriendsList';
import DetailedMoodInfo from './DetailedMoodInfo';
import CitySelector from './CitySelector';
import CircularMoodSelector from './CircularMoodSelector';

const Layout: React.FC = () => {
  const { refreshData, showDetailedInfo } = useMood();
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
          <div className="flex-1 flex flex-col">
            {showDetailedInfo ? (
              <DetailedMoodInfo />
            ) : (
              <>
                <MoodOverview />
                <DaySelector />
                <FriendsList />
              </>
            )}
          </div>
          
          {/* Add mood button */}
          <div className="sticky bottom-6 flex justify-center">
            <button 
              onClick={() => setShowMoodSelector(true)}
              className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg"
            >
              <Plus size={24} />
            </button>
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
