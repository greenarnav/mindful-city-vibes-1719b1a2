
import React, { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import MoodIcon from './MoodIcon'; // Make sure MoodIcon is imported
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/mood';
import { useToast } from '@/hooks/use-toast';

const AddMood: React.FC = () => {
  const { submitMood } = useMood();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<MoodType>('happy');
  const [moodValue, setMoodValue] = useState<number>(75);

  const moodOptions: MoodType[] = ['happy', 'energetic', 'calm', 'melancholy', 'stressed', 'inspired'];

  const handleSubmit = () => {
    submitMood(selectedMood, moodValue);
    toast({
      title: "Mood submitted",
      description: "Your mood has been added to the city average.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Mood</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
            <div className="grid grid-cols-3 gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood}
                  className={`p-3 rounded-lg border flex flex-col items-center gap-2 hover:bg-accent transition-colors ${
                    selectedMood === mood 
                      ? `border-mood-${mood} bg-mood-${mood}/10` 
                      : 'border-border'
                  }`}
                  onClick={() => setSelectedMood(mood)}
                >
                  <MoodIcon mood={mood} size={28} />
                  <span className="text-sm capitalize">{mood}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Intensity: {moodValue}%
            </label>
            <Slider
              value={[moodValue]}
              onValueChange={(values) => setMoodValue(values[0])}
              max={100}
              step={1}
              className={`text-mood-${selectedMood}`}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit My Mood
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddMood;
