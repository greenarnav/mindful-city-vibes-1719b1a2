
import React from 'react';
import { MoodType } from '@/types/mood';

interface MoodIconProps {
  mood: MoodType;
  size?: number;
  className?: string;
}

const MoodIcon: React.FC<MoodIconProps> = ({ mood, size = 24, className = '' }) => {
  // Define neon color based on mood
  const getMoodColor = (mood: MoodType) => {
    switch (mood) {
      case 'happy': return 'var(--mood-happy)';
      case 'energetic': return 'var(--mood-energetic)';
      case 'calm': return 'var(--mood-calm)';
      case 'melancholy': return 'var(--mood-melancholy)';
      case 'stressed': return 'var(--mood-stressed)';
      case 'inspired': return 'var(--mood-inspired)';
      default: return 'var(--mood-happy)';
    }
  };

  // Get emoji path based on mood
  const getEmojiPath = (mood: MoodType) => {
    switch (mood) {
      case 'happy':
        return (
          <path 
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'energetic':
        return (
          <path 
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5zm3-2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5zM1.053 11.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 1 1-.447.894l-2-1a.5.5 0 0 1-.223-.67zm11.894 0a.5.5 0 0 1-.223.67l-2 1a.5.5 0 1 1-.447-.894l2-1a.5.5 0 0 1 .67.223z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'calm':
        return (
          <path 
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z M6.428 12.93a.5.5 0 0 1-.566-.421l-.026-.168C5.597 10.566 4.362 9.32 2.612 9.082a.5.5 0 0 1-.421-.566l.168-1.344a.5.5 0 0 1 .566-.42c2.357.299 4.152 2.11 4.723 4.462l.026.168a.5.5 0 0 1-.42.566l-1.344.168zm7.421-5.124a.5.5 0 0 1-.566.42c-2.356-.298-4.152-2.11-4.723-4.462l-.026-.168a.5.5 0 0 1 .42-.566l1.344-.168a.5.5 0 0 1 .566.421l.026.168c.24 1.774 1.474 3.021 3.224 3.258a.5.5 0 0 1 .42.566l-.167 1.344z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'melancholy':
        return (
          <path 
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z M4.707 5.293a1 1 0 0 0-1.414 1.414l.5.5a1 1 0 0 0 1.414-1.414l-.5-.5zm6.5 0a1 1 0 1 0-1.414 1.414l.5.5a1 1 0 0 0 1.414-1.414l-.5-.5zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'stressed':
        return (
          <path 
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM6.5 6.497V6.5h-1c0-.568.447-.947.862-1.154C6.807 5.123 7.387 5 8 5s1.193.123 1.638.346c.415.207.862.586.862 1.154h-1v-.003l-.003-.01a.213.213 0 0 0-.036-.053.859.859 0 0 0-.27-.194C8.91 6.1 8.49 6 8 6c-.491 0-.912.1-1.19.24a.859.859 0 0 0-.271.194.213.213 0 0 0-.036.054l-.003.01z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      case 'inspired':
        return (
          <path 
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      default:
        return (
          <path 
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
    }
  };

  const color = getMoodColor(mood);
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      className={className}
      fill="none"
      stroke={color} 
      strokeWidth="1.2"
      style={{
        filter: `drop-shadow(0 0 3px ${color})`,
      }}
    >
      {getEmojiPath(mood)}
    </svg>
  );
};

export default MoodIcon;
