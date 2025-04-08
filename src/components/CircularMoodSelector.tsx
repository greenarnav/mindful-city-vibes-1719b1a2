
import React, { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import MoodIcon from './MoodIcon'; // Make sure MoodIcon is imported
import { Slider } from '@/components/ui/slider';
import { MoodType } from '@/types/mood';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CircularMoodSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const CircularMoodSelector: React.FC<CircularMoodSelectorProps> = ({ isOpen, onClose }) => {
  const { submitMood } = useMood();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<MoodType>('happy');
  const [moodValue, setMoodValue] = useState<number>(75);

  const moodOptions: MoodType[] = ['happy', 'energetic', 'calm', 'melancholy', 'stressed', 'inspired'];

  const handleSubmit = (mood: MoodType, value: number) => {
    submitMood(mood, value);
    toast({
      title: "Mood submitted",
      description: "Your mood has been added to the city average.",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-zinc-900 text-white rounded-2xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold mb-6 text-center">How are you feeling?</h2>
        
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>
          
          {moodOptions.map((mood, index) => {
            const angle = (index * 60) * (Math.PI / 180);
            const radius = 90; // Distance from center
            const x = radius * Math.cos(angle) + 128;
            const y = radius * Math.sin(angle) + 128;
            
            return (
              <button
                key={mood}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  selectedMood === mood 
                    ? `bg-mood-${mood} text-white scale-110 shadow-lg` 
                    : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
                style={{ left: `${x}px`, top: `${y}px` }}
                onClick={() => setSelectedMood(mood)}
              >
                <div className="flex flex-col items-center">
                  <MoodIcon mood={mood} size={24} />
                  <span className="text-xs mt-1 capitalize">{mood}</span>
                </div>
              </button>
            );
          })}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className={`w-24 h-24 rounded-full bg-mood-${selectedMood} text-white flex items-center justify-center shadow-lg transition-colors hover:opacity-90`}
              onClick={() => handleSubmit(selectedMood, moodValue)}
            >
              <div className="flex flex-col items-center">
                <MoodIcon mood={selectedMood} size={32} />
                <span className="text-sm mt-1 font-medium capitalize">{selectedMood}</span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex justify-between">
            <span>Intensity</span>
            <span>{moodValue}%</span>
          </label>
          <Slider
            value={[moodValue]}
            onValueChange={(values) => setMoodValue(values[0])}
            max={100}
            step={1}
            className={`text-mood-${selectedMood}`}
          />
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularMoodSelector;
