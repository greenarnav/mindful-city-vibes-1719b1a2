
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CityMood, MoodType } from '@/types/mood';
import { getCityMoodData, submitUserMood } from '@/data/mockData';

interface MoodContextType {
  cityData: CityMood | null;
  loading: boolean;
  error: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  submitMood: (mood: MoodType, value: number) => void;
  refreshData: () => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cityData, setCityData] = useState<CityMood | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('today');

  const fetchData = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      const data = getCityMoodData();
      setCityData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch city mood data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitMood = (mood: MoodType, value: number) => {
    try {
      const success = submitUserMood(mood, value);
      if (success) {
        fetchData(); // Refresh data after submission
      }
    } catch (err) {
      setError('Failed to submit your mood');
      console.error(err);
    }
  };

  return (
    <MoodContext.Provider
      value={{
        cityData,
        loading,
        error,
        activeTab,
        setActiveTab,
        submitMood,
        refreshData: fetchData,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};
