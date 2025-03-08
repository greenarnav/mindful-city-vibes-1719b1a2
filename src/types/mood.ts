
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

export interface CityMood {
  city: string;
  state: string;
  overall: {
    sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
    mood: MoodType;
    value: number;
  };
  pastFiveDays: {
    day: string;
    shortDay: string;
    sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  }[];
  topics: {
    thinking: TopicData[];
    caring: TopicData[];
    burning: TopicData[];
  };
  neighborhoods: NeighborhoodMood[];
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
