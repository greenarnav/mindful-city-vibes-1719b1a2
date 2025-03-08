
import React from 'react';
import { MoodType } from '@/types/mood';
import MoodIcon from './MoodIcon';
import { Badge } from '@/components/ui/badge';

interface MoodBadgeProps {
  mood: MoodType;
  value?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getMoodLabel = (mood: MoodType): string => {
  switch (mood) {
    case 'happy':
      return 'Happy';
    case 'energetic':
      return 'Energetic';
    case 'calm':
      return 'Calm';
    case 'melancholy':
      return 'Melancholy';
    case 'stressed':
      return 'Stressed';
    case 'inspired':
      return 'Inspired';
    default:
      return 'Unknown';
  }
};

const getMoodColor = (mood: MoodType): string => {
  switch (mood) {
    case 'happy':
      return 'bg-mood-happy/20 text-mood-happy border-mood-happy/50';
    case 'energetic':
      return 'bg-mood-energetic/20 text-mood-energetic border-mood-energetic/50';
    case 'calm':
      return 'bg-mood-calm/20 text-mood-calm border-mood-calm/50';
    case 'melancholy':
      return 'bg-mood-melancholy/20 text-mood-melancholy border-mood-melancholy/50';
    case 'stressed':
      return 'bg-mood-stressed/20 text-mood-stressed border-mood-stressed/50';
    case 'inspired':
      return 'bg-mood-inspired/20 text-mood-inspired border-mood-inspired/50';
    default:
      return 'bg-muted';
  }
};

const MoodBadge: React.FC<MoodBadgeProps> = ({ 
  mood, 
  value, 
  showValue = false, 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const iconSize = {
    sm: 14,
    md: 16,
    lg: 20
  };

  return (
    <Badge 
      className={`
        font-medium rounded-full border ${getMoodColor(mood)} ${sizeClasses[size]} 
        ${className} flex items-center gap-1.5
      `}
      variant="outline"
    >
      <MoodIcon mood={mood} size={iconSize[size]} />
      <span>{getMoodLabel(mood)}</span>
      {showValue && value !== undefined && (
        <span className="ml-1 opacity-80">{value}%</span>
      )}
    </Badge>
  );
};

export default MoodBadge;
