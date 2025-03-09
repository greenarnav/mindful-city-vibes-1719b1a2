
import React, { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { Users, MapPin, Settings, FlaskConical } from 'lucide-react';
import CityHeader from './CityHeader';
import MoodOverview from './MoodOverview';
import DaySelector from './DaySelector';
import DetailedMoodInfo from './DetailedMoodInfo';
import CitySelector from './CitySelector';
import CircularMoodSelector from './CircularMoodSelector';
import CitiesList from './CitiesList';
import FriendsView from './FriendsView';
import SettingsView from './SettingsView';
import BetaFeaturesView from './BetaFeaturesView';
import MapView from './MapView';

const Layout: React.FC = () => {
  const { refreshData, showDetailedInfo, cityData } = useMood();
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [activeTab, setActiveTab] = useState<'city' | 'contacts' | 'settings' | 'beta'>('city');

  // Render the appropriate view based on the active tab
  const renderTabContent = () => {
    if (showDetailedInfo) {
      return <DetailedMoodInfo />;
    }

    switch (activeTab) {
      case 'contacts':
        return <FriendsView />;
      case 'settings':
        return <SettingsView />;
      case 'beta':
        return <BetaFeaturesView />;
      case 'city':
      default:
        if (showCitySelector) {
          return <MapView />;
        }
        return (
          <>
            <MoodOverview />
            <DaySelector />
            
            {/* Neighborhoods Section */}
            <div className="bg-zinc-900 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold mb-3">Neighborhoods</h2>
              <div className="space-y-3">
                {cityData?.neighborhoods.map((neighborhood, index) => {
                  const moodColor = `var(--mood-${neighborhood.currentMood.mood.toLowerCase()})`;
                  
                  return (
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
                          className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                          style={{ boxShadow: `0 0 8px ${moodColor}` }}
                        >
                          <MoodIcon mood={neighborhood.currentMood.mood} size={20} />
                        </div>
                        <span className="font-medium">{neighborhood.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-500"
                            style={{ 
                              width: `${neighborhood.currentMood.value}%`, 
                              backgroundColor: moodColor,
                              boxShadow: `0 0 8px ${moodColor}`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-zinc-400">{neighborhood.currentMood.mood}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cities List */}
            <CitiesList />
          </>
        );
    }
  };

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
            {renderTabContent()}
            
            {/* Add mood button (repositioned to the side) */}
            <div className="fixed bottom-20 right-4 z-10">
              <button 
                onClick={() => setShowMoodSelector(true)}
                className="w-12 h-12 bg-zinc-700 text-white rounded-full flex items-center justify-center shadow-lg"
                style={{ boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)' }}
              >
                <span className="text-2xl">+</span>
              </button>
            </div>
          </div>
          
          {/* Bottom Toolbar */}
          <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 z-20">
            <div className="max-w-sm mx-auto flex justify-around">
              <button 
                onClick={() => {
                  setActiveTab('contacts');
                  useMood().setShowDetailedInfo(false);
                }} 
                className={`p-4 flex flex-col items-center ${activeTab === 'contacts' ? 'text-white' : 'text-zinc-400'}`}
              >
                <Users size={20} />
                <span className="text-xs mt-1">Contacts</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('city');
                  setShowCitySelector(true);
                  useMood().setShowDetailedInfo(false);
                }} 
                className={`p-4 flex flex-col items-center ${activeTab === 'city' && showCitySelector ? 'text-white' : 'text-zinc-400'}`}
              >
                <MapPin size={20} />
                <span className="text-xs mt-1">Map</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('settings');
                  useMood().setShowDetailedInfo(false);
                }} 
                className={`p-4 flex flex-col items-center ${activeTab === 'settings' ? 'text-white' : 'text-zinc-400'}`}
              >
                <Settings size={20} />
                <span className="text-xs mt-1">Settings</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab('beta');
                  useMood().setShowDetailedInfo(false);
                }} 
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
        isOpen={showCitySelector && !showDetailedInfo && activeTab === 'city' && !showCitySelector} 
        onClose={() => setShowCitySelector(false)} 
      />
    </div>
  );
};

export default Layout;
