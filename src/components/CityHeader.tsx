
import React from 'react';
import { useMood } from '@/context/MoodContext';

const CityHeader: React.FC = () => {
  const { cityData } = useMood();

  if (!cityData) return null;

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{cityData.city}, {cityData.state}</h1>
    </div>
  );
};

export default CityHeader;
