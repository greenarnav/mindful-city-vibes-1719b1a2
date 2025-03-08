
import React from 'react';
import { MoodData } from '@/types/mood';
import { format, parseISO } from 'date-fns';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Card } from '@/components/ui/card';
import MoodBadge from './MoodBadge';

interface MoodChartProps {
  data: MoodData[];
  title?: string;
  className?: string;
}

// Helper to format dates for display
const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, 'MMM dd');
};

// Transform mood type to corresponding color
const getMoodColor = (mood: string) => {
  switch (mood) {
    case 'happy': return '#FFD166';
    case 'energetic': return '#EF476F';
    case 'calm': return '#06D6A0';
    case 'melancholy': return '#118AB2';
    case 'stressed': return '#E76F51';
    case 'inspired': return '#9381FF';
    default: return '#888888';
  }
};

const MoodChart: React.FC<MoodChartProps> = ({ data, title, className = '' }) => {
  // Prepare data for the chart
  const chartData = data.map(item => ({
    date: formatDate(item.timestamp),
    value: item.value,
    mood: item.mood,
    rawDate: item.timestamp
  }));

  // Function to render custom tooltip
  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Card className="p-3 shadow-lg border bg-white/90 backdrop-blur-sm">
          <p className="text-sm font-medium mb-1">{data.date}</p>
          <MoodBadge mood={data.mood} value={data.value} showValue size="sm" />
        </Card>
      );
    }
    return null;
  };

  return (
    <div className={`w-full ${className}`}>
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#eee' }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#eee' }}
              width={30}
            />
            <Tooltip content={renderCustomTooltip} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={(props) => {
                const mood = props.payload.mood;
                return (
                  <circle 
                    cx={props.cx} 
                    cy={props.cy} 
                    r={4} 
                    fill={getMoodColor(mood)}
                    stroke="white"
                    strokeWidth={1}
                  />
                );
              }}
              strokeLinecap="round"
              activeDot={{ r: 6, strokeWidth: 2, stroke: 'white' }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodChart;
