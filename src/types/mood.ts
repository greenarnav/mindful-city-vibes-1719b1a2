
export type MoodType = 'happy' | 'energetic' | 'calm' | 'melancholy' | 'stressed' | 'inspired';

export interface MoodData {
  mood: MoodType;
  value: number; // 0-100
  timestamp: string;
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
  currentMood: MoodData;
}

export interface CityMood {
  overall: MoodData;
  pastFiveDays: MoodData[];
  neighborhoods: NeighborhoodMood[];
  friends: FriendMood[];
}
