
import React from 'react';
import { MoodType } from '@/types/mood';
import { 
  Sun, 
  Zap, 
  Cloud, 
  CloudRain, 
  Flame, 
  Lightbulb 
} from 'lucide-react';

interface MoodIconProps {
  mood: MoodType;
  size?: number;
  className?: string;
}

const MoodIcon: React.FC<MoodIconProps> = ({ mood, size = 24, className = '' }) => {
  const iconProps = {
    size,
    className: `${className}`
  };

  switch (mood) {
    case 'happy':
      return <Sun {...iconProps} className={`${className} text-mood-happy`} />;
    case 'energetic':
      return <Zap {...iconProps} className={`${className} text-mood-energetic`} />;
    case 'calm':
      return <Cloud {...iconProps} className={`${className} text-mood-calm`} />;
    case 'melancholy':
      return <CloudRain {...iconProps} className={`${className} text-mood-melancholy`} />;
    case 'stressed':
      return <Flame {...iconProps} className={`${className} text-mood-stressed`} />;
    case 'inspired':
      return <Lightbulb {...iconProps} className={`${className} text-mood-inspired`} />;
    default:
      return <Sun {...iconProps} />;
  }
};

export default MoodIcon;
