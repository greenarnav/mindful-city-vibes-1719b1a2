
import React from 'react';
import { useMood } from '@/context/MoodContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MoodBadge from './MoodBadge';
import MoodIcon from './MoodIcon';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';

const TodayMood: React.FC = () => {
  const { cityData, loading } = useMood();

  if (loading || !cityData) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="h-40 bg-muted rounded-lg"></div>
      </div>
    );
  }

  const { overall } = cityData;
  const date = new Date(overall.timestamp);
  const formattedDate = format(date, 'EEEE, MMMM d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Today's City Mood</h2>
        <div className="text-sm text-muted-foreground">{formattedDate}</div>
      </div>

      <Card className="overflow-hidden">
        <div className={`h-2 bg-mood-${overall.mood}`}></div>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center p-4">
            <MoodIcon mood={overall.mood} size={64} className="mb-4 animate-pulse-slow" />
            <h3 className="text-4xl font-bold mb-2">
              {overall.mood.charAt(0).toUpperCase() + overall.mood.slice(1)}
            </h3>
            <MoodBadge mood={overall.mood} value={overall.value} showValue size="lg" className="mb-4" />
            
            <div className="w-full max-w-md mt-2">
              <Progress value={overall.value} className="h-3" />
              <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Popular Neighborhoods</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {cityData.neighborhoods.slice(0, 3).map((neighborhood) => (
                <li key={neighborhood.id} className="flex items-center justify-between">
                  <span className="font-medium">{neighborhood.name}</span>
                  <MoodBadge mood={neighborhood.currentMood.mood} size="sm" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Friends' Moods</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {cityData.friends.slice(0, 3).map((friend) => (
                <li key={friend.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={friend.avatar} 
                      alt={friend.name} 
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">{friend.name}</span>
                  </div>
                  <MoodBadge mood={friend.currentMood.mood} size="sm" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodayMood;
