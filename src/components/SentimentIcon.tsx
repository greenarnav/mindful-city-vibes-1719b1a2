
import React from 'react';
import { Moon, Sun, CloudSun, CloudMoon } from 'lucide-react';

interface SentimentIconProps {
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  size?: number;
  className?: string;
}

const SentimentIcon: React.FC<SentimentIconProps> = ({ sentiment, size = 24, className = '' }) => {
  const iconProps = {
    size,
    className: `${className}`
  };

  switch (sentiment) {
    case 'positive':
      return <Sun {...iconProps} className={`${className} text-yellow-400`} />;
    case 'negative':
      return <Moon {...iconProps} className={`${className} text-blue-400`} />;
    case 'mixed':
      return <CloudSun {...iconProps} className={`${className} text-orange-400`} />;
    case 'neutral':
      return <CloudMoon {...iconProps} className={`${className} text-gray-400`} />;
    default:
      return <CloudMoon {...iconProps} />;
  }
};

export default SentimentIcon;
