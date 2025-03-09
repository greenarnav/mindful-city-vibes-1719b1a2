
import React, { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { Users, MapPin, Settings, FlaskConical, Plus } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'city' | 'contacts' | 'settings' | 'beta'>('city');

  return (
    <div className="bg-zinc-800 min-h-screen text-white">
      <div className="max-w-sm mx-auto relative">
        {/* Phone frame for design */}
        <div className="px-4 py-6 max-w-sm mx-auto flex flex-col h-screen">
          {/* Header */}
          <div className="flex justify-center items-center mb-6">
            <CityHeader />
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col relative overflow-y-auto mb-16">
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
                      <div 
                        key={index} 
                        className="flex items-center justify-between bg-zinc-800 p-3 rounded-lg cursor-pointer hover:bg-zinc-700 transition-colors"
                        onClick={() => {
                          // Set the category to the neighborhood and show detailed info
                          useMood().setSelectedMoodCategory(`neighborhood-${neighborhood.id}`);
                          useMood().setShowDetailedInfo(true);
                        }}
                      >
                        <div className="flex items-center">
                          <div 
                            className="w-6 h-6 rounded-full mr-3 flex items-center justify-center bg-zinc-700"
                            style={{ 
                              backgroundColor: `var(--mood-${neighborhood.currentMood.mood.toLowerCase()})`,
                              boxShadow: `0 0 8px var(--mood-${neighborhood.currentMood.mood.toLowerCase()})` 
                            }}
                          >
                            {/* You could add a mini emoji or icon here */}
                            <span className="text-xs">😊</span>
                          </div>
                          <span>{neighborhood.name}</span>
                        </div>
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
          
          {/* Bottom Toolbar */}
          <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700">
            <div className="max-w-sm mx-auto flex justify-around">
              <button 
                onClick={() => setActiveTab('contacts')} 
                className={`p-4 flex flex-col items-center ${activeTab === 'contacts' ? 'text-white' : 'text-zinc-400'}`}
              >
                <Users size={20} />
                <span className="text-xs mt-1">Contacts</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('city');
                  setShowCitySelector(true);
                }} 
                className={`p-4 flex flex-col items-center ${activeTab === 'city' ? 'text-white' : 'text-zinc-400'}`}
              >
                <MapPin size={20} />
                <span className="text-xs mt-1">Map</span>
              </button>
              <button 
                onClick={() => setActiveTab('settings')} 
                className={`p-4 flex flex-col items-center ${activeTab === 'settings' ? 'text-white' : 'text-zinc-400'}`}
              >
                <Settings size={20} />
                <span className="text-xs mt-1">Settings</span>
              </button>
              <button 
                onClick={() => setActiveTab('beta')} 
                className={`p-4 flex flex-col items-center ${activeTab === 'beta' ? 'text-white' : 'text-zinc-400'}`}
              >
                <FlaskConical size={20} />
                <span className="text-xs mt-1">Beta</span>
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
