
import React from 'react';
import { useMood } from '@/context/MoodContext';
import { format } from 'date-fns';

const CityHeader: React.FC = () => {
  const { cityData } = useMood();
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMM d');

  if (!cityData) return null;

  return (
    <div className="text-center">
      <p className="text-sm font-medium">{formattedDate}</p>
      <p className="text-xs text-zinc-400">{cityData.city}, {cityData.state}</p>
    </div>
  );
};

export default CityHeader;
