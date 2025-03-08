
import React from 'react';
import { useMood } from '@/context/MoodContext';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

const DetailedMoodInfo: React.FC = () => {
  const { cityData, selectedMoodCategory, setShowDetailedInfo } = useMood();

  if (!cityData) return null;

  const getSectionTitle = () => {
    switch (selectedMoodCategory) {
      case 'sentiment':
        return "City Sentiment";
      case 'mood':
        return "City Mood";
      default:
        return "Details";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button 
          onClick={() => setShowDetailedInfo(false)}
          className="mr-3 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold">{getSectionTitle()}</h2>
      </div>
      
      <div className="space-y-6">
        <Section title="What people are thinking about">
          {cityData.topics.thinking.map(topic => (
            <TopicItem key={topic.id} topic={topic} />
          ))}
        </Section>
        
        <Section title="What people care about">
          {cityData.topics.caring.map(topic => (
            <TopicItem key={topic.id} topic={topic} />
          ))}
        </Section>
        
        <Section title="Most burning topics">
          {cityData.topics.burning.map(topic => (
            <TopicItem key={topic.id} topic={topic} />
          ))}
        </Section>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

const TopicItem: React.FC<{ topic: { id: string, text: string, popularity: number } }> = ({ topic }) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-3">
      <div className="flex justify-between mb-2">
        <p className="text-sm">{topic.text}</p>
        <p className="text-sm font-bold">{topic.popularity}%</p>
      </div>
      <Progress value={topic.popularity} className="h-1.5 bg-zinc-700" />
    </div>
  );
};

export default DetailedMoodInfo;
