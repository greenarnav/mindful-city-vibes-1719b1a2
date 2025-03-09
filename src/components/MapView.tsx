
import React, { useEffect, useRef } from 'react';
import { useMood } from '@/context/MoodContext';

const MapView: React.FC = () => {
  const { activeCity } = useMood();
  const mapRef = useRef<HTMLDivElement>(null);

  // This is a placeholder for an actual map component
  // In a real app, you would integrate with a mapping library like mapbox-gl or leaflet
  
  useEffect(() => {
    if (mapRef.current) {
      // Here you would initialize your map
      console.log('Map view loaded', activeCity);
    }
  }, [activeCity]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-3">City Map</h2>
      
      <div 
        ref={mapRef}
        className="flex-1 bg-zinc-900 rounded-lg overflow-hidden relative min-h-[300px]"
      >
        {/* Placeholder gradient map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900"></div>
        
        {/* Map overlay with city markers */}
        <div className="absolute inset-0 p-4">
          <div className="text-center mt-8">
            <p className="text-zinc-400 mb-2">Interactive Map</p>
            <p className="text-xl font-bold mb-4">{activeCity}</p>
            
            {/* Placeholder for map elements */}
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center"
                   style={{ boxShadow: '0 0 20px #3b82f6' }}>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Mood regions */}
            <div className="flex justify-center mt-8 gap-2">
              {['happy', 'energetic', 'calm', 'stressed', 'inspired'].map((mood, index) => (
                <div 
                  key={index}
                  className="w-12 h-12 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                  style={{ 
                    backgroundColor: `var(--mood-${mood})`,
                    boxShadow: `0 0 10px var(--mood-${mood})`,
                    transform: `translate(${(index-2)*30}px, ${Math.sin(index*Math.PI/4)*40}px)` 
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Map attribution */}
        <div className="absolute bottom-2 left-2 text-xs text-zinc-500">
          Map data visualization
        </div>
      </div>
      
      <div className="mt-4 bg-zinc-900 rounded-lg p-4">
        <h3 className="font-medium mb-2">Nearby Cities</h3>
        <div className="space-y-2">
          {['San Jose', 'Oakland', 'Berkeley', 'Palo Alto'].map((city, index) => (
            <div key={index} className="flex items-center justify-between bg-zinc-800 p-2 rounded">
              <span>{city}</span>
              <span className="text-xs text-zinc-400">{5 + index * 10} miles</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
