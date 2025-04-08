
export type MoodType = 'happy' | 'energetic' | 'calm' | 'melancholy' | 'stressed' | 'inspired';

export interface MoodData {
  mood: MoodType;
  value: number; // 0-100
  timestamp: string;
}

export interface TopicData {
  id: string;
  text: string;
  popularity: number; // 0-100
}

export interface DayMoodData {
  day: string;
  shortDay: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  mood: MoodType;  // Changed from optional to required to match MoodData
  value: number;   // Changed from optional to required to match MoodData
  timestamp: string; // Changed from optional to required to match MoodData
}

export interface CityMood {
  city: string;
  state: string;
  overall: {
    sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
    mood: MoodType;
    value: number;
    timestamp?: string;
  };
  pastFiveDays: DayMoodData[];
  topics: {
    thinking: TopicData[];
    caring: TopicData[];
    burning: TopicData[];
  };
  neighborhoods: NeighborhoodMood[];
  friends?: FriendMood[]; // Make this optional to fix the type error
}

export interface NeighborhoodMood {
  id: string;
  name: string;
  currentMood: MoodData;
  pastMoods: MoodData[];
}

export interface FriendMood {
  id: string;
  name: string;
  avatar: string;
  location: string;
  currentMood: MoodData;
}

export interface CitiesData {
  cities: {
    city: string;
    state: string;
  }[];
  currentCity: string;
}
