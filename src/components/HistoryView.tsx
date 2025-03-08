
import React from 'react';
import { useMood } from '@/context/MoodContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MoodChart from './MoodChart';
import MoodBadge from './MoodBadge';
import { format, parseISO } from 'date-fns';

const HistoryView: React.FC = () => {
  const { cityData, loading } = useMood();

  if (loading || !cityData) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="h-40 bg-muted rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Past 5 Days</h2>
        <p className="text-muted-foreground">See how the city mood has changed</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Mood Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <MoodChart data={cityData.pastFiveDays} />
        </CardContent>
      </Card>

      <div className="grid gap-4 mt-6">
        <h3 className="text-xl font-semibold">Daily Breakdown</h3>
        {cityData.pastFiveDays.map((day, index) => (
          <Card key={index} className="overflow-hidden">
            <div className={`h-1 bg-mood-${day.mood}`}></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{format(parseISO(day.timestamp), 'EEEE, MMMM d')}</h4>
                  <MoodBadge mood={day.mood} value={day.value} showValue size="sm" className="mt-1" />
                </div>
                <div className="text-2xl font-bold">{day.value}%</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
