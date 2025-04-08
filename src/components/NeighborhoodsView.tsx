import React, { useState } from 'react';
import { useMood } from '@/context/MoodContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MoodBadge from './MoodBadge';
import MoodChart from './MoodChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin } from 'lucide-react';
import MoodIcon from './MoodIcon';

const NeighborhoodsView: React.FC = () => {
  const { cityData, loading } = useMood();
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);

  if (loading || !cityData) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="h-40 bg-muted rounded-lg"></div>
      </div>
    );
  }

  const activeNeighborhood = selectedNeighborhood 
    ? cityData.neighborhoods.find(n => n.id === selectedNeighborhood)
    : cityData.neighborhoods[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Neighborhoods</h2>
        <p className="text-muted-foreground">Compare moods across different areas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cityData.neighborhoods.map(neighborhood => (
          <Card 
            key={neighborhood.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeNeighborhood?.id === neighborhood.id 
                ? 'ring-2 ring-primary/50' 
                : ''
            }`}
            onClick={() => setSelectedNeighborhood(neighborhood.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">{neighborhood.name}</h3>
                  <MoodBadge 
                    mood={neighborhood.currentMood.mood} 
                    value={neighborhood.currentMood.value} 
                    showValue 
                    size="sm"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeNeighborhood && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{activeNeighborhood.name} Mood History</CardTitle>
          </CardHeader>
          <CardContent>
            <MoodChart data={activeNeighborhood.pastMoods} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NeighborhoodsView;
